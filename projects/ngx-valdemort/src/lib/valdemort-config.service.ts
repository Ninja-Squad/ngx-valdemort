import { Injectable } from '@angular/core';
import type { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import type { FieldState } from '@angular/forms/signals';

/**
 * The display mode of the validation errors. For a given control, either all the validation errors
 * are displayed, or only the first one.
 */
export enum DisplayMode {
  ALL,
  ONE
}

/**
 * The configuration service used by the validation errors component to apply common rules for all
 * form controls.
 *
 * To change its default behavior, you can either inject this service in your root module or component and mutate it,
 * or define your own implementation and provide it.
 */
@Injectable({
  providedIn: 'root'
})
export class ValdemortConfig {
  /**
   * The display mode of the errors. The default value is ALL, meaning that all the errors existing on a control
   * (and which have an error template defined) are displayed.
   */
  displayMode = DisplayMode.ALL;

  /**
   * Specifies one or several CSS classes (separated by a white space) that are automatically added to the
   * validation errors element. This can be useful to reuse a standard CSS class of your CSS framework (like
   * .invalid-feedback in BootStrap), rather than styling the val-errors element itself.
   *
   * The default value is null (no class is added).
   */
  errorsClasses: string | null = null;

  /**
   * Specifies one or several CSS classes (separated by a white space) that are automatically added to the
   * each validation error message element. This can be useful to reuse a standard CSS class of your CSS framework
   * rather than styling the div element itself.
   *
   * The default value is null (no class is added).
   */
  errorClasses: string | null = null;

  /**
   * Specifies when error messages should be displayed based on the state of the control itself (touched, dirty, etc.)
   * and on the state of the form directive containing it (if any). This function is only called if the control is invalid
   * in the first place: if it's valid, errors are never displayed.
   *
   * The default value of this function returns true if the control is touched, or if the form (if any) is submitted.
   */
  shouldDisplayErrors: (control: AbstractControl, form: NgForm | FormGroupDirective | undefined) => boolean = (
    control: AbstractControl,
    form: NgForm | FormGroupDirective | undefined
  ) => control.touched || (!!form && form.submitted);

  /**
   * Specifies when error messages should be displayed based on the state of the field (touched, dirty, etc.).
   * This function must be reactive (i.e. it must return its value by reading signals).
   * Note that if the field is valid, errors are never displayed, whatever ths function returns.
   *
   * The default value of this function returns true if the field is touched.
   */
  shouldDisplayFieldErrors: (fieldState: FieldState<unknown, string | number>) => boolean = (
    fieldState: FieldState<unknown, string | number>
  ) => fieldState.touched();

  /**
   * Specifies if the library should throw an error when a control is not found.
   * For example, this can happen if a typo was made in the `controlName`.
   * If the check is enabled, then an error will be thrown in such a case.
   * Otherwise, the error is silently ignored.
   *
   * The default value of this function returns false, thus disabling the check.
   *
   * You can enable the check by giving it a function that returns true,
   * or you can enable it only in development for example with:
   * `config.shouldThrowOnMissingControl = () => !environment.production`
   */
  shouldThrowOnMissingControl: () => boolean = () => false;
}
