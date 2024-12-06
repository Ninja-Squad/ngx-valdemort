import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentTester } from 'ngx-speculoos';

describe('HomeComponent', () => {
  let tester: ComponentTester<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    tester = ComponentTester.create(HomeComponent);
    await tester.change();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });
});
