import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { DisplayMode, ValdemortConfig, ValdemortModule } from 'ngx-valdemort';
import { SnippetComponent } from '../../snippet/snippet.component';

@Component({
  selector: 'demo-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [ValdemortConfig],
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavContent,
    SnippetComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ValdemortModule,
    MatButtonModule,
    NgbNavOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });

  readonly snippet = 'material.snippet.html';
  readonly appSnippet = 'material.app.snippet.ts-like';
  readonly cssSnippet = 'material.css.snippet.css-like';

  constructor() {
    const config = inject(ValdemortConfig);
    config.displayMode = DisplayMode.ONE;
    config.shouldDisplayErrors = () => true;
  }

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
