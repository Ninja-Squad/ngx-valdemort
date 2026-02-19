import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';

import { NgModelComponent } from './ng-model.component';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, test } from 'vitest';

class NgModelComponentTester {
  readonly fixture = TestBed.createComponent(NgModelComponent);
  readonly componentInstance = this.fixture.componentInstance;
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly demoTab = this.root.getByCss('.nav-tabs').getByText('Demo');
  readonly form = this.root.getByCss('form');
  readonly email = this.root.getByCss('input[type="email"]');
  readonly submit = this.form.getByCss('button').nth(0);
  readonly reset = this.form.getByCss('button').nth(1);
}

describe('NgModelComponent', () => {
  let tester: NgModelComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();
    tester = new NgModelComponentTester();
    await tester.fixture.whenStable();
    await tester.demoTab.click();
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
    await expect.element(tester.form).not.toHaveTextContent('The email is required');

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The email is required');
  });

  test('should reset the form', async () => {
    await tester.email.fill('ab');
    await userEvent.tab();

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The email must be a valid email address');

    await tester.reset.click();

    await expect.element(tester.form).not.toHaveTextContent('The email must be a valid email address');
    await expect.element(tester.email).toHaveValue('');
  });
});
