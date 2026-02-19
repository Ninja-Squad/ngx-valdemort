import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { ValdemortModule } from './valdemort.module';
import { FormField, form, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from 'vitest';

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
    <val-signal-errors id="name-errors" label="The name" [formField]="form.name">
      <ng-template valError="pattern">only letters</ng-template>
    </val-signal-errors>

    <input id="street" [formField]="form.street" />
    <val-signal-errors id="street-errors" label="The street" [formField]="form.street">
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

class DefaultErrorsComponentTester {
  readonly fixture = TestBed.createComponent(TestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly name = this.root.getByCss('#name');
  readonly nameErrors = this.root.getByCss('#name-errors');
  readonly street = this.root.getByCss('#street');
  readonly streetErrors = this.root.getByCss('#street-errors');
}

describe('DefaultValidationErrorsDirective with val-signal-errors', () => {
  let tester: DefaultErrorsComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    tester = new DefaultErrorsComponentTester();
    await tester.fixture.whenStable();
  });

  test('should validate with default errors', async () => {
    await tester.name.click();
    await userEvent.tab();

    await expect.element(tester.nameErrors).toHaveTextContent('The name is required');
  });

  test('should respect order of errors, allow overriding message, and expose the error', async () => {
    await tester.name.fill('1');
    await userEvent.tab();

    await expect.element(tester.nameErrors.getByCss('div').nth(0)).toHaveTextContent('The name must have at least 2 characters');
    await expect.element(tester.nameErrors.getByCss('div').nth(1)).toHaveTextContent('only letters');
  });

  test('should display the fallback error is not handled', async () => {
    // manually remove the pattern and maxlength attributes
    // to allow filling the input with a value that doesn't match the pattern and length and trigger the errors
    await tester.name.element().removeAttribute('pattern');
    await tester.name.element().removeAttribute('maxlength');
    await tester.name.fill('abcdef1');
    await tester.name.click();
    await userEvent.tab();

    await expect.element(tester.nameErrors.getByCss('div').nth(0)).toHaveTextContent('only letters');
    await expect
      .element(tester.nameErrors.getByCss('div').nth(1))
      .toHaveTextContent('The name has an error of type maxLength with value 5');
  });

  test('should favor custom fallback over default fallback', async () => {
    // manually remove the maxlength attribute
    // to allow filling the input with a value longer than 5 characters and trigger the error
    await tester.street.element().removeAttribute('maxlength');
    await tester.street.fill('too long street');
    await tester.street.click();
    await userEvent.tab();

    await expect.element(tester.streetErrors.getByCss('div').nth(0)).toHaveTextContent('oops');
  });
});
