import { Component } from '@angular/core';

@Component({
  selector: 'demo-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent {
  cssSnippet = 'bootstrap.css.snippet.css';
  appSnippet = 'bootstrap.app.snippet.ts-like';
  formSnippet = 'bootstrap.snippet.html';
}
