import { TestBed } from '@angular/core/testing';

import { PrismService } from './prism.service';

describe('PrismService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should highlight html', () => {
    const prismService: PrismService = TestBed.get(PrismService);
    expect(prismService).toBeTruthy();
    const result = prismService.highlight('<html></html>', 'html');
    expect(result).toContain('<span class="token tag">');
    expect(result).toContain('&lt;');
  });

  it('should highlight typescript', () => {
    const prismService: PrismService = TestBed.get(PrismService);
    expect(prismService).toBeTruthy();
    const result = prismService.highlight(`const foo = 'hello'`, 'typescript');
    expect(result).toContain('<span class="token keyword">const</span>');
  });
});
