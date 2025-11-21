import { TestBed } from '@angular/core/testing';

import { SignalFormComponent } from './signal-form.component';
import { ComponentTester } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class SignalFormComponentTester extends ComponentTester<SignalFormComponent> {
  constructor() {
    super(SignalFormComponent);
  }

  get demoTab() {
    return this.elements<HTMLAnchorElement>('.nav-tabs .nav-link').find(el => el.textContent!.includes('Demo'))!;
  }

  get form() {
    return this.element('form')!;
  }

  get name() {
    return this.input('input')!;
  }

  get email() {
    return this.elements<HTMLInputElement>('input')[1]!;
  }

  get submit() {
    return this.button('button')!;
  }

  get reset() {
    return this.elements<HTMLButtonElement>('button')[1]!;
  }
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
    await tester.change();
    await tester.demoTab.click();
  });

  it('should validate required name on blur', async () => {
    expect(tester.form).not.toContainText('The name is required');
    await tester.name.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The name is required');
  });

  it('should validate required email on blur', async () => {
    expect(tester.form).not.toContainText('The email is required');
    await tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email is required');
  });

  it('should validate valid email', async () => {
    await tester.email.fillWith('ab');
    expect(tester.form).not.toContainText('The email must be a valid email address');
    await tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate fields on submit', async () => {
    expect(tester.form).not.toContainText('The name is required');
    expect(tester.form).not.toContainText('The email is required');

    await tester.submit.click();

    expect(tester.form).toContainText('The name is required');
    expect(tester.form).toContainText('The email is required');
  });

  it('should reset the form', async () => {
    await tester.name.dispatchEventOfType('blur');

    await tester.email.fillWith('ab');
    await tester.email.dispatchEventOfType('blur');

    await tester.submit.click();

    expect(tester.form).toContainText('The name is required');
    expect(tester.form).toContainText('The email must be a valid email address');

    await tester.reset.click();

    expect(tester.form).not.toContainText('The name is required');
    expect(tester.form).not.toContainText('The email is required');
    expect(tester.name).toHaveValue('');
    expect(tester.email).toHaveValue('');
  });
});
