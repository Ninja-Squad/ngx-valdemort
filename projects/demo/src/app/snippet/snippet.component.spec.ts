import { TestBed } from '@angular/core/testing';

import { SnippetComponent } from './snippet.component';
import { Component } from '@angular/core';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';
import { SnippetService } from './snippet.service';
import { of } from 'rxjs';

@Component({
  selector: 'demo-test',
  template: '<demo-snippet [code]="code" lang="html" />',
  standalone: true,
  imports: [SnippetComponent]
})
class TestComponent {
  code = 'test.snippet.html';
}

describe('SnippetComponent', () => {
  let tester: ComponentTester<TestComponent>;
  let snippetService: jasmine.SpyObj<SnippetService>;

  beforeEach(() => {
    snippetService = jasmine.createSpyObj<SnippetService>('SnippetService', ['load']);

    TestBed.configureTestingModule({
      providers: [{ provide: SnippetService, useValue: snippetService }]
    });

    snippetService.load.and.returnValue(of('<div>Hello</div>'));

    jasmine.addMatchers(speculoosMatchers);
  });

  beforeEach(() => {
    tester = new ComponentTester<TestComponent>(TestComponent);
    tester.detectChanges();
  });

  it('should display formatted code', () => {
    const code = tester.element('pre code')!;
    expect(code).toHaveClass('language-html');
    expect(code).toContainText('<div>Hello</div>');
    expect(code.nativeElement.innerHTML).toContain('<span class="token tag">');
  });
});
