import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { SnippetComponent } from '../snippet/snippet.component';

@Component({
  selector: 'demo-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  standalone: true,
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
  form: FormGroup;
  introSnippet = 'solution.intro.snippet.html';
  snippet = 'solution.snippet.html';

  constructor(fb: FormBuilder) {
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
