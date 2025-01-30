import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { SnippetComponent } from '../snippet/snippet.component';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'demo-ng-model',
  templateUrl: './ng-model.component.html',
  styleUrls: ['./ng-model.component.scss'],
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavContent,
    SnippetComponent,
    ReactiveFormsModule,
    FormsModule,
    ValdemortModule,
    NgbNavOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgModelComponent {
  readonly ngModelSnippet = 'ng-model.snippet.html';
  readonly user = {
    email: ''
  };

  submit(): void {}

  reset(f: NgForm): void {
    f.resetForm({ email: '' });
  }
}
