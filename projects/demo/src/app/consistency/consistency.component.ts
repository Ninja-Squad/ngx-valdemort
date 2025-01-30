import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { SnippetComponent } from '../snippet/snippet.component';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'demo-consistency',
  templateUrl: './consistency.component.html',
  styleUrls: ['./consistency.component.scss'],
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
export class ConsistencyComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });
  readonly appSnippet = 'consistency.app.snippet.html';
  readonly snippet = 'consistency.snippet.html';

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
