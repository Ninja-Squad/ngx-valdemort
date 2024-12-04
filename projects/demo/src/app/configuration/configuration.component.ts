import { Component } from '@angular/core';
import { DisplayMode, ValdemortConfig, ValdemortModule } from 'ngx-valdemort';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, ReactiveFormsModule } from '@angular/forms';
import { SnippetComponent } from '../snippet/snippet.component';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'demo-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [ValdemortConfig],
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavContent,
    SnippetComponent,
    ReactiveFormsModule,
    ValdemortModule,
    NgbNavOutlet
  ]
})
export class ConfigurationComponent {
  form: FormGroup;
  snippet = 'configuration.snippet.ts-like';

  constructor(config: ValdemortConfig, fb: FormBuilder) {
    config.errorsClasses = 'text-warning';
    config.displayMode = DisplayMode.ONE;
    config.shouldDisplayErrors = control => control.dirty;

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]]
    });
  }

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
