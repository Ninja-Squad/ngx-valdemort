import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ValdemortModule } from 'ngx-valdemort';
import { SnippetComponent } from '../snippet/snippet.component';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { email, Field, form, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'demo-signal-form',
  templateUrl: './signal-form.component.html',
  styleUrls: ['./signal-form.component.scss'],
  imports: [NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, SnippetComponent, ValdemortModule, NgbNavOutlet, Field],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormComponent {
  private readonly formValue = signal({
    name: '',
    email: ''
  });
  readonly form = form(this.formValue, form => {
    required(form.name);
    required(form.email);
    email(form.email);
  });
  readonly snippet = 'signal-form.snippet.html';

  async save(event: Event) {
    event.preventDefault();
    await submit(this.form, async () => {});
  }

  reset(): void {
    this.form().reset();
    this.form().setControlValue({ name: '', email: '' });
  }
}
