import { AbstractControl, FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { ValdemortModule } from './valdemort.module';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';
import { beforeEach, describe, expect, test } from 'vitest';

function matchValidator(group: AbstractControl) {
  return group.value.password === group.value.confirmation ? null : { match: true };
}

@Component({
  selector: 'val-reactive-test',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="firstName" id="firstName" />
      <val-errors id="firstNameErrors" controlName="firstName" label="The first name">
        <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      </val-errors>

      <input formControlName="lastName" id="lastName" />
      <val-errors id="lastNameErrors" controlName="lastName">
        <ng-template valError="minlength" let-error="error">min length: {{ error.requiredLength }}</ng-template>
        <ng-template valError="pattern">only letters</ng-template>
      </val-errors>

      <input formControlName="age" type="number" id="age" />
      <val-errors id="ageErrors" [control]="form.controls.age">
        <ng-template valError="required">age required</ng-template>
      </val-errors>

      <div formGroupName="credentials">
        <input formControlName="password" id="password" />
        <val-errors id="passwordErrors" controlName="password">
          <ng-template valError="required">password is required</ng-template>
        </val-errors>

        <input formControlName="confirmation" />
        <val-errors id="confirmationErrors" controlName="confirmation">
          <ng-template valError="required">confirmation is required</ng-template>
        </val-errors>
      </div>
      <val-errors id="credentialsControlNameErrors" controlName="credentials">
        <ng-template valError="match">match with controlName error</ng-template>
      </val-errors>
      <val-errors id="credentialsControlErrors" [control]="form.controls.credentials">
        <ng-template valError="match">match with control error</ng-template>
      </val-errors>

      <div formArrayName="hobbies">
        @for (hobbyCtrl of hobbies.controls; track hobbyCtrl) {
          <div>
            <input [formControlName]="$index" />
            <val-errors [controlName]="$index" id="hobbyErrors">
              <ng-template valError="required">each hobby required</ng-template>
            </val-errors>
          </div>
        }
      </div>

      <input formControlName="email" id="email" />
      <val-errors id="emailErrors" controlName="email" label="The email">
        <ng-template valError="email">email must be a valid email address</ng-template>
        <ng-template valFallback let-label let-type="type">{{ label }} has an unhandled error of type {{ type }} </ng-template>
      </val-errors>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, ValdemortModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ReactiveTestComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.minLength(2), Validators.pattern(/^[a-z]*$/)]],
    age: [null, [Validators.required, Validators.min(1)]],
    credentials: this.fb.group(
      {
        password: ['', Validators.required],
        confirmation: ['', Validators.required]
      },
      {
        validators: matchValidator
      }
    ),
    hobbies: this.fb.array([['', Validators.required]]),
    email: ['', [Validators.email, Validators.maxLength(10), Validators.pattern(/^[a-z.@]*$/)]]
  });

  get hobbies() {
    return this.form.controls.hobbies;
  }

  submit() {}
}

async function detectChanges<T>(fixture: ReturnType<typeof TestBed.createComponent<T>>) {
  await fixture.whenStable();
}

class ReactiveComponentTester {
  readonly fixture = TestBed.createComponent(ReactiveTestComponent);
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
  readonly credentialsControlNameErrors = this.root.getByCss('#credentialsControlNameErrors');
  readonly credentialsControlErrors = this.root.getByCss('#credentialsControlErrors');
  readonly email = this.root.getByCss('#email');
  readonly emailErrors = this.root.getByCss('#emailErrors');
  readonly submit = this.root.getByCss('#submit');
}

