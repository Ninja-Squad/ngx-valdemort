import { async, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnippetComponent } from '../snippet/snippet.component';
import { ValdemortModule } from 'ngx-valdemort';
import { ComponentTester, speculoosMatchers, TestButton, TestHtmlElement, TestInput } from 'ngx-speculoos';
import { ValidationDefaultsComponent } from '../validation-defaults/validation-defaults.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

class ConfigurationComponentTester extends ComponentTester<ConfigurationComponent> {
  constructor() {
    super(ConfigurationComponent);
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

describe('ConfigurationComponent', () => {
  let tester: ConfigurationComponentTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationComponent, SnippetComponent, ValidationDefaultsComponent ],
      imports: [ ReactiveFormsModule, ValdemortModule, NgbTabsetModule.forRoot() ]
    });

    jasmine.addMatchers(speculoosMatchers);
  }));

  beforeEach(() => {
    const validationDefaultsComponentComponentFixture = TestBed.createComponent(ValidationDefaultsComponent);
    validationDefaultsComponentComponentFixture.detectChanges();
    tester = new ConfigurationComponentTester();
    tester.detectChanges();
    tester.demoTab.click();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });

  it('should validate required email on dirty', () => {
    expect(tester.form).not.toContainText('The email is required');
    tester.email.fillWith('a');
    tester.email.fillWith('');
    expect(tester.form).toContainText('The email is required');
    expect(tester.element('val-errors')).not.toHaveClass('invalid-feedback');
    expect(tester.element('val-errors')).toHaveClass('text-warning');
  });

  it('should validate required age on dirty', () => {
    expect(tester.form).not.toContainText('The age is required');
    tester.age.fillWith('1');
    tester.age.fillWith('');
    expect(tester.form).toContainText('The age is required');
    expect(tester.element('val-errors')).not.toHaveClass('invalid-feedback');
    expect(tester.element('val-errors')).toHaveClass('text-warning');
  });

  it('should validate valid email on dirty', () => {
    expect(tester.form).not.toContainText('The email must be a valid email address');
    tester.email.fillWith('ab');
    expect(tester.form).toContainText('The email must be a valid email address');
  });

  it('should validate min age on dirty', () => {
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    tester.age.fillWith('17');
    expect(tester.form).toContainText('You must be at least 18 years old');
  });

  it('should not validate field on submit', () => {
    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('The age is required');

    tester.submit.click();

    expect(tester.form).not.toContainText('The email is required');
    expect(tester.form).not.toContainText('The age is required');
  });

  it('should reset the form', () => {
    tester.email.fillWith('ab');
    tester.age.fillWith('17');
    expect(tester.form).toContainText('The email must be a valid email address');
    expect(tester.form).toContainText('You must be at least 18 years old');

    tester.reset.click();

    expect(tester.form).not.toContainText('The email must be a valid email address');
    expect(tester.form).not.toContainText('You must be at least 18 years old');
    expect(tester.email).toHaveValue('');
    expect(tester.age).toHaveValue('');
  });
});
