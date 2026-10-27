import { NgModule } from '@angular/core';
import { DefaultValidationErrorsDirective } from './default-validation-errors.directive';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationErrorsComponent } from './validation-errors.component';
import { ValidationFallbackDirective } from './validation-fallback.directive';
import { ValidationSignalErrorsComponent } from './validation-signal-errors.component';

@NgModule({
  imports: [
    ValidationErrorsComponent,
    ValidationSignalErrorsComponent,
    ValidationErrorDirective,
    ValidationFallbackDirective,
    DefaultValidationErrorsDirective
  ],
  exports: [
    ValidationErrorsComponent,
    ValidationSignalErrorsComponent,
    ValidationErrorDirective,
    ValidationFallbackDirective,
    DefaultValidationErrorsDirective
  ]
})
export class ValdemortModule {}