@Component({
  selector: 'val-standalone-test',
  template: `
    <input [formControl]="foo" id="foo" />
    <val-errors [control]="foo" id="fooErrors">
      <ng-template valError="required">foo required</ng-template>
    </val-errors>

    <input [(ngModel)]="bar" #barCtrl="ngModel" id="bar" required />
    <val-errors [control]="barCtrl.control" id="barErrors">
      <ng-template valError="required">bar required</ng-template>
    </val-errors>
  `,
  imports: [ReactiveFormsModule, FormsModule, ValdemortModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class StandaloneTestComponent {
  readonly foo = new FormControl('', Validators.required);
  bar = '';
}

class StandaloneComponentTester {
  readonly fixture = TestBed.createComponent(StandaloneTestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly foo = this.root.getByCss('#foo');
  readonly fooErrors = this.root.getByCss('#fooErrors');
  readonly bar = this.root.getByCss('#bar');
  readonly barErrors = this.root.getByCss('#barErrors');
}

@Component({
  selector: 'val-template-driven-test',
  template: `
    <form (ngSubmit)="submit()">
      <input id="firstName" name="firstName" [(ngModel)]="user.firstName" #firstNameCtrl="ngModel" required />
      <val-errors [control]="firstNameCtrl.control" id="firstNameErrors">
        <ng-template valError="required">first name required</ng-template>
      </val-errors>

      <input id="lastName" name="lastName" [(ngModel)]="user.lastName" required />
      <val-errors controlName="lastName" id="lastNameErrors">
        <ng-template valError="required">last name required</ng-template>
      </val-errors>

      <div ngModelGroup="credentials">
        <input id="password" name="password" [(ngModel)]="user.credentials.password" required />
        <val-errors controlName="password" id="passwordErrors">
          <ng-template valError="required">password required</ng-template>
        </val-errors>
      </div>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [FormsModule, ValdemortModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TemplateDrivenTestComponent {
  readonly user = {
    firstName: '',
    lastName: '',
    credentials: {
      password: ''
    }
  };

  submit() {}
}

class TemplateDrivenComponentTester {
  readonly fixture = TestBed.createComponent(TemplateDrivenTestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly firstNameErrors = this.root.getByCss('#firstNameErrors');
  readonly lastNameErrors = this.root.getByCss('#lastNameErrors');
  readonly password = this.root.getByCss('#password');
  readonly passwordErrors = this.root.getByCss('#passwordErrors');
  readonly submit = this.root.getByCss('#submit');
}

@Component({
  selector: 'val-wrong-control-name-test',
  template: `
    <form (ngSubmit)="submit()">
      <input id="firstName" name="firstName" [(ngModel)]="user.firstName" #firstNameCtrl="ngModel" required />
      <!-- the control name mentions lastName whereas the control is firstName -->
      <val-errors controlName="lastName" id="firstNameErrors">
        <ng-template valError="required">first name required</ng-template>
      </val-errors>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [FormsModule, ValdemortModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class WrongControlNameTestComponent {
  readonly user = {
    firstName: ''
  };

  submit() {}
}

class WrongControlNameComponentTester {
  readonly fixture = TestBed.createComponent(WrongControlNameTestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly firstNameErrors = this.root.getByCss('#firstNameErrors');
  readonly submit = this.root.getByCss('#submit');
}

describe('ValidationErrorsComponent', () => {
  describe('reactive forms', () => {
    let tester: ReactiveComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new ReactiveComponentTester();
      await tester.fixture.whenStable();
    });

    test('should not display errors while not submitted nor touched', async () => {
      await expect.element(tester.firstNameErrors).not.toBeVisible();
      expect(tester.firstNameErrors.getByCss('div').length).toBe(0);
      expect(tester.root.getByCss('val-errors div').length).toBe(0);
    });

    test('should display errors once submitted', async () => {
      await tester.submit.click();
      await expect.element(tester.firstNameErrors).toBeVisible();
      expect(tester.firstNameErrors.getByCss('div').length).toBe(1);
    });

    test('should display errors once touched', async () => {
      await tester.firstName.click();
      await userEvent.tab();
      await expect.element(tester.firstNameErrors).toBeVisible();
      expect(tester.firstNameErrors.getByCss('div').length).toBe(1);
    });

    test('should not display errors if no error template present', async () => {
      await tester.age.fill('0');
      await tester.submit.click();

      expect(tester.componentInstance.form.controls.age!.invalid).toBe(true);
      await expect.element(tester.ageErrors).not.toBeVisible();
      expect(tester.ageErrors.getByCss('div').length).toBe(0);
    });

    test('should remove error if no error', async () => {
      await tester.submit.click();

      await tester.firstName.fill('JB');

      expect(tester.firstNameErrors.getByCss('div').length).toBe(0);
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
      expect(tester.lastNameErrors.getByCss('div').length).toBe(2);
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

    test('should validate a form group identified by controlName', async () => {
      await tester.password.fill('a');
      await tester.submit.click();
      await expect.element(tester.credentialsControlNameErrors).toHaveTextContent('match with controlName error');
    });

    test('should validate a form group identified by control', async () => {
      await tester.password.fill('a');
      await tester.submit.click();
      await expect.element(tester.credentialsControlErrors).toHaveTextContent('match with control error');
    });

    test('should display fallback errors', async () => {
      await tester.email.fill('long invalid email with 1234');
      await tester.submit.click();
      expect(tester.emailErrors.getByCss('div').length).toBe(3);
      await expect.element(tester.emailErrors.getByCss('div').nth(0)).toHaveTextContent('email must be a valid email address');
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type maxlength');
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type pattern');
    });
  });

  describe('standalone controls', () => {
    let tester: StandaloneComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new StandaloneComponentTester();
      await tester.fixture.whenStable();
    });

    test('should validate standalone reactive control', async () => {
      await expect.element(tester.fooErrors).not.toHaveTextContent('foo required');

      await tester.foo.click();
      await userEvent.tab();

      await expect.element(tester.fooErrors).toHaveTextContent('foo required');
    });

    test('should validate standalone template-driven control', async () => {
      await expect.element(tester.barErrors).not.toHaveTextContent('bar required');

      await tester.bar.click();
      await userEvent.tab();

      await expect.element(tester.barErrors).toHaveTextContent('bar required');
    });
  });

  describe('template-driven forms', () => {
    let tester: TemplateDrivenComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new TemplateDrivenComponentTester();
      await tester.fixture.whenStable();
    });

    test('should validate top-level field with control', async () => {
      await expect.element(tester.firstNameErrors).not.toHaveTextContent('first name required');
      await tester.submit.click();
      await expect.element(tester.firstNameErrors).toHaveTextContent('first name required');
    });

    test('should validate top-level field with controlName', async () => {
      await expect.element(tester.lastNameErrors).not.toHaveTextContent('last name required');
      await tester.submit.click();
      await expect.element(tester.lastNameErrors).toHaveTextContent('last name required');
    });

    test('should validate field nested in model group', async () => {
      await expect.element(tester.passwordErrors).not.toHaveTextContent('password required');
      await tester.submit.click();
      await expect.element(tester.passwordErrors).toHaveTextContent('password required');
    });
  });

  describe('with wrong control name', () => {
    let tester: WrongControlNameComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      tester = new WrongControlNameComponentTester();
    });

    test('should not throw by default', async () => {
      await expect(detectChanges(tester.fixture)).resolves.toBeUndefined();
      await expect.element(tester.firstNameErrors).not.toHaveTextContent('first name required');
    });

    test('should throw if configured to', async () => {
      /* eslint-disable no-console */
      const originalConsoleError = console.error;
      console.error = () => {};
      const config = TestBed.inject(ValdemortConfig);
      config.shouldThrowOnMissingControl = () => true;
      await expect(detectChanges(tester.fixture)).rejects.toThrowError(`ngx-valdemort: no control found for controlName: 'lastName'.`);
      console.error = originalConsoleError;
      /* eslint-enable no-console */
    });
  });

  describe('configuration', () => {
    let tester: ReactiveComponentTester;

    beforeEach(async () => {
      TestBed.configureTestingModule({});

      const config = TestBed.inject(ValdemortConfig);
      config.displayMode = DisplayMode.ONE;
      config.errorsClasses = 'a b';
      config.errorClasses = 'c d';
      config.shouldDisplayErrors = control => control.dirty;

      tester = new ReactiveComponentTester();
      await tester.fixture.whenStable();
    });

    test('should display error once dirty', async () => {
      await expect.element(tester.firstNameErrors).not.toHaveTextContent('The first name is required');
      await tester.firstName.fill('a');
      await tester.firstName.fill('');
      await expect.element(tester.firstNameErrors).toHaveTextContent('The first name is required');
    });

    test('should display the first error only', async () => {
      await tester.lastName.fill('1');
      expect(tester.lastNameErrors.getByCss('div').length).toBe(1);
      await expect.element(tester.lastNameErrors).toHaveTextContent('min length: 2');
    });

    test('should display the first error in case of fallback', async () => {
      await tester.email.fill('long email with 1234');
      expect(tester.emailErrors.getByCss('div').length).toBe(1);
      await expect.element(tester.emailErrors).toHaveTextContent('email must be a valid email address');

      await tester.email.fill('long-rejected-email@mail.com');
      expect(tester.emailErrors.getByCss('div').length).toBe(1);
      await expect.element(tester.emailErrors).toHaveTextContent('The email has an unhandled error of type');
    });

    test('should add CSS classes to the errors component', async () => {
      await tester.lastName.fill('1');
      await expect.element(tester.lastNameErrors).toHaveClass('a');
      await expect.element(tester.lastNameErrors).toHaveClass('b');
    });

    test('should add CSS classes to the error divs', async () => {
      await tester.lastName.fill('1');
      expect(tester.lastNameErrors.getByCss('div.c').length).toBeGreaterThan(0);
      expect(tester.lastNameErrors.getByCss('div.d').length).toBeGreaterThan(0);
    });
  });
});
