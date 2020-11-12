import { Component } from '@angular/core';

@Component({
  selector: 'demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent {
  snippet = require('!raw-loader!./getting-started.snippet.ts-like').default;
}
