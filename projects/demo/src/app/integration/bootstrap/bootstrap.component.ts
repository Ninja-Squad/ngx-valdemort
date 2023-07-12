import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SnippetComponent } from '../../snippet/snippet.component';

@Component({
  selector: 'demo-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  standalone: true,
  imports: [SnippetComponent, RouterLink]
})
export class BootstrapComponent {
  cssSnippet = 'bootstrap.css.snippet.css';
  appSnippet = 'bootstrap.app.snippet.ts-like';
  formSnippet = 'bootstrap.snippet.html';
}
