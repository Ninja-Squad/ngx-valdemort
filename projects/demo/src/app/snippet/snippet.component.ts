import { Component, ElementRef, input, viewChild, ViewEncapsulation, inject, effect, untracked, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { HighlighterService, SupportedLanguages } from '../highlighter.service';
import { SnippetService } from './snippet.service';

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
    const destroyRef = inject(DestroyRef);
    effect(() => {
      const code = this.code();
      const lang = this.lang();
      untracked(() => {
        snippetService
          .load(code)
          .pipe(
            switchMap(snippet => highlighterService.highlight(snippet, lang)),
            takeUntilDestroyed(destroyRef)
          )
          .subscribe(highlightedCode => (this.divEl().nativeElement.innerHTML = highlightedCode));
      });
    });
  }
}
