import { NgModule } from '@angular/core';
import { ValidationErrorsComponent } from './validation-errors.component';
import { DefaultValidationErrorsDirective } from './default-validation-errors.directive';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';

@NgModule({
  imports: [ValidationErrorsComponent, ValidationErrorDirective, ValidationFallbackDirective, DefaultValidationErrorsDirective],
  exports: [ValidationErrorsComponent, ValidationErrorDirective, ValidationFallbackDirective, DefaultValidationErrorsDirective]
})
export class ValdemortModule {}
