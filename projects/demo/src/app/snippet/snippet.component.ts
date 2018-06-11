import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PrismService } from '../prism.service';

@Component({
  selector: 'demo-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements AfterViewInit {

  @ViewChild('code') codeEl: ElementRef<HTMLElement>;

  @Input() code = '';
  @Input() lang = '';

  constructor(private prismService: PrismService) { }

  ngAfterViewInit() {
    this.codeEl.nativeElement.innerHTML = this.prismService.highlight(this.code, this.lang);
  }
}
