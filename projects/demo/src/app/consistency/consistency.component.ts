import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-consistency',
  templateUrl: './consistency.component.html',
  styleUrls: ['./consistency.component.scss']
})
export class ConsistencyComponent {

  form: FormGroup;
  appSnippet = `<val-default-errors>
  <ng-template valError="required" let-label>{{ label || 'This field' }} is required</ng-template>
  <ng-template valError="email" let-label>{{ label || 'This field' }} must be a valid email address</ng-template>
  <ng-template valError="min" let-error="error" let-label>{{ label || 'This field' }} must be at least {{ error.min | number }}</ng-template>
  <!-- same for the other types of error -->
</val-default-errors>`;

  snippet = `<form [formGroup]="form" #f="ngForm">
  <div class="form-group">
    <label>Email</label>
    <input formControlName="email" class="form-control" type="email"/>
    <val-errors controlName="email" label="The email"></val-errors>
  </div>

  <div class="form-group">
    <label>Age</label>
    <input formControlName="age" class="form-control" type="number"/>
    <val-errors controlName="age">
      <ng-template valError="min" let-error="error">You must be at least {{ error.min }} years old</ng-template>
    </val-errors>
  </div>

  <button class="btn btn-primary mr-2" (click)="submit()">Submit</button>
  <button class="btn btn-secondary" type="button" (click)="reset(f)">Reset</button>
</form>`;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]]
    });
  }

  submit() {}

  reset(f: FormGroupDirective) {
    f.resetForm({email: '', age: null});
  }
}
