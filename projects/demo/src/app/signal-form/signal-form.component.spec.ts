import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';

import { SignalFormComponent } from './signal-form.component';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { beforeEach, describe, expect, test } from 'vitest';

class SignalFormComponentTester {
  readonly fixture = TestBed.createComponent(SignalFormComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly demoTab = this.root.getByCss('.nav-tabs').getByText('Demo');
  readonly form = this.root.getByCss('form');
  readonly name = this.form.getByCss('#signal-form-name');
  readonly email = this.form.getByCss('#signal-form-email');
  readonly submit = this.form.getByCss('button').nth(0);
  readonly reset = this.form.getByCss('button').nth(1);
}

describe('SignalFormComponent', () => {
  let tester: SignalFormComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();

    tester = new SignalFormComponentTester();
    await tester.fixture.whenStable();
    await tester.demoTab.click();
  });

  test('should validate required name on blur', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The name is required');
    await tester.name.click();
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The name is required');
  });

  test('should validate required email on blur', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The email is required');
    await tester.email.click();
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The email is required');
  });

  test('should validate valid email', async () => {
    await tester.email.fill('ab');
    await expect.element(tester.form).not.toHaveTextContent('The email must be a valid email address');
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The email must be a valid email address');
  });

  test('should validate fields on submit', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The name is required');
    await expect.element(tester.form).not.toHaveTextContent('The email is required');

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The name is required');
    await expect.element(tester.form).toHaveTextContent('The email is required');
  });

  test('should reset the form', async () => {
    await userEvent.tab();

    await tester.email.fill('ab');
    await userEvent.tab();

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The name is required');
    await expect.element(tester.form).toHaveTextContent('The email must be a valid email address');

    await tester.reset.click();

    await expect.element(tester.form).not.toHaveTextContent('The name is required');
    await expect.element(tester.form).not.toHaveTextContent('The email is required');
    await expect.element(tester.name).toHaveValue('');
    await expect.element(tester.email).toHaveValue('');
  });
});
