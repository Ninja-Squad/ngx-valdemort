import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PrismService } from '../prism.service';
import { SnippetService } from './snippet.service';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements AfterViewInit {
  @ViewChild('code') codeEl!: ElementRef<HTMLElement>;

  @Input() code = '';
  @Input() lang = '';

  constructor(private prismService: PrismService, private snippetService: SnippetService) {}

  ngAfterViewInit(): void {
    this.snippetService
      .load(this.code)
      .subscribe(snippet => (this.codeEl.nativeElement.innerHTML = this.prismService.highlight(snippet, this.lang)));
  }
}
