import { Component } from '@angular/core';
import { ValdemortConfig } from 'ngx-valdemort';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navbarCollapsed = true;

  constructor(config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
  }
}
