import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentTester } from 'ngx-speculoos';
import { TestBed } from '@angular/core/testing';
import { ValdemortModule } from './valdemort.module';

@Component({
  selector: 'val-default-errors-test-component',
  template: `
    <val-default-errors>
      <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      <ng-template valError="minlength" let-label let-error="error">
        {{ label }} must have at least {{ error.requiredLength }} characters
      </ng-template>
      <ng-template valError="pattern" let-label>{{ label }} is not correct</ng-template>
      <ng-template valFallback let-label let-error="error" let-type="type">
        {{ label }} has an error of type {{ type }} with value {{ error.requiredLength }}
      </ng-template>
    </val-default-errors>

    <input id="name" [formControl]="name" />
    <val-errors id="name-errors" label="The name" [control]="name">
      <ng-template valError="pattern">only letters</ng-template>
    </val-errors>

    <input id="street" [formControl]="street" />
    <val-errors id="street-errors" label="The street" [control]="street">
      <ng-template valFallback>oops</ng-template>
    </val-errors>
  `,
  imports: [ReactiveFormsModule, ValdemortModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  readonly name = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern(/^[a-z]*$/),
    Validators.maxLength(5)
  ]);
  readonly street = new FormControl('', [Validators.maxLength(5)]);
}

class DefaultErrorsComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get name() {
    return this.input('#name')!;
  }

  get nameErrors() {
    return this.element('#name-errors')!;
  }

  get street() {
    return this.input('#street')!;
  }

  get streetErrors() {
    return this.element('#street-errors')!;
  }
}

describe('DefaultValidationErrorsDirective', () => {
  let tester: DefaultErrorsComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    tester = new DefaultErrorsComponentTester();
    await tester.change();
  });

  it('should validate with default errors', async () => {
    await tester.name.dispatchEventOfType('blur');

    expect(tester.nameErrors).toContainText('The name is required');
  });

  it('should respect order of errors, allow overriding message, and expose the error', async () => {
    await tester.name.fillWith('1');
    await tester.name.dispatchEventOfType('blur');

    expect(tester.nameErrors.elements('div')[0]).toContainText('The name must have at least 2 characters');
    expect(tester.nameErrors.elements('div')[1]).toContainText('only letters');
  });

  it('should display the fallback error is not handled', async () => {
    await tester.name.fillWith('abcdef1');
    await tester.name.dispatchEventOfType('blur');

    expect(tester.nameErrors.elements('div')[0]).toContainText('only letters');
    expect(tester.nameErrors.elements('div')[1]).toContainText('The name has an error of type maxlength with value 5');
  });

  it('should favor custom fallback over default fallback', async () => {
    await tester.street.fillWith('too long street');
    await tester.street.dispatchEventOfType('blur');

    expect(tester.streetErrors.elements('div')[0]).toContainText('oops');
  });
});
