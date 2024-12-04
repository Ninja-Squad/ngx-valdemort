import { Component, inject } from '@angular/core';
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
  ]
})
export class SolutionComponent {
  form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });
  introSnippet = 'solution.intro.snippet.html';
  snippet = 'solution.snippet.html';

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
