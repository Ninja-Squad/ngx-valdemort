/* tslint:disable:directive-selector */
/* tslint:disable:no-input-rename */
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Directive allowing to define the template for an error of a given type (using the `valType` input), using an ng-template.
 * It's used inside the body of the validation errors component, or inside the body of the default validation errors directive.
 * See the documentation of these two for example usages.
 */
@Directive({selector: 'ng-template[valType]'})
export class ValidationErrorDirective {
  /**
   * The type of the error that the content of the template must display.
   */
  @Input('valType') type: string;

  constructor(public templateRef: TemplateRef<any>) { }
}
