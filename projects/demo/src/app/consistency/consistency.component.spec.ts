import { TestBed } from '@angular/core/testing';

import { ConsistencyComponent } from './consistency.component';
import { ComponentTester, TestButton, TestHtmlElement, TestInput } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class ConsistencyComponentTester extends ComponentTester<ConsistencyComponent> {
  constructor() {
    super(ConsistencyComponent);
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

describe('ConsistencyComponent', () => {
  let tester: ConsistencyComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();

    tester = new ConsistencyComponentTester();
    await tester.change();
    await tester.demoTab.click();
  });

  it('should validate required email on blur', async () => {
    expect(tester.form).not.toContainText('The email is required');
    await tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email is required');
  });

  it('should validate required age on blur', async () => {
    expect(tester.form).not.toContainText('This field is required');
    await tester.age.dispatchEventOfType('blur');
    expect(tester.form).toContainText('This field is required');
  });

  it('should validate valid email', async () => {
    await tester.email.fillWith('ab');
    expect(tester.form).not.toContainText('The email must be a valid email address');
    await tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate min age', async () => {
    await tester.age.fillWith('17');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    await tester.age.dispatchEventOfType('blur');
    expect(tester.form).toContainText('You must be at least 18 years old');
  });

  it('should validate fields on submit', async () => {
    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('This field is required');

    await tester.submit.click();

    expect(tester.form).toContainText('The email is required');
    expect(tester.form).toContainText('This field is required');
  });

  it('should reset the form', async () => {
    await tester.email.fillWith('ab');
    await tester.email.dispatchEventOfType('blur');

    await tester.age.fillWith('17');
    await tester.age.dispatchEventOfType('blur');

    await tester.submit.click();

    expect(tester.form).toContainText('The email must be a valid email address');
    expect(tester.form).toContainText('You must be at least 18 years old');

    await tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    expect(tester.email).toHaveValue('');
    expect(tester.age).toHaveValue('');
  });
});
