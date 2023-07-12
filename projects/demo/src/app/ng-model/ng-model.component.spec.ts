import { discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';

import { NgModelComponent } from './ng-model.component';
import { ComponentTester, speculoosMatchers, TestButton, TestHtmlElement } from 'ngx-speculoos';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    jasmine.addMatchers(speculoosMatchers);
  });

  beforeEach(fakeAsync(() => {
    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    validationDefaultsComponentComponentFixture.detectChanges();
    tester = new NgModelComponentTester();
    tester.detectChanges();
    tester.demoTab.click();
    discardPeriodicTasks();
  }));

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });

  it('should validate required email on blur', () => {
    expect(tester.form).not.toContainText('The email is required');
    tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email is required');
  });

  it('should validate valid email', () => {
    tester.email.fillWith('ab');
    expect(tester.form).not.toContainText('The email must be a valid email address');
    tester.email.dispatchEventOfType('blur');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate fields on submit', () => {
    expect(tester.form).not.toContainText('The email is required');

    tester.submit.click();

    expect(tester.form).toContainText('The email is required');
  });

  it('should reset the form', () => {
    tester.email.fillWith('ab');
    tester.email.dispatchEventOfType('blur');

    tester.submit.click();

    expect(tester.form).toContainText('The email must be a valid email address');

    tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.email).toHaveValue('');
  });
});
