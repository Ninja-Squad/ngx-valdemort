import { async, TestBed } from '@angular/core/testing';

import { MaterialComponent } from './material.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnippetComponent } from '../../snippet/snippet.component';
import { ValdemortModule } from 'ngx-valdemort';
import { ComponentTester, speculoosMatchers, TestButton, TestHtmlElement, TestInput } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../../validation-defaults/validation-defaults.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

class MaterialComponentTester extends ComponentTester<MaterialComponent> {
  constructor() {
    super(MaterialComponent);
  }

  get demoTab() {
    return this.elements('.nav-tabs .nav-link')
      .find(el => el.textContent.includes('Demo')) as TestHtmlElement<HTMLAnchorElement>;
  }

  get form() {
    return this.element('form');
  }

  get email() {
    return this.input('input');
  }

  get age() {
    return this.elements('input')[1] as TestInput;
  }

  get submit() {
    return this.button('button');
  }

  get reset() {
    return this.elements('button')[1] as TestButton;
  }
}

describe('MaterialComponent', () => {
  let tester: MaterialComponentTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialComponent, SnippetComponent, ValidationDefaultsComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        ValdemortModule,
        NgbNavModule
      ]
    });

    jasmine.addMatchers(speculoosMatchers);
  }));

  beforeEach(() => {
    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    validationDefaultsComponentComponentFixture.detectChanges();
    tester = new MaterialComponentTester();
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
