import { TestBed } from '@angular/core/testing';

import { NgModelComponent } from './ng-model.component';
import { ComponentTester, TestButton, TestHtmlElement } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class NgModelComponentTester extends ComponentTester<NgModelComponent> {
  constructor() {
    super(NgModelComponent);
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

  get submit() {
    return this.button('button')!;
  }

  get reset() {
    return this.elements('button')[1]! as TestButton;
  }
}

describe('NgModelComponent', () => {
  let tester: NgModelComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    await validationDefaultsComponentComponentFixture.whenStable();
    tester = new NgModelComponentTester();
    await tester.change();
    await tester.demoTab.click();
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
    expect(tester.form).not.toContainText('The email is required');

    await tester.submit.click();

    expect(tester.form).toContainText('The email is required');
  });

  it('should reset the form', async () => {
    await tester.email.fillWith('ab');
    await tester.email.dispatchEventOfType('blur');

    await tester.submit.click();

    expect(tester.form).toContainText('The email must be a valid email address');

    await tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.email).toHaveValue('');
  });
});
