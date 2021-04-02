import { Injectable } from '@angular/core';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';

/**
 * Service used by the default validation errors directive to store the default error template references. This
 * service is injected in the validation errors component which displays the appropriate templates and provides their context.
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultValidationErrors {
  directives: Array<ValidationErrorDirective> = [];
  fallback: ValidationFallbackDirective | undefined;
}
