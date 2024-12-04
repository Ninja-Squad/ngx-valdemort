import { Component, ElementRef, input, viewChild, ViewEncapsulation, inject } from '@angular/core';
import { HighlighterService, SupportedLanguages } from '../highlighter.service';
import { SnippetService } from './snippet.service';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SnippetComponent {
  divEl = viewChild.required<ElementRef<HTMLDivElement>>('code');

  code = input.required<string>();
  lang = input.required<SupportedLanguages>();

  constructor() {
    const snippetService = inject(SnippetService);
    const highlighterService = inject(HighlighterService);
    snippetService
      .load(this.code())
      .pipe(switchMap(snippet => highlighterService.highlight(snippet, this.lang())), takeUntilDestroyed())
      .subscribe(highlightedCode => (this.divEl().nativeElement.innerHTML = highlightedCode));
  }
}
