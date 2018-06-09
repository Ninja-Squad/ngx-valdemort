import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DisplayMode, ValdemortConfig } from '../../../../../ngx-valdemort/src/lib/valdemort-config.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [ValdemortConfig]
})
export class MaterialComponent {

  form: FormGroup;

  snippet = `<mat-form-field>
  <input matInput placeholder="Email" formControlName="email" type="email">
  <mat-error><val-errors controlName="email" label="The email"></val-errors></mat-error>
</mat-form-field>`;

  appSnippet = `import { ValdemortConfig, DisplayMode } from 'ngx-valdemort';

[...]

export class AppComponent {
  constructor(valdemortConfig: ValdemortConfig) {
    valdemortConfig.displayMode = DisplayMode.ONE;
    valdemortConfig.shouldDisplayErrors = () => true;
  }
}`;

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
