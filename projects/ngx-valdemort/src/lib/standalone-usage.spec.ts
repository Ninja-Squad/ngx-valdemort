import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from './validation-errors.component';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';
import { DefaultValidationErrorsDirective } from './default-validation-errors.directive';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { beforeEach, describe, expect, test } from 'vitest';

@Component({
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
  imports: [
    ReactiveFormsModule,
    DefaultValidationErrorsDirective,
    ValidationErrorsComponent,
    ValidationErrorDirective,
    ValidationFallbackDirective
  ],
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

class TestComponentTester {
  readonly fixture = TestBed.createComponent(TestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly name = this.root.getByCss('#name');
  readonly nameErrors = this.root.getByCss('#name-errors');
  readonly street = this.root.getByCss('#street');
  readonly streetErrors = this.root.getByCss('#street-errors');
}

describe('StandaloneUsage', () => {
  let tester: TestComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
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
    await tester.name.fill('abcdef1');
    await userEvent.tab();

    await expect.element(tester.nameErrors.getByCss('div').nth(0)).toHaveTextContent('only letters');
    await expect
      .element(tester.nameErrors.getByCss('div').nth(1))
      .toHaveTextContent('The name has an error of type maxlength with value 5');
  });

  test('should favor custom fallback over default fallback', async () => {
    await tester.street.fill('too long street');
    await userEvent.tab();

    await expect.element(tester.streetErrors.getByCss('div').nth(0)).toHaveTextContent('oops');
  });
});
