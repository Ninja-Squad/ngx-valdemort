import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComponentTester } from 'ngx-speculoos';
import { ValdemortModule } from './valdemort.module';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';

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
        <ng-template valFallback let-label let-type="type">{{ label }} has an unhandled error of type {{ type }}</ng-template>
      </val-errors>

      <button id="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, ValdemortModule]
})
class ReactiveTestComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.minLength(2), Validators.pattern(/^[a-z]*$/)]],
      age: [null, [Validators.required, Validators.min(1)]],
      credentials: fb.group(
        {
          password: ['', Validators.required],
          confirmation: ['', Validators.required]
        },
        {
          validators: matchValidator
        }
      ),
      hobbies: fb.array([['', Validators.required]]),
      email: ['', [Validators.email, Validators.maxLength(10), Validators.pattern(/^[a-z.@]*$/)]]
    });
  }

  get hobbies() {
    return this.form.controls.hobbies as FormArray;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submit() {}
}

class ReactiveComponentTester extends ComponentTester<ReactiveTestComponent> {
  constructor() {
    super(ReactiveTestComponent);
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

  get credentialsControlNameErrors() {
    return this.element('#credentialsControlNameErrors')!;
  }

  get credentialsControlErrors() {
    return this.element('#credentialsControlErrors')!;
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
  imports: [ReactiveFormsModule, FormsModule, ValdemortModule]
})
class StandaloneTestComponent {
  foo = new FormControl('', Validators.required);
  bar = '';
}

class StandaloneComponentTester extends ComponentTester<StandaloneTestComponent> {
  constructor() {
    super(StandaloneTestComponent);
  }

  get foo() {
    return this.input('#foo')!;
  }

  get fooErrors() {
    return this.element('#fooErrors')!;
  }

  get bar() {
    return this.input('#bar')!;
  }

  get barErrors() {
    return this.element('#barErrors')!;
  }
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
  imports: [FormsModule, ValdemortModule]
})
class TemplateDrivenTestComponent {
  user = {
    firstName: '',
    lastName: '',
    credentials: {
      password: ''
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submit() {}
}

class TemplateDrivenComponentTester extends ComponentTester<TemplateDrivenTestComponent> {
  constructor() {
    super(TemplateDrivenTestComponent);
  }

  get firstNameErrors() {
    return this.element('#firstNameErrors')!;
  }

  get lastNameErrors() {
    return this.element('#lastNameErrors')!;
  }

  get password() {
    return this.input('#password')!;
  }

  get passwordErrors() {
    return this.element('#passwordErrors')!;
  }

  get submit() {
    return this.button('#submit')!;
  }
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
  imports: [FormsModule, ValdemortModule]
})
class WrongControlNameTestComponent {
  user = {
    firstName: ''
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submit() {}
}

class WrongControlNameComponentTester extends ComponentTester<WrongControlNameTestComponent> {
  constructor() {
    super(WrongControlNameTestComponent);
  }

  get firstName() {
    return this.input('#firstName');
  }

  get firstNameErrors() {
    return this.element('#firstNameErrors');
  }

  get submit() {
    return this.button('#submit');
  }
}

describe('ValidationErrorsComponent', () => {
  describe('reactive forms', () => {
    let tester: ReactiveComponentTester;

    beforeEach(() => {
      TestBed.configureTestingModule({});

      tester = new ReactiveComponentTester();
      tester.detectChanges();
    });

    it('should not display errors while not submitted nor touched', () => {
      expect(tester.firstNameErrors.attr('style')).toBe('display: none;');
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(0);
      expect(tester.elements('val-errors div').length).toBe(0);
    });

    it('should display errors once submitted', () => {
      tester.submit.click();
      expect(tester.firstNameErrors.attr('style')).toBeFalsy();
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).not.toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(1);
    });

    it('should display errors once touched', () => {
      tester.firstName.dispatchEventOfType('blur');
      expect(tester.firstNameErrors.attr('style')).toBeFalsy();
      expect(window.getComputedStyle(tester.firstNameErrors.nativeElement).display).not.toBe('none');
      expect(tester.firstNameErrors.elements('div').length).toBe(1);
    });

    it('should not display errors if no error template present', () => {
      tester.age.fillWith('0');
      tester.submit.click();

      expect(tester.componentInstance.form.controls.age!.invalid).toBe(true);
      expect(window.getComputedStyle(tester.ageErrors.nativeElement).display).toBe('none');
      expect(tester.ageErrors.elements('div').length).toBe(0);
    });

    it('should remove error if no error', () => {
      tester.submit.click();

      tester.firstName.fillWith('JB');

      expect(tester.firstNameErrors.elements('div').length).toBe(0);
    });

    it('should honor the label', () => {
      tester.submit.click();
      expect(tester.firstNameErrors).toContainText('The first name is required');
    });

    it('should expose the error', () => {
      tester.lastName.fillWith('a');
      tester.lastName.dispatchEventOfType('blur');
      expect(tester.lastNameErrors).toContainText('min length: 2');
    });

    it('should display all errors in order', () => {
      tester.lastName.fillWith('1');
      tester.lastName.dispatchEventOfType('blur');
      expect(tester.lastNameErrors.elements('div').length).toBe(2);
      expect(tester.lastNameErrors.elements('div')[0]).toContainText('min length: 2');
      expect(tester.lastNameErrors.elements('div')[1]).toContainText('only letters');
    });

    it('should allow passing a control rather than a control name', () => {
      tester.submit.click();
      expect(tester.ageErrors).toContainText('age required');
    });

    it('should validate controls inside a nested form group', () => {
      tester.submit.click();
      expect(tester.passwordErrors).toContainText('password is required');
    });

    it('should validate controls inside a nested form array', () => {
      tester.submit.click();
      expect(tester.hobbyErrors).toContainText('each hobby required');
    });

    it('should validate a form group identified by controlName', () => {
      tester.password.fillWith('a');
      tester.submit.click();
      expect(tester.credentialsControlNameErrors).toContainText('match with controlName error');
    });

    it('should validate a form group identified by control', () => {
      tester.password.fillWith('a');
      tester.submit.click();
      expect(tester.credentialsControlErrors).toContainText('match with control error');
    });

    it('should display fallback errors', () => {
      tester.email.fillWith('long invalid email with 1234');
      tester.submit.click();
      expect(tester.emailErrors.elements('div').length).toBe(3);
      expect(tester.emailErrors.elements('div')[0]).toContainText('email must be a valid email address');
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type maxlength');
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type pattern');
    });
  });

  describe('standalone controls', () => {
    let tester: StandaloneComponentTester;

    beforeEach(() => {
      TestBed.configureTestingModule({});

      tester = new StandaloneComponentTester();
      tester.detectChanges();
    });

    it('should validate standalone reactive control', () => {
      expect(tester.fooErrors).not.toContainText('foo required');

      tester.foo.dispatchEventOfType('blur');

      expect(tester.fooErrors).toContainText('foo required');
    });

    it('should validate standalone template-driven control', () => {
      expect(tester.barErrors).not.toContainText('bar required');

      tester.bar.dispatchEventOfType('blur');

      expect(tester.barErrors).toContainText('bar required');
    });
  });

  describe('template-driven forms', () => {
    let tester: TemplateDrivenComponentTester;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({});

      tester = new TemplateDrivenComponentTester();
      tick();
      tester.detectChanges();
    }));

