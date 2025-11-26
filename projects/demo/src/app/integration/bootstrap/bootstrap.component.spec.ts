import { TestBed } from '@angular/core/testing';

import { BootstrapComponent } from './bootstrap.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentTester } from 'ngx-speculoos';

describe('BootstrapComponent', () => {
  let tester: ComponentTester<BootstrapComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideRouter([])]
    });

    tester = ComponentTester.create(BootstrapComponent);
    await tester.change();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });
});
