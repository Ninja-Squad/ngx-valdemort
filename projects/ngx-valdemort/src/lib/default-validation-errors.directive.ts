/* tslint:disable:use-host-property-decorator */
/* tslint:disable:directive-selector */
import { AfterContentInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { DefaultValidationErrors } from './default-validation-errors.service';
import { ValidationErrorDirective } from './validation-error.directive';

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
 * This directive stores the default template references in a service, that is then injected in the validation errors components
 * to be reused.
 */
@Directive({
  selector: 'val-default-errors',
  host: {
    style: 'display: none'
  }
})
export class DefaultValidationErrorsDirective implements AfterContentInit {

  constructor(private defaultValidationErrors: DefaultValidationErrors) { }

  /**
   * The list of validation error directives (i.e. <ng-template valError="...">)
   * contained inside the component element.
   */
  @ContentChildren(ValidationErrorDirective)
  errorDirectives: QueryList<ValidationErrorDirective>;

  ngAfterContentInit() {
    this.defaultValidationErrors.directives = this.errorDirectives.toArray();
  }
}

