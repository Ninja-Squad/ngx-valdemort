import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ValidationDefaultsComponent } from './validation-defaults/validation-defaults.component';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ValidationDefaultsComponent, RouterLink, NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly navbarCollapsed = signal(true);

  toggleNavbar(): void {
    this.navbarCollapsed.update(collapsed => !collapsed);
  }
}
