import { TestBed, inject } from '@angular/core/testing';

import { NgxValmesService } from './ngx-valmes.service';

describe('NgxValmesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxValmesService]
    });
  });

  it('should be created', inject([NgxValmesService], (service: NgxValmesService) => {
    expect(service).toBeTruthy();
  }));
});
