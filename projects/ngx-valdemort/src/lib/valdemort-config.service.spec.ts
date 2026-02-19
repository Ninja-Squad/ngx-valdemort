import { ValdemortConfig, DisplayMode } from './valdemort-config.service';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { FieldState, form } from '@angular/forms/signals';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from 'vitest';

describe('ValdemortConfig', () => {
  let config: ValdemortConfig;

  beforeEach(() => {
    config = new ValdemortConfig();
  });

  test('should display ALL by default', async () => {
    expect(config.displayMode).toBe(DisplayMode.ALL);
  });

  test('should have no errorsClasses', async () => {
    expect(config.errorsClasses).toBeNull();
  });

  test('should have no errorClasses', async () => {
    expect(config.errorClasses).toBeNull();
  });

  test('should display errors if control is touched', async () => {
    const control: AbstractControl = new FormControl();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(false);

    control.markAsTouched();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(true);
  });

  test('should display errors if form is submitted', async () => {
    const control: AbstractControl = new FormControl();
    let form = {
      submitted: false
    } as FormGroupDirective;

    expect(config.shouldDisplayErrors(control, form)).toBe(false);

    form = {
      submitted: true
    } as FormGroupDirective;

    expect(config.shouldDisplayErrors(control, form)).toBe(true);
  });

  test('should display errors if field is touched', async () => {
    const fieldState: FieldState<string> = TestBed.runInInjectionContext(() => form(signal({ name: '' })).name());

    expect(config.shouldDisplayFieldErrors(fieldState)).toBe(false);

    fieldState.markAsTouched();

    expect(config.shouldDisplayFieldErrors(fieldState)).toBe(true);
  });

  test('must allow mutating when errors should be displayed', async () => {
    config.shouldDisplayErrors = ctrl => ctrl.dirty;

    const control: AbstractControl = new FormControl();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(false);

    control.markAsDirty();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(true);
  });
});
