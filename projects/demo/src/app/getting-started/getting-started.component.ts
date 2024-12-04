import { Component } from '@angular/core';
import { SnippetComponent } from '../snippet/snippet.component';

@Component({
  selector: 'demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  imports: [SnippetComponent]
})
export class GettingStartedComponent {
  snippet = 'getting-started.snippet.ts-like';
}
