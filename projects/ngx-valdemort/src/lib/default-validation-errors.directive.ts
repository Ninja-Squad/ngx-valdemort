import { AfterContentInit, contentChild, contentChildren, Directive, inject } from '@angular/core';
import { DefaultValidationErrors } from './default-validation-errors.service';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';

/**
 * Directive allowing to register default templates for validation error messages. It's supposed to be used once,
 * typically in the root component. By using templates to do that, error messages can
 * - easily be i18ned
 * - easily use pipes
 * - easily use HTML
 * - easily be ordered
 *
 * Example usage:
 * ```
 *   <val-default-errors>
 *     <ng-template valError="required">This field is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error">This field must be at most {{ error.max | number }}</ng-template>
 *   </val-default-errors>
 * ```
 *
 * Example usage where a label is used to make the messages less generic:
 * ```
 *   <val-default-errors>
 *     <ng-template valError="required" let-label>{{ label }} is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error" let-label>{{ label }} must be at most {{ error.max | number }}</ng-template>
 *   </val-default-errors>
 * ```
 *
 * A fallback template can also be provided. This fallback template is used for all the errors that exist on the form control
 * but are not handled by any of the specific error templates:
 * ```
 *   <val-default-errors>
 *     <ng-template valError="required" let-label>{{ label }} is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error" let-label>{{ label }} must be at most {{ error.max | number }}</ng-template>
 *     <ng-template valFallback let-label let-type="type" let-error="error">{{ label }} has an unhandled error of type {{ type }}: {{ error | json }}</ng-template>
 *   </val-default-errors>
 * ```
 * Using the fallback can also be used to handle all the errors the same way, for example by using the error type as an i18n key
 * to display the appropriate error message.
 *
 * This directive stores the default template references in a service, that is then injected in the validation errors components
 * to be reused.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'val-default-errors'
})
export class DefaultValidationErrorsDirective implements AfterContentInit {
  private defaultValidationErrors = inject(DefaultValidationErrors);

  /**
   * The list of validation error directives (i.e. <ng-template valError="...">)
   * contained inside the directive element.
   */
  readonly errorDirectives = contentChildren(ValidationErrorDirective);

  /**
   * The validation fallback directive (i.e. <ng-template valFallback>) contained inside the directive element.
   */
  readonly fallbackDirective = contentChild(ValidationFallbackDirective);

  ngAfterContentInit(): void {
    this.defaultValidationErrors.directives.set(this.errorDirectives());
    this.defaultValidationErrors.fallback.set(this.fallbackDirective());
  }
}
