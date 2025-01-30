import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DisplayMode, ValdemortConfig, ValdemortModule } from 'ngx-valdemort';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });
  readonly snippet = 'configuration.snippet.ts-like';

  constructor() {
    const config = inject(ValdemortConfig);
    config.errorsClasses = 'text-warning';
    config.displayMode = DisplayMode.ONE;
    config.shouldDisplayErrors = control => control.dirty;
  }

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
