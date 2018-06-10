import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DisplayMode, ValdemortConfig } from '../../../../../ngx-valdemort/src/lib/valdemort-config.service';

@Component({
  selector: 'demo-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [ValdemortConfig]
})
export class MaterialComponent {

  form: FormGroup;

  snippet = require('!raw-loader!./material.snippet.html');
  appSnippet = require('!raw-loader!./material.app.snippet.ts-like');

  constructor(config: ValdemortConfig, fb: FormBuilder) {
    config.displayMode = DisplayMode.ONE;
    config.shouldDisplayErrors = () => true;

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
