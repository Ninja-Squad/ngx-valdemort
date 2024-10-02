import { TestBed } from '@angular/core/testing';

import { HighlighterService } from './highlighter.service';

describe('HighlighterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should highlight html', async () => {
    const highlighterService = TestBed.inject(HighlighterService);
    expect(highlighterService).toBeTruthy();
    const result = await highlighterService.highlight('<html><body>Hello</body></html>', 'angular-html');
    expect(result).toMatch('>Hello</span>');
  });

  it('should highlight typescript', async () => {
    const highlighterService = TestBed.inject(HighlighterService);
    expect(highlighterService).toBeTruthy();
    const result = await highlighterService.highlight(`const foo = 'hello'`, 'angular-ts');
    expect(result).toContain('>const</span>');
    expect(result).toContain('hello');
  });
});
