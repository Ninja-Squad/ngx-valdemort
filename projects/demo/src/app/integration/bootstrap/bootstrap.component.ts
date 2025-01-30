import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SnippetComponent } from '../../snippet/snippet.component';

@Component({
  selector: 'demo-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  imports: [SnippetComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BootstrapComponent {
  readonly cssSnippet = 'bootstrap.css.snippet.css-like';
  readonly appSnippet = 'bootstrap.app.snippet.ts-like';
  readonly formSnippet = 'bootstrap.snippet.html';
}
