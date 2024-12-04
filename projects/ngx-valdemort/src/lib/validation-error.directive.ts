/* eslint-disable @angular-eslint/directive-selector,@angular-eslint/no-input-rename */
import { Directive, input, TemplateRef, inject } from '@angular/core';

/**
 * The context of the ValidationErrorDirective
 */
interface ValidationErrorContext {
  /**
   * The label
   */
  $implicit: string | null;

  /**
   * The error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

/**
 * Directive allowing to define the template for an error of a given type (using the `valError` input), using an ng-template.
 * It's used inside the body of the validation errors component, or inside the body of the default validation errors directive.
 * See the documentation of these two for example usages.
 */
@Directive({
  selector: 'ng-template[valError]'
})
export class ValidationErrorDirective {
  templateRef = inject<TemplateRef<ValidationErrorContext>>(TemplateRef);

  /**
   * The type of the error that the content of the template must display.
   */
  type = input.required<string>({ alias: 'valError' });

  static ngTemplateContextGuard(directive: ValidationErrorDirective, context: unknown): context is ValidationErrorContext {
    return true;
  }
}
