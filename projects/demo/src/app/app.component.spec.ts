import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ComponentTester } from 'ngx-speculoos';

describe('AppComponent', () => {
  let tester: ComponentTester<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    tester = ComponentTester.create(AppComponent);
    await tester.change();
  });

  it('should create', () => {
    expect(tester.componentInstance).toBeTruthy();
  });
});
