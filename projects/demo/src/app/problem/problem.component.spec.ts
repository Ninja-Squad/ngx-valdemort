import { TestBed } from '@angular/core/testing';

import { ProblemComponent } from './problem.component';
import { ComponentTester, TestButton, TestHtmlElement, TestInput } from 'ngx-speculoos';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class ProblemComponentTester extends ComponentTester<ProblemComponent> {
  constructor() {
    super(ProblemComponent);
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

describe('ProblemComponent', () => {
  let tester: ProblemComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
  });

  beforeEach(() => {
    tester = new ProblemComponentTester();
    tester.detectChanges();
    tester.demoTab.click();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });

  it('should validate required email on blur', () => {
    expect(tester.form).not.toContainText('The email is required');
    tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email is required');
  });

  it('should validate required age on blur', () => {
    expect(tester.form).not.toContainText('The age is required');
    tester.age.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The age is required');
  });

  it('should validate valid email', () => {
    tester.email.fillWith('ab');
    expect(tester.form).not.toContainText('The email must be a valid email address');
    tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate min age', () => {
    tester.age.fillWith('17');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    tester.age.dispatchEventOfType('blur');
    expect(tester.form).toContainText('You must be at least 18 years old');
  });

  it('should validate fields on submit', () => {
    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('The age is required');

    tester.submit.click();

    expect(tester.form).toContainText('The email is required');
    expect(tester.form).toContainText('The age is required');
  });

  it('should reset the form', () => {
    tester.email.fillWith('ab');
    tester.email.dispatchEventOfType('blur');

    tester.age.fillWith('17');
    tester.age.dispatchEventOfType('blur');

    tester.submit.click();

    expect(tester.form).toContainText('The email must be a valid email address');
    expect(tester.form).toContainText('You must be at least 18 years old');

    tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    expect(tester.email).toHaveValue('');
    expect(tester.age).toHaveValue('');
  });
});
