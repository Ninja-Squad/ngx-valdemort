import { NgModule } from '@angular/core';
import { ValidationErrorsComponent } from './validation-errors.component';
import { CommonModule } from '@angular/common';
import { DefaultValidationErrorsDirective } from './default-validation-errors.directive';
import { ValidationErrorDirective } from './validation-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationErrorsComponent,
    ValidationErrorDirective,
    DefaultValidationErrorsDirective
  ],
  exports: [
    ValidationErrorsComponent,
    ValidationErrorDirective,
    DefaultValidationErrorsDirective
  ]
})
export class ValidationErrorsModule { }
