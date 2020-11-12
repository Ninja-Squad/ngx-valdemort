import { TestBed } from '@angular/core/testing';

import { SnippetComponent } from './snippet.component';
import { Component } from '@angular/core';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';

@Component({
  selector: 'demo-test',
  template: '<demo-snippet [code]="code" lang="html"></demo-snippet>'
})
class TestComponent {
  code = require('!raw-loader!./test.snippet.html').default;
}

describe('SnippetComponent', () => {
  let tester: ComponentTester<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, SnippetComponent ]
    });

    jasmine.addMatchers(speculoosMatchers);
  });

  beforeEach(() => {
    tester = new ComponentTester<TestComponent>(TestComponent);
    tester.detectChanges();
  });

  it('should display formatted code', () => {
    const code = tester.element('pre code');
    expect(code).toHaveClass('language-html');
    expect(code).toContainText('<div>Hello</div>');
    expect(code.nativeElement.innerHTML).toContain('<span class="token tag">');
  });
});
