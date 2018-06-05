import { Component } from '@angular/core';
import { DisplayMode, ValdemortConfig } from 'ngx-valdemort';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'demo-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [ValdemortConfig]
})
export class ConfigurationComponent {

  form: FormGroup;
  snippet = `constructor(config: ValdemortConfig) {
  config.errorsClasses = 'text-warning';
  config.displayMode = DisplayMode.ONE;
  config.shouldDisplayErrors = (control, form) => control.dirty;
}`;

  constructor(config: ValdemortConfig, fb: FormBuilder) {
    config.errorsClasses = 'text-warning';
    config.displayMode = DisplayMode.ONE;
    config.shouldDisplayErrors = (control, form) => control.dirty;

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
