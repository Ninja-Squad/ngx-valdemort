import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormGroupDirective, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { SnippetComponent } from '../snippet/snippet.component';

@Component({
  selector: 'demo-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
  imports: [SnippetComponent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, ReactiveFormsModule, NgbNavOutlet]
})
export class ProblemComponent {
  form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(18)]]
  });

  introSnippet = 'problem.intro.snippet.html';
  snippet = 'problem.snippet.html';

  submit(): void {}

  reset(f: FormGroupDirective): void {
    f.resetForm({ email: '', age: null });
  }
}
