import { AfterViewInit, Component, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { HighlighterService, SupportedLanguages } from '../highlighter.service';
import { SnippetService } from './snippet.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SnippetComponent implements AfterViewInit {
  divEl = viewChild.required<ElementRef<HTMLDivElement>>('code');

  code = input.required<string>();
  lang = input.required<SupportedLanguages>();

  constructor(
    private highlighterService: HighlighterService,
    private snippetService: SnippetService
  ) {}

  ngAfterViewInit(): void {
    this.snippetService
      .load(this.code())
      .pipe(switchMap(snippet => this.highlighterService.highlight(snippet, this.lang())))
      .subscribe(highlightedCode => (this.divEl().nativeElement.innerHTML = highlightedCode));
  }
}
