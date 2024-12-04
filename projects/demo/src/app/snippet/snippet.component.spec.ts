import { TestBed } from '@angular/core/testing';

import { SnippetComponent } from './snippet.component';
import { Component } from '@angular/core';
import { ComponentTester } from 'ngx-speculoos';
import { SnippetService } from './snippet.service';
import { of } from 'rxjs';

@Component({
  selector: 'demo-test',
  template: '<demo-snippet [code]="code" lang="angular-html" />',
  imports: [SnippetComponent]
})
class TestComponent {
  code = 'test.snippet.html';
}

describe('SnippetComponent', () => {
  let tester: ComponentTester<TestComponent>;
  let snippetService: jasmine.SpyObj<SnippetService>;

  beforeEach(done => {
    snippetService = jasmine.createSpyObj<SnippetService>('SnippetService', ['load']);

    TestBed.configureTestingModule({
      providers: [{ provide: SnippetService, useValue: snippetService }]
    });

    snippetService.load.and.returnValue(of('<div>Hello</div>'));

    tester = new ComponentTester<TestComponent>(TestComponent);
    tester.detectChanges();
    // wait for the code to be loaded
    setTimeout(done, 100);
  });

  it('should display formatted code', () => {
    const code = tester.element('pre code')!;
    expect(code.nativeElement.innerHTML).toContain('<span class="line"><');
    expect(code).toContainText('<div>Hello</div>');
  });
});
