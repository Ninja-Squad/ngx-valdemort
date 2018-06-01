import { async, TestBed } from '@angular/core/testing';

import { ValidationErrorDirective, ValidationErrorsComponent } from './validation-errors.component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';

@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="foo" id="test" />
      <ngx-validation-errors [control]="form.get('foo')">
        <ng-template ngxError="required">foo is required</ng-template>
        <ng-template ngxError="pattern">foo is incorrect</ng-template>
      </ngx-validation-errors>

      <input formControlName="bar" type="number" id="number"/>
      <ngx-validation-errors [control]="form.get('bar')">
        <ng-template ngxError="max" let-error>bar must be max {{ error.max }}</ng-template>
      </ngx-validation-errors>

      <button>Submit</button>
    </form>
  `
})
class TestComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      foo: ['', Validators.required],
      bar: [null, Validators.max(10)]
    });
  }

  submit() {}
}

class ValidationErrorsComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get testInput() {
    return this.input('#test');
  }

  get numberInput() {
    return this.input('#number');
  }

  get testErrors() {
    return this.elements('ngx-validation-errors')[0];
  }

  get numberErrors() {
    return this.elements('ngx-validation-errors')[1];
  }

  get submit() {
    return this.button('button');
  }
}

describe('ValidationErrorsComponent', () => {
  let tester: ValidationErrorsComponentTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ValidationErrorsComponent,
        ValidationErrorDirective
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    tester = new ValidationErrorsComponentTester();
    tester.detectChanges();

    jasmine.addMatchers(speculoosMatchers);
  }));

  it('should not display error message if not blurred nor submitted', () => {
    expect(tester.testErrors).not.toContainText('foo is required');
  });

  it('should display error message if blurred', () => {
    tester.testInput.dispatchEventOfType('blur');

    expect(tester.testErrors).toContainText('foo is required');
  });

  it('should display error message if submitted', () => {
    tester.submit.click();

    expect(tester.testErrors).toContainText('foo is required');
  });

  it('should not display error message if valid', () => {
    tester.testInput.fillWith('hello');
    tester.submit.click();

    expect(tester.testErrors).not.toContainText('foo is required');
  });

  it('should not display error message if not present', () => {
    tester.submit.click();

    expect(tester.testErrors).toContainText('foo is required');
    expect(tester.testErrors).not.toContainText('foo is incorrect');
  });

  it('should have CSS class which changes if error should be shown', () => {
    expect(tester.testErrors).toHaveClass('invalid-feedback');
    expect(tester.testErrors).not.toHaveClass('d-block');
    expect(tester.testErrors).toHaveClass('d-none');

    tester.submit.click();

    expect(tester.testErrors).toHaveClass('invalid-feedback');
    expect(tester.testErrors).toHaveClass('d-block');
    expect(tester.testErrors).not.toHaveClass('d-none');

    tester.testInput.fillWith('hello');

    expect(tester.testErrors).toHaveClass('invalid-feedback');
    expect(tester.testErrors).not.toHaveClass('d-block');
    expect(tester.testErrors).toHaveClass('d-none');
  });

  it('should expose the error', () => {
    tester.numberInput.fillWith('11');
    tester.submit.click();
    expect(tester.numberErrors).toContainText('bar must be max 10');
  });
});
