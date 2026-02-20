import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';

import { MaterialComponent } from './material.component';
import { ValidationDefaultsComponent } from '../../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, test } from 'vitest';

class MaterialComponentTester {
  readonly fixture = TestBed.createComponent(MaterialComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly demoTab = this.root.getByRole('tab', { name: 'Demo' });
  readonly form = this.root.getByCss('form');
  readonly email = this.form.getByLabelText('Email');
  readonly age = this.form.getByLabelText('Age');
  readonly submit = this.form.getByRole('button', { name: 'Submit' });
  readonly reset = this.form.getByRole('button', { name: 'Reset' });
}

describe('MaterialComponent', () => {
  let tester: MaterialComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();

    tester = new MaterialComponentTester();
    await tester.demoTab.click();
  });

  test('should validate required email on blur', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The email is required');
    await tester.email.click();
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The email is required');
  });

  test('should validate required age on blur', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The age is required');
    await tester.age.click();
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The age is required');
  });

  test('should validate valid email', async () => {
    await tester.email.fill('ab');
    await expect.element(tester.form).not.toHaveTextContent('The email must be a valid email address');
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('The email must be a valid email address');
  });

  test('should validate min age', async () => {
    await tester.age.fill('17');
    await expect.element(tester.form).not.toHaveTextContent('You must be at least 18 years old');
    await userEvent.tab();
    await expect.element(tester.form).toHaveTextContent('You must be at least 18 years old');
  });

  test('should validate fields on submit', async () => {
    await expect.element(tester.form).not.toHaveTextContent('The email is required');
    await expect.element(tester.form).not.toHaveTextContent('The age is required');

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The email is required');
    await expect.element(tester.form).toHaveTextContent('The age is required');
  });

  test('should reset the form', async () => {
    await tester.email.fill('ab');
    await userEvent.tab();

    await tester.age.fill('17');
    await userEvent.tab();

    await tester.submit.click();

    await expect.element(tester.form).toHaveTextContent('The email must be a valid email address');
    await expect.element(tester.form).toHaveTextContent('You must be at least 18 years old');

    await tester.reset.click();

    await expect.element(tester.form).not.toHaveTextContent('The email must be a valid email address');
    await expect.element(tester.form).not.toHaveTextContent('You must be at least 18 years old');
    await expect.element(tester.email).toHaveDisplayValue('');
    await expect.element(tester.age).toHaveDisplayValue('');
  });
});
