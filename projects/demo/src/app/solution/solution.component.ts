import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent {

  form: FormGroup;
  snippet = `<form [formGroup]="form" #f="ngForm">
  <div class="form-group">
    <label>Email</label>
    <input formControlName="email" class="form-control" type="email"/>
    <val-errors controlName="email">
      <ng-template valError="required">The email is required</ng-template>
      <ng-template valError="email">The email must be a valid email address</ng-template>
    </val-errors>
  </div>

  <div class="form-group">
    <label>Age</label>
    <input formControlName="age" class="form-control" type="number"/>
    <val-errors controlName="age">
      <ng-template valError="required">The age is required</ng-template>
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
