import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';

import { SnippetComponent } from './snippet.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnippetService } from './snippet.service';
import { of } from 'rxjs';
import { createMock, MockObject } from '../../test/mock';
import { beforeEach, describe, expect, test } from 'vitest';

@Component({
  selector: 'demo-test',
  template: '<demo-snippet [code]="code" lang="angular-html" />',
  imports: [SnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  readonly code = 'test.snippet.html';
}

class SnippetComponentTester {
  readonly fixture = TestBed.createComponent(TestComponent);
  readonly root = page.elementLocator(this.fixture.nativeElement);
  readonly code = this.root.getByCss('pre code');
}

describe('SnippetComponent', () => {
  let tester: SnippetComponentTester;
  let snippetService: MockObject<SnippetService>;

  beforeEach(async () => {
    snippetService = createMock(SnippetService);

    TestBed.configureTestingModule({
      providers: [{ provide: SnippetService, useValue: snippetService }]
    });

    snippetService.load.mockReturnValue(of('<div>Hello</div>'));

    tester = new SnippetComponentTester();
    await tester.fixture.whenStable();
  });

  test('should display formatted code', async () => {
    await expect.poll(() => tester.code.length).toBe(1);
    expect(tester.code.element().innerHTML).toContain('<span class="line"><');
    await expect.element(tester.code).toHaveTextContent('<div>Hello</div>');
  });
});
