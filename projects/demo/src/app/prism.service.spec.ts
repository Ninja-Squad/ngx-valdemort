import { TestBed, inject } from '@angular/core/testing';

import { PrismService } from './prism.service';

describe('PrismService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrismService]
    });
  });

  it('should be created', inject([PrismService], (service: PrismService) => {
    expect(service).toBeTruthy();
  }));
});
