import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';
import { async, TestBed } from '@angular/core/testing';
import { ValidationErrorsModule } from './validation-errors.module';

@Component({
  selector: 've-default-errors-test-component',
  template: `
    <ve-default-errors>
      <ng-template veType="required" let-label>{{ label }} is required</ng-template>
      <ng-template veType="minlength" let-label let-error="error">
        {{ label }} must have at least {{ error.requiredLength }} characters
      </ng-template>
      <ng-template veType="pattern" let-label>{{ label }} is not correct</ng-template>
    </ve-default-errors>

    <input [formControl]="name" />
    <ve-errors label="The name" [control]="name">
      <ng-template veType="pattern">only letters</ng-template>
    </ve-errors>
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
    return this.input('input');
  }

  get errors() {
    return this.element('ve-errors');
  }
}
describe('DefaultValidationErrorsDirective', () => {
  let tester: DefaultErrorsComponentTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ValidationErrorsModule],
      declarations: [TestComponent]
    });

    tester = new DefaultErrorsComponentTester();
    tester.detectChanges();
    jasmine.addMatchers(speculoosMatchers);
  }));

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
