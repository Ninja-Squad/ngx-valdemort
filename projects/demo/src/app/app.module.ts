import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsModule } from 'ngx-valdemort';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
