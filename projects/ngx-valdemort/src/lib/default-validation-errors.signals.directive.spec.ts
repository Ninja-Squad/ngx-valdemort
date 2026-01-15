import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentTester } from 'ngx-speculoos';
import { TestBed } from '@angular/core/testing';
import { ValdemortModule } from './valdemort.module';
import { FormField, form, maxLength, minLength, pattern, required } from '@angular/forms/signals';

@Component({
  selector: 'val-default-errors-test-component',
  template: `
    <val-default-errors>
      <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      <ng-template valError="minLength" let-label let-error="error">
        {{ label }} must have at least {{ error.minLength }} characters
      </ng-template>
      <ng-template valError="pattern" let-label>{{ label }} is not correct</ng-template>
      <ng-template valFallback let-label let-error="error" let-type="type">
        {{ label }} has an error of type {{ type }} with value {{ error.maxLength }}
      </ng-template>
    </val-default-errors>

    <input id="name" [formField]="form.name" />
    <val-signal-errors id="name-errors" label="The name" [forField]="form.name">
      <ng-template valError="pattern">only letters</ng-template>
    </val-signal-errors>

    <input id="street" [formField]="form.street" />
    <val-signal-errors id="street-errors" label="The street" [forField]="form.street">
      <ng-template valFallback>oops</ng-template>
    </val-signal-errors>
  `,
  imports: [ValdemortModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  readonly form = form(
    signal({
      name: '',
      street: ''
    }),
    form => {
      required(form.name);
      minLength(form.name, 2);
      pattern(form.name, /^[a-z]*$/);
      maxLength(form.name, 5);
      maxLength(form.street, 5);
    }
  );
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

describe('DefaultValidationErrorsDirective with val-signal-errors', () => {
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
    expect(tester.nameErrors.elements('div')[1]).toContainText('The name has an error of type maxLength with value 5');
  });

  it('should favor custom fallback over default fallback', async () => {
    await tester.street.fillWith('too long street');
    await tester.street.dispatchEventOfType('blur');

    expect(tester.streetErrors.elements('div')[0]).toContainText('oops');
  });
});
