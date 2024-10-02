import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { PrismService } from '../prism.service';
import { SnippetService } from './snippet.service';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
  standalone: true
})
export class SnippetComponent implements AfterViewInit {
  codeEl = viewChild.required<ElementRef<HTMLElement>>('code');

  code = input<string>('');
  lang = input<string>('');

  constructor(
    private prismService: PrismService,
    private snippetService: SnippetService
  ) {}

  ngAfterViewInit(): void {
    this.snippetService
      .load(this.code())
      .subscribe(snippet => (this.codeEl().nativeElement.innerHTML = this.prismService.highlight(snippet, this.lang())));
  }
}
