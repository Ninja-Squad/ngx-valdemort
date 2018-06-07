import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent {
  snippet = `[...]
import { ValdemortModule } from 'ngx-valdemort';

@NgModule({
  [...]
  imports: [
    [...]
    ValdemortModule
  ],
  [...]
})
export class AppModule { }
  `;
}
