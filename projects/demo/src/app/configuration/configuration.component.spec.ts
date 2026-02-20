import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';

import { ConfigurationComponent } from './configuration.component';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, test } from 'vitest';

class ConfigurationComponentTester {
  readonly fixture = TestBed.createComponent(ConfigurationComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly demoTab = this.root.getByRole('tab', { name: 'Demo' });
  readonly form = this.root.getByCss('form');
  readonly email = this.form.getByLabelText('Email');
  readonly age = this.form.getByLabelText('Age');
  readonly submit = this.form.getByRole('button', { name: 'Submit' });
  readonly reset = this.form.getByRole('button', { name: 'Reset' });
  readonly emailErrors = this.form.getByTestId('email-errors');
  readonly ageErrors = this.form.getByTestId('age-errors');
}

describe('ConfigurationComponent', () => {
  let tester: ConfigurationComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();

    tester = new ConfigurationComponentTester();
    await tester.demoTab.click();
  });

  test('should validate required email on dirty', async () => {
    await expect.element(tester.emailErrors).not.toHaveTextContent('The email is required');
    await tester.email.fill('a');
    await tester.email.fill('');
    await expect.element(tester.emailErrors).toHaveTextContent('The email is required');
    await expect.element(tester.emailErrors).not.toHaveClass('invalid-feedback');
    await expect.element(tester.emailErrors).toHaveClass('text-warning');
  });

  test('should validate required age on dirty', async () => {
    await expect.element(tester.ageErrors).not.toHaveTextContent('The age is required');
    await tester.age.fill('1');
    await tester.age.fill('');
    await expect.element(tester.ageErrors).toHaveTextContent('The age is required');
    await expect.element(tester.ageErrors).not.toHaveClass('invalid-feedback');
    await expect.element(tester.ageErrors).toHaveClass('text-warning');
  });

  test('should validate valid email on dirty', async () => {
    await expect.element(tester.emailErrors).not.toHaveTextContent('The email must be a valid email address');
    await tester.email.fill('ab');
    await expect.element(tester.emailErrors).toHaveTextContent('The email must be a valid email address');
  });

  test('should validate min age on dirty', async () => {
    await expect.element(tester.ageErrors).not.toHaveTextContent('You must be at least 18 years old');
    await tester.age.fill('17');
    await expect.element(tester.ageErrors).toHaveTextContent('You must be at least 18 years old');
  });

  test('should not validate field on submit', async () => {
    await expect.element(tester.emailErrors).not.toHaveTextContent('The email is required');
    await expect.element(tester.ageErrors).not.toHaveTextContent('The age is required');

    await tester.submit.click();

    await expect.element(tester.emailErrors).not.toHaveTextContent('The email is required');
    await expect.element(tester.ageErrors).not.toHaveTextContent('The age is required');
  });

  test('should reset the form', async () => {
    await tester.email.fill('ab');
    await tester.age.fill('17');
    await expect.element(tester.emailErrors).toHaveTextContent('The email must be a valid email address');
    await expect.element(tester.ageErrors).toHaveTextContent('You must be at least 18 years old');

    await tester.reset.click();

    await expect.element(tester.emailErrors).not.toHaveTextContent('The email must be a valid email address');
    await expect.element(tester.ageErrors).not.toHaveTextContent('You must be at least 18 years old');
    await expect.element(tester.email).toHaveDisplayValue('');
    await expect.element(tester.age).toHaveDisplayValue('');
  });
});
