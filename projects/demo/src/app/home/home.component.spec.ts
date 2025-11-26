import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentTester } from 'ngx-speculoos';

describe('HomeComponent', () => {
  let tester: ComponentTester<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    tester = ComponentTester.create(HomeComponent);
    await tester.change();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });
});
