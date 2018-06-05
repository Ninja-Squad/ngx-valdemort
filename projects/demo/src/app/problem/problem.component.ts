import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {

  form: FormGroup;
  snippet = `<form [formGroup]="form" #f="ngForm">
  <div class="form-group">
    <label>Email</label>
    <input formControlName="email" class="form-control" type="email"/>
    <div class="invalid-feedback" *ngIf="form.get('email').invalid && (f.submitted || form.get('email').touched)">
      <div *ngIf="form.get('email').hasError('required')">
        The email is required
      </div>
      <div *ngIf="form.get('email').hasError('email')">
        The email must be a valid email address
      </div>
    </div>
  </div>

  <div class="form-group">
    <label>Age</label>
    <input formControlName="email" class="form-control" type="number"/>
    <div class="invalid-feedback" *ngIf="form.get('age').invalid && (f.submitted || form.get('age').touched)">
      <div *ngIf="form.get('age').hasError('required')">
        The age is required
      </div>
      <div *ngIf="form.get('email').hasError('email')">
        You must be at least {{ form.get('email').errors['min'].min }} years old
      </div>
    </div>
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
