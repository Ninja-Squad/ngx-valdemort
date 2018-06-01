import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationErrorsComponent, ValidationErrorDirective } from './validation-errors/validation-errors.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationErrorsComponent,
    ValidationErrorDirective
  ],
  exports: [
    ValidationErrorsComponent,
    ValidationErrorDirective
  ]
})
export class NgxValmesModule { }
