import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ValdemortModule } from 'ngx-valdemort';
import { SnippetComponent } from '../snippet/snippet.component';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { email, FormField, form, FormRoot, required } from '@angular/forms/signals';

@Component({
  selector: 'demo-signal-form',
  templateUrl: './signal-form.component.html',
  styleUrls: ['./signal-form.component.scss'],
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavContent,
    SnippetComponent,
    ValdemortModule,
    NgbNavOutlet,
    FormField,
    FormRoot
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormComponent {
  private readonly formValue = signal({
    name: '',
    email: ''
  });
  readonly form = form(
    this.formValue,
    form => {
      required(form.name);
      required(form.email);
      email(form.email);
    },
    {
      submission: {
        action: async () => null
      }
    }
  );
  readonly snippet = 'signal-form.snippet.html';

  reset(): void {
    this.form().reset({ name: '', email: '' });
  }
}
