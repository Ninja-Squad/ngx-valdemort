/* eslint-disable @angular-eslint/directive-selector,@angular-eslint/no-input-rename */
import { Directive, TemplateRef } from '@angular/core';

/**
 * The context of the ValidationFallbackDirective
 */
interface ValidationFallbackContext {
  /**
   * The label
   */
  $implicit: string | null;

  /**
   * The error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;

  /**
   * The type of the error
   */
  type: string;
}

/**
 * Directive allowing to define a fallback template for an error of a type that is not handled by any validation error directive.
 * It's used inside the body of the validation errors component, or inside the body of the default validation errors directive.
 * See the documentation of these two for example usages.
 *
 * This is useful to handle forgotten errors instead of displaying no error at all, or to handle all or several error types in the same way,
 * for example by relying on the error key to choose an internationalized message.
 */
@Directive({ selector: 'ng-template[valFallback]' })
export class ValidationFallbackDirective {
  constructor(public templateRef: TemplateRef<ValidationFallbackContext>) {}

  static ngTemplateContextGuard(directive: ValidationFallbackDirective, context: unknown): context is ValidationFallbackContext {
    return true;
  }
}
