import { TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { ComponentTester, TestButton, TestHtmlElement, TestInput } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class ConfigurationComponentTester extends ComponentTester<ConfigurationComponent> {
  constructor() {
    super(ConfigurationComponent);
  }

  get demoTab() {
    return this.elements('.nav-tabs .nav-link').find(el => el.textContent!.includes('Demo')) as TestHtmlElement<HTMLAnchorElement>;
  }

  get form() {
    return this.element('form')!;
  }

  get email() {
    return this.input('input')!;
  }

  get age() {
    return this.elements('input')[1]! as TestInput;
  }

  get submit() {
    return this.button('button')!;
  }

  get reset() {
    return this.elements('button')[1]! as TestButton;
  }
}

describe('ConfigurationComponent', () => {
  let tester: ConfigurationComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();

    tester = new ConfigurationComponentTester();
    await tester.change();
    await tester.demoTab.click();
  });

  it('should validate required email on dirty', async () => {
    expect(tester.form).not.toContainText('The email is required');
    await tester.email.fillWith('a');
    await tester.email.fillWith('');
    expect(tester.form).toContainText('The email is required');
    expect(tester.element('val-errors')).not.toHaveClass('invalid-feedback');
    expect(tester.element('val-errors')).toHaveClass('text-warning');
  });

  it('should validate required age on dirty', async () => {
    expect(tester.form).not.toContainText('The age is required');
    await tester.age.fillWith('1');
    await tester.age.fillWith('');
    expect(tester.form).toContainText('The age is required');
    expect(tester.element('val-errors')).not.toHaveClass('invalid-feedback');
    expect(tester.element('val-errors')).toHaveClass('text-warning');
  });

  it('should validate valid email on dirty', async () => {
    expect(tester.form).not.toContainText('The email must be a valid email address');
    await tester.email.fillWith('ab');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate min age on dirty', async () => {
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    await tester.age.fillWith('17');
    expect(tester.form).toContainText('You must be at least 18 years old');
  });

  it('should not validate field on submit', async () => {
    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('The age is required');

    await tester.submit.click();

    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('The age is required');
  });

  it('should reset the form', async () => {
    await tester.email.fillWith('ab');
    await tester.age.fillWith('17');
    expect(tester.form).toContainText('The email must be a valid email address');
    expect(tester.form).toContainText('You must be at least 18 years old');

    await tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    expect(tester.email).toHaveValue('');
    expect(tester.age).toHaveValue('');
  });
});
