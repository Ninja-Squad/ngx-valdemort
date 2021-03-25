import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';
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
    </val-default-errors>

    <input [formControl]="name" />
    <val-errors label="The name" [control]="name">
      <ng-template valError="pattern">only letters</ng-template>
    </val-errors>
  `
})
class TestComponent {
  name = new FormControl(
    '',
    [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-z]*$/)]
  );
}

class DefaultErrorsComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get name() {
    return this.input('input')!;
  }

  get errors() {
    return this.element('val-errors')!;
  }
}
describe('DefaultValidationErrorsDirective', () => {
  let tester: DefaultErrorsComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ValdemortModule],
      declarations: [TestComponent]
    });

    tester = new DefaultErrorsComponentTester();
    tester.detectChanges();
    jasmine.addMatchers(speculoosMatchers);
  });

  it('should validate with default errors', () => {
    tester.name.dispatchEventOfType('blur');

    expect(tester.errors).toContainText('The name is required');
  });

  it('should respect order of errors, allow overriding message, and expose the error', () => {
    tester.name.fillWith('1');
    tester.name.dispatchEventOfType('blur');

    expect(tester.errors.elements('div')[0]).toContainText('The name must have at least 2 characters');
    expect(tester.errors.elements('div')[1]).toContainText('only letters');
  });
});
