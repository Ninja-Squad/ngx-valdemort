import { Component } from '@angular/core';
import { NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ValidationDefaultsComponent } from './validation-defaults/validation-defaults.component';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ValidationDefaultsComponent, RouterLink, NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterOutlet]
})
export class AppComponent {
  navbarCollapsed = true;
}
