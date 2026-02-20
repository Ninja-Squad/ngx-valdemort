import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { ValdemortModule } from './valdemort.module';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from 'vitest';

@Component({
  selector: 'val-default-errors-test-component',
  template: `
    <val-default-errors>
      <ng-template valError="required" let-label>{{ label }} is required</ng-template>
      <ng-template valError="minLength" let-label let-error="error">
        {{ label }} must have at least {{ error.minLength }} characters
      </ng-template>
      <ng-template valError="custom-pattern" let-label>{{ label }} is not correct</ng-template>
      <ng-template valFallback let-label let-error="error" let-type="type">{{ label }} has an error of type {{ type }} </ng-template>
    </val-default-errors>

    <input id="name" [formField]="form.name" />
    <val-signal-errors id="name-errors" label="The name" [formField]="form.name">
      <ng-template valError="custom-pattern">only letters</ng-template>
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
      // do not use the default maxlength and pattern validators because they add maxlength/pattern attributes
      // to the input which prevents us to type the incorrect values we want to test
      validate(form.name, ctx => (/^[a-z]*$/.test(ctx.value()) ? undefined : { kind: 'custom-pattern' }));
      validate(form.name, ctx => (ctx.value().length > 5 ? { kind: 'custom-maxlength' } : undefined));
      validate(form.street, ctx => (ctx.value().length > 5 ? { kind: 'custom-maxlength' } : undefined));
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

  test('should display the fallback error if not handled', async () => {
    await tester.name.fill('abcdef1');
    await userEvent.tab();

    await expect.element(tester.nameErrors).toHaveTextContent('only letters');
    await expect.element(tester.nameErrors.getByCss('div').nth(1)).toHaveTextContent('The name has an error of type custom-maxlength');
  });

  test('should favor custom fallback over default fallback', async () => {
    await tester.street.fill('too long street');
    await userEvent.tab();

    await expect.element(tester.streetErrors).toHaveTextContent('oops');
  });
});
