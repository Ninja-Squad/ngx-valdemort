import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentTester } from 'ngx-speculoos';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';
import { email, Field, form, maxLength, min, minLength, pattern, required, validate, submit, applyEach } from '@angular/forms/signals';
import { ValidationSignalErrorsComponent } from './validation-signal-errors.component';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';

@Component({
  selector: 'val-signal-test',
  template: `
    <form (submit)="save($event)" novalidate>
      <input [field]="form.firstName" id="firstName" />
      <val-signal-errors id="firstNameErrors" [forField]="form.firstName" label="The first name">
        <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      </val-signal-errors>

      <input [field]="form.lastName" id="lastName" />
      <val-signal-errors id="lastNameErrors" [forField]="form.lastName">
        <ng-template valError="minLength" let-error="error">min length: {{ error.minLength }}</ng-template>
        <ng-template valError="pattern">only letters</ng-template>
      </val-signal-errors>

      <input [field]="form.age" type="number" id="age" />
      <val-signal-errors id="ageErrors" [forField]="form.age">
        <ng-template valError="required">age required</ng-template>
      </val-signal-errors>

      <div>
        <input [field]="form.credentials.password" id="password" />
        <val-signal-errors id="passwordErrors" [forField]="form.credentials.password">
          <ng-template valError="required">password is required</ng-template>
        </val-signal-errors>

        <input [field]="form.credentials.confirmation" />
        <val-signal-errors id="confirmationErrors" [forField]="form.credentials.confirmation">
          <ng-template valError="required">confirmation is required</ng-template>
        </val-signal-errors>
      </div>
      <val-signal-errors id="credentialsErrors" [forField]="form.credentials">
        <ng-template valError="match">match with control error</ng-template>
      </val-signal-errors>

      <div>
        @for (hobbyField of form.hobbies; track hobbyField) {
          <div>
            <input [field]="hobbyField" />
            <val-signal-errors [forField]="hobbyField" id="hobbyErrors">
              <ng-template valError="required">each hobby required</ng-template>
            </val-signal-errors>
          </div>
        }
      </div>
      <val-signal-errors [forField]="form.hobbies" id="hobbiesErrors">
        <ng-template valError="minLength">at least one hobby required</ng-template>
      </val-signal-errors>

      <input [field]="form.email" id="email" />
      <val-signal-errors id="emailErrors" [forField]="form.email" label="The email">
        <ng-template valError="email">email must be a valid email address</ng-template>
        <ng-template valFallback let-label let-type="type">{{ label }} has an unhandled error of type {{ type }} </ng-template>
      </val-signal-errors>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [ValidationSignalErrorsComponent, ValidationErrorDirective, ValidationFallbackDirective, Field],
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
      required(form.firstName);
      minLength(form.lastName, 2);
      pattern(form.lastName, /^[a-z]*$/);
      required(form.age);
      min(form.age, 1);
      required(form.credentials.password);
      required(form.credentials.confirmation);
      validate(form.credentials, ({ value }) => (value().password === value().confirmation ? null : { kind: 'match' }));
      minLength(form.hobbies, 1);
      applyEach(form.hobbies, hobby => required(hobby));
      email(form.email);
      maxLength(form.email, 10);
      pattern(form.email, /^[a-z.@]*$/);
    }
  );

  async save(event: Event) {
    event.preventDefault();
    await submit(this.form, async () => {
      return null;
    });
  }
}

class SignalComponentTester extends ComponentTester<SignalTestComponent> {
  constructor() {
    super(SignalTestComponent);
  }

  get firstName() {
    return this.input('#firstName')!;
  }

  get firstNameErrors() {
    return this.element('#firstNameErrors')!;
  }

  get lastName() {
    return this.input('#lastName')!;
  }

  get lastNameErrors() {
    return this.element('#lastNameErrors')!;
  }

  get age() {
    return this.input('#age')!;
  }

  get ageErrors() {
    return this.element('#ageErrors')!;
  }

  get password() {
    return this.input('#password')!;
  }

  get passwordErrors() {
    return this.element('#passwordErrors')!;
  }

  get hobbyErrors() {
    return this.element('#hobbyErrors')!;
  }

  get hobbiesErrors() {
    return this.element('#hobbiesErrors')!;
  }

  get credentialsErrors() {
    return this.element('#credentialsErrors')!;
  }

  get email() {
    return this.input('#email')!;
  }

  get emailErrors() {
    return this.element('#emailErrors')!;
  }

  get submit() {
    return this.button('#submit')!;
  }
}

describe('ValidationSignalErrorsComponent', () => {
  describe('signal forms', () => {
    let tester: SignalComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new SignalComponentTester();
      await tester.stable();
    });

    it('should not display errors while not submitted nor touched', () => {
      expect(tester.firstNameErrors.attr('style')).toBe('display: none;');
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(0);
      expect(tester.elements('val-errors div').length).toBe(0);
    });

    it('should display errors once submitted', async () => {
      await tester.submit.click();
      expect(tester.firstNameErrors.attr('style')).toBeFalsy();
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).not.toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(1);
    });

    it('should display errors once touched', async () => {
      await tester.firstName.dispatchEventOfType('blur');
      expect(tester.firstNameErrors.attr('style')).toBeFalsy();
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).not.toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(1);
    });

    it('should not display errors if no error template present', async () => {
      await tester.age.fillWith('0');
      await tester.submit.click();

      expect(tester.componentInstance.form.age().invalid()).toBe(true);
      expect(window.getComputedStyle(tester.ageErrors.nativeElement).display).toBe('none');
      expect(tester.ageErrors.elements('div').length).toBe(0);
    });

    it('should remove error if no error', async () => {
      await tester.submit.click();

      await tester.firstName.fillWith('JB');

      expect(tester.firstNameErrors.elements('div').length).toBe(0);
    });

    it('should honor the label', async () => {
      await tester.submit.click();
      expect(tester.firstNameErrors).toContainText('The first name is required');
    });

    it('should expose the error', async () => {
      await tester.lastName.fillWith('a');
      await tester.lastName.dispatchEventOfType('blur');
      expect(tester.lastNameErrors).toContainText('min length: 2');
    });

    it('should display all errors in order', async () => {
      await tester.lastName.fillWith('1');
      await tester.lastName.dispatchEventOfType('blur');
      expect(tester.lastNameErrors.elements('div').length).toBe(2);
      expect(tester.lastNameErrors.elements('div')[0]).toContainText('min length: 2');
      expect(tester.lastNameErrors.elements('div')[1]).toContainText('only letters');
    });

    it('should allow passing a control rather than a control name', async () => {
      await tester.submit.click();
      expect(tester.ageErrors).toContainText('age required');
    });

    it('should validate controls inside a nested form group', async () => {
      await tester.submit.click();
      expect(tester.passwordErrors).toContainText('password is required');
    });

    it('should validate controls inside a nested form array', async () => {
      await tester.submit.click();
      expect(tester.hobbyErrors).toContainText('each hobby required');
    });

    it('should validate a form array', async () => {
      tester.componentInstance.form.hobbies().value.set([]);
      await tester.stable();
      await tester.submit.click();
      expect(tester.hobbiesErrors).toContainText('at least one hobby required');
    });

    it('should validate a form group', async () => {
      await tester.password.fillWith('a');
      await tester.submit.click();
      expect(tester.credentialsErrors).toContainText('match with control error');
    });

    it('should display fallback errors', async () => {
      await tester.email.fillWith('long invalid email with 1234');
      await tester.submit.click();

      expect(tester.emailErrors.elements('div').length).toBe(3);
      expect(tester.emailErrors.elements('div')[0]).toContainText('email must be a valid email address');
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type maxLength');
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type pattern');
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
      await tester.change();
    });

    it('should display error once dirty', async () => {
      expect(tester.firstNameErrors).not.toContainText('The first name is required');
      await tester.firstName.fillWith('a');
      await tester.firstName.fillWith('');
      expect(tester.firstNameErrors).toContainText('The first name is required');
    });

    it('should display the first error only', async () => {
      await tester.lastName.fillWith('1');
      expect(tester.lastNameErrors.elements('div').length).toBe(1);
      expect(tester.lastNameErrors).toContainText('min length: 2');
    });

    it('should display the first error in case of fallback', async () => {
      await tester.email.fillWith('long email with 1234');
      expect(tester.emailErrors.elements('div').length).toBe(1);
      expect(tester.emailErrors).toContainText('email must be a valid email address');

      await tester.email.fillWith('long-rejected-email@mail.com');
      expect(tester.emailErrors.elements('div').length).toBe(1);
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type');
    });

    it('should add CSS classes to the errors component', async () => {
      await tester.lastName.fillWith('1');
      expect(tester.lastNameErrors).toHaveClass('a');
      expect(tester.lastNameErrors).toHaveClass('b');
    });

    it('should add CSS classes to the error divs', async () => {
      await tester.lastName.fillWith('1');
      expect(tester.lastNameErrors.element('div.c')).not.toBeNull();
      expect(tester.lastNameErrors.element('div.d')).not.toBeNull();
    });
  });
});
