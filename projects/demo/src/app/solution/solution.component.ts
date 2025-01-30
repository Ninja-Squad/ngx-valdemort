import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { SnippetComponent } from '../snippet/snippet.component';

@Component({
  selector: 'demo-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  imports: [
    SnippetComponent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavContent,
    ReactiveFormsModule,
    ValdemortModule,
    NgbNavOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });
  readonly introSnippet = 'solution.intro.snippet.html';
  readonly snippet = 'solution.snippet.html';

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
