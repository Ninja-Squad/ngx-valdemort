import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-consistency',
  templateUrl: './consistency.component.html',
  styleUrls: ['./consistency.component.scss']
})
export class ConsistencyComponent {

  form: FormGroup;
  appSnippet = require('!raw-loader!./consistency.app.snippet.html');
  snippet = require('!raw-loader!./consistency.snippet.html');

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