    it('should validate top-level field with control', () => {
      expect(tester.firstNameErrors).not.toContainText('first name required');
      tester.submit.click();
      expect(tester.firstNameErrors).toContainText('first name required');
    });

    it('should validate top-level field with controlName', () => {
      expect(tester.lastNameErrors).not.toContainText('last name required');
      tester.submit.click();
      expect(tester.lastNameErrors).toContainText('last name required');
    });

    it('should validate field nested in model group', () => {
      expect(tester.passwordErrors).not.toContainText('password required');
      tester.submit.click();
      expect(tester.passwordErrors).toContainText('password required');
    });
  });

  describe('with wrong control name', () => {
    let tester: WrongControlNameComponentTester;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({});

      tester = new WrongControlNameComponentTester();
      tick();
      tester.detectChanges();
    }));

    it('should not throw by default', fakeAsync(() => {
      expect(() => tester.detectChanges()).not.toThrowError();
      expect(tester.firstNameErrors).not.toContainText('first name required');
    }));

    it('should throw if configured to', fakeAsync(() => {
      const config = TestBed.inject(ValdemortConfig);
      config.shouldThrowOnMissingControl = () => true;
      expect(() => tester.detectChanges()).toThrowError(`ngx-valdemort: no control found for controlName: 'lastName'.`);
    }));
  });

  describe('configuration', () => {
    let tester: ReactiveComponentTester;

    beforeEach(() => {
      TestBed.configureTestingModule({});

      const config = TestBed.inject(ValdemortConfig);
      config.displayMode = DisplayMode.ONE;
      config.errorsClasses = 'a b';
      config.errorClasses = 'c d';
      config.shouldDisplayErrors = control => control.dirty;

      tester = new ReactiveComponentTester();
      tester.detectChanges();
    });

    it('should display error once dirty', () => {
      expect(tester.firstNameErrors).not.toContainText('The first name is required');
      tester.firstName.fillWith('a');
      tester.firstName.fillWith('');
      expect(tester.firstNameErrors).toContainText('The first name is required');
    });

    it('should display the first error only', () => {
      tester.lastName.fillWith('1');
      expect(tester.lastNameErrors.elements('div').length).toBe(1);
      expect(tester.lastNameErrors).toContainText('min length: 2');
    });

    it('should display the first error in case of fallback', () => {
      tester.email.fillWith('long email with 1234');
      expect(tester.emailErrors.elements('div').length).toBe(1);
      expect(tester.emailErrors).toContainText('email must be a valid email address');

      tester.email.fillWith('long-rejected-email@mail.com');
      expect(tester.emailErrors.elements('div').length).toBe(1);
      expect(tester.emailErrors).toContainText('The email has an unhandled error of type');
    });

    it('should add CSS classes to the errors component', () => {
      tester.lastName.fillWith('1');
      expect(tester.lastNameErrors).toHaveClass('a');
      expect(tester.lastNameErrors).toHaveClass('b');
    });

    it('should add CSS classes to the error divs', () => {
      tester.lastName.fillWith('1');
      expect(tester.lastNameErrors.element('div.c')).not.toBeNull();
      expect(tester.lastNameErrors.element('div.d')).not.toBeNull();
    });
  });
});
