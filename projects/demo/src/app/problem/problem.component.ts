import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {

  form: FormGroup;

  introSnippet = require('!raw-loader!./problem.intro.snippet.html').default;
  snippet = require('!raw-loader!./problem.snippet.html').default;

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
