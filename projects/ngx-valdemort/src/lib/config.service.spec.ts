import { Config, DisplayMode } from './config.service';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

describe('Config', () => {
  let config: Config;

  beforeEach(() => {
    config = new Config();
  });

  it('should display ALL by default', () => {
    expect(config.displayMode).toBe(DisplayMode.ALL);
  });

  it('should have no errorsClasses', () => {
    expect(config.errorsClasses).toBeNull();
  });

  it('should have no errorClasses', () => {
    expect(config.errorClasses).toBeNull();
  });

  it('should display errors if control is touched', () => {
    const control: AbstractControl = new FormControl();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(false);

    control.markAsTouched();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(true);
  });

  it('should display errors if form is submitted', () => {
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

  it('must allow mutating when errors should be displayed', () => {
    config.shouldDisplayErrors = (control) => control.dirty;

    const control: AbstractControl = new FormControl();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(false);

    control.markAsDirty();

    expect(config.shouldDisplayErrors(control, undefined)).toBe(true);
  });
});
