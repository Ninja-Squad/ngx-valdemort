import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { HighlighterService, SupportedLanguages } from '../highlighter.service';
import { SnippetService } from './snippet.service';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetComponent {
  readonly divEl = viewChild.required<ElementRef<HTMLDivElement>>('code');

  readonly code = input.required<string>();
  readonly lang = input.required<SupportedLanguages>();

  constructor() {
    const snippetService = inject(SnippetService);
    const highlighterService = inject(HighlighterService);

    const highlightedSnippet: Signal<string | undefined> = toSignal(
      toObservable(computed(() => ({ code: this.code(), lang: this.lang() }))).pipe(
        switchMap(({ code, lang }) => snippetService.load(code).pipe(switchMap(snippet => highlighterService.highlight(snippet, lang))))
      )
    );

    afterRenderEffect(() => {
      this.divEl().nativeElement.innerHTML = highlightedSnippet() ?? '';
    });
  }
}
