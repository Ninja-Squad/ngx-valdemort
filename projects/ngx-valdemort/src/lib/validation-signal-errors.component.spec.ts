import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';
import { applyEach, email, form, FormField, min, minLength, required, submit, validate } from '@angular/forms/signals';
import { ValidationSignalErrorsComponent } from './validation-signal-errors.component';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';
import { beforeEach, describe, expect, test } from 'vitest';

@Component({
  selector: 'val-signal-test',
  template: `
    <form (submit)="save($event)" novalidate>
      <input [formField]="form.firstName" id="firstName" />
      <val-signal-errors id="firstNameErrors" [formField]="form.firstName" label="The first name">
        <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      </val-signal-errors>

      <input [formField]="form.lastName" id="lastName" />
      <val-signal-errors id="lastNameErrors" [formField]="form.lastName">
        <ng-template valError="minLength" let-error="error">min length: {{ error.minLength }}</ng-template>
        <ng-template valError="custom-pattern">only letters</ng-template>
      </val-signal-errors>

      <!-- TODO: Remove $any on form.age once Angular template typing accepts nullable number signal form fields in v21.2 -->
      <input [formField]="$any(form.age)" type="number" id="age" />
      <val-signal-errors id="ageErrors" [formField]="form.age">
        <ng-template valError="required">age required</ng-template>
      </val-signal-errors>

      <div>
        <input [formField]="form.credentials.password" id="password" />
        <val-signal-errors id="passwordErrors" [formField]="form.credentials.password">
          <ng-template valError="required">password is required</ng-template>
        </val-signal-errors>

        <input [formField]="form.credentials.confirmation" />
        <val-signal-errors id="confirmationErrors" [formField]="form.credentials.confirmation">
          <ng-template valError="required">confirmation is required</ng-template>
        </val-signal-errors>
      </div>
      <val-signal-errors id="credentialsErrors" [formField]="form.credentials">
        <ng-template valError="match">match with control error</ng-template>
      </val-signal-errors>

      <div>
        @for (hobbyField of form.hobbies; track hobbyField) {
          <div>
            <input [formField]="hobbyField" />
            <val-signal-errors [formField]="hobbyField" id="hobbyErrors">
              <ng-template valError="required">each hobby required</ng-template>
            </val-signal-errors>
          </div>
        }
      </div>
      <val-signal-errors [formField]="form.hobbies" id="hobbiesErrors">
        <ng-template valError="minLength">at least one hobby required</ng-template>
      </val-signal-errors>

      <input [formField]="form.email" id="email" />
      <val-signal-errors id="emailErrors" [formField]="form.email" label="The email">
        <ng-template valError="email">email must be a valid email address</ng-template>
        <ng-template valFallback let-label let-type="type">{{ label }} has an unhandled error of type {{ type }}</ng-template>
      </val-signal-errors>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [ValidationSignalErrorsComponent, ValidationErrorDirective, ValidationFallbackDirective, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SignalTestComponent {
  readonly form = form(
    signal({
      firstName: '',
      lastName: '',
      age: null as number | null,
      credentials: {
        password: '',
        confirmation: ''
      },
      hobbies: [''],
      email: ''
    }),
    form => {
      // do not use the default maxlength and pattern validators because they add maxlength/pattern attributes
      // to the input which prevents us to type the incorrect values we want to test
      required(form.firstName);
      minLength(form.lastName, 2);
      validate(form.lastName, ctx => (/^[a-z]*$/.test(ctx.value()) ? undefined : { kind: 'custom-pattern' }));
      required(form.age);
      min(form.age, 1);
      required(form.credentials.password);
      required(form.credentials.confirmation);
      validate(form.credentials, ({ value }) => (value().password === value().confirmation ? null : { kind: 'match' }));
      minLength(form.hobbies, 1);
      applyEach(form.hobbies, hobby => required(hobby));
      email(form.email);
      // do not use the default maxlength and pattern validators because they add maxlength/pattern attributes
      // to the input which prevents us to type the incorrect values we want to test
      validate(form.email, ctx => (/^[a-z]*$/.test(ctx.value()) ? undefined : { kind: 'custom-pattern' }));
      validate(form.email, ctx => (ctx.value().length > 10 ? { kind: 'custom-maxlength' } : undefined));
    }
  );

  async save(event: Event) {
    event.preventDefault();
    await submit(this.form, async () => {
      return null;
    });
  }
}

class SignalComponentTester {
  readonly fixture = TestBed.createComponent(SignalTestComponent);
  readonly componentInstance = this.fixture.componentInstance;
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly firstName = this.root.getByCss('#firstName');
  readonly firstNameErrors = this.root.getByCss('#firstNameErrors');
  readonly lastName = this.root.getByCss('#lastName');
  readonly lastNameErrors = this.root.getByCss('#lastNameErrors');
  readonly age = this.root.getByCss('#age');
  readonly ageErrors = this.root.getByCss('#ageErrors');
  readonly password = this.root.getByCss('#password');
  readonly passwordErrors = this.root.getByCss('#passwordErrors');
  readonly hobbyErrors = this.root.getByCss('#hobbyErrors');
  readonly hobbiesErrors = this.root.getByCss('#hobbiesErrors');
  readonly credentialsErrors = this.root.getByCss('#credentialsErrors');
  readonly email = this.root.getByCss('#email');
  readonly emailErrors = this.root.getByCss('#emailErrors');
  readonly submit = this.root.getByCss('#submit');
}

describe('ValidationSignalErrorsComponent', () => {
  describe('signal forms', () => {
    let tester: SignalComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new SignalComponentTester();
      await tester.fixture.whenStable();
    });

    test('should not display errors while not submitted nor touched', async () => {
      await expect.element(tester.firstNameErrors).not.toBeVisible();
      await expect.element(tester.root.getByCss('val-errors div')).not.toBeInTheDocument();
    });

    test('should display errors once submitted', async () => {
      await tester.submit.click();
      await expect.element(tester.firstNameErrors).toBeVisible();
      await expect.element(tester.firstNameErrors.getByCss('div')).toHaveLength(1);
    });

    test('should display errors once touched', async () => {
      await tester.firstName.click();
      await userEvent.tab();
      await expect.element(tester.firstNameErrors).toBeVisible();
      await expect.element(tester.firstNameErrors.getByCss('div')).toHaveLength(1);
    });

    test('should not display errors if no error template present', async () => {
      await tester.age.fill('0');
      await tester.submit.click();

      expect(tester.componentInstance.form.age().invalid()).toBe(true);
      await expect.element(tester.ageErrors).not.toBeVisible();
      await expect.element(tester.ageErrors.getByCss('div')).not.toBeInTheDocument();
    });

    test('should remove error if no error', async () => {
      await tester.submit.click();

      await tester.firstName.fill('JB');

      await expect.element(tester.firstNameErrors.getByCss('div')).not.toBeInTheDocument();
    });

    test('should honor the label', async () => {
      await tester.submit.click();
      await expect.element(tester.firstNameErrors).toHaveTextContent('The first name is required');
    });

    test('should expose the error', async () => {
      await tester.lastName.fill('a');
      await userEvent.tab();
      await expect.element(tester.lastNameErrors).toHaveTextContent('min length: 2');
    });

    test('should display all errors in order', async () => {
      await tester.lastName.fill('1');
      await userEvent.tab();
      await expect.element(tester.lastNameErrors.getByCss('div')).toHaveLength(2);
      await expect.element(tester.lastNameErrors.getByCss('div').nth(0)).toHaveTextContent('min length: 2');
      await expect.element(tester.lastNameErrors.getByCss('div').nth(1)).toHaveTextContent('only letters');
    });

    test('should allow passing a control rather than a control name', async () => {
      await tester.submit.click();
      await expect.element(tester.ageErrors).toHaveTextContent('age required');
    });

    test('should validate controls inside a nested form group', async () => {
      await tester.submit.click();
      await expect.element(tester.passwordErrors).toHaveTextContent('password is required');
    });

    test('should validate controls inside a nested form array', async () => {
      await tester.submit.click();
      await expect.element(tester.hobbyErrors).toHaveTextContent('each hobby required');
    });

    test('should validate a form array', async () => {
      tester.componentInstance.form.hobbies().value.set([]);
      await tester.fixture.whenStable();
      await tester.submit.click();
      await expect.element(tester.hobbiesErrors).toHaveTextContent('at least one hobby required');
    });

    test('should validate a form group', async () => {
      await tester.password.fill('a');
      await tester.submit.click();
      await expect.element(tester.credentialsErrors).toHaveTextContent('match with control error');
    });

    test('should display fallback errors', async () => {
      const emailInput = tester.email.element() as HTMLInputElement;
      emailInput.value = 'long invalid email with 1234';
      emailInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      await tester.submit.click();

      await expect.element(tester.emailErrors.getByCss('div')).toHaveLength(3);
      await expect.element(tester.emailErrors.getByCss('div').nth(0)).toHaveTextContent('email must be a valid email address');
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type custom-maxlength');
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type custom-pattern');
    });
  });

  describe('configuration', () => {
    let tester: SignalComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      const config = TestBed.inject(ValdemortConfig);
      config.displayMode = DisplayMode.ONE;
      config.errorsClasses = 'a b';
      config.errorClasses = 'c d';
      config.shouldDisplayFieldErrors = fieldState => fieldState.dirty();

      tester = new SignalComponentTester();
    });

    test('should display error once dirty', async () => {
      await expect.element(tester.firstNameErrors).not.toHaveTextContent('The first name is required');
      await tester.firstName.fill('a');
      await tester.firstName.fill('');
      await expect.element(tester.firstNameErrors).toHaveTextContent('The first name is required');
    });

    test('should display the first error only', async () => {
      await tester.lastName.fill('1');
      await expect.element(tester.lastNameErrors.getByCss('div')).toHaveLength(1);
      await expect.element(tester.lastNameErrors).toHaveTextContent('min length: 2');
    });

    test('should display the first error in case of fallback', async () => {
      await tester.email.fill('long email with 1234');
      await expect.element(tester.emailErrors.getByCss('div')).toHaveLength(1);
      await expect.element(tester.emailErrors).toHaveTextContent('email must be a valid email address');

      await tester.email.fill('long-rejected-email@mail.com');
      await expect.element(tester.emailErrors.getByCss('div')).toHaveLength(1);
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type');
    });

    test('should add CSS classes to the errors component', async () => {
      await tester.lastName.fill('1');
      await expect.element(tester.lastNameErrors).toHaveClass('a', 'b');
    });

    test('should add CSS classes to the error divs', async () => {
      await tester.lastName.fill('1');
      await expect.element(tester.lastNameErrors.getByCss('div')).toHaveClass('c', 'd');
    });
  });
});
