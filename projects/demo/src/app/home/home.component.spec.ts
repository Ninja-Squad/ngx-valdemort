import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, test } from 'vitest';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
