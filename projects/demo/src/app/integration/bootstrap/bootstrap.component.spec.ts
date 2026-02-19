import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapComponent } from './bootstrap.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, test } from 'vitest';

describe('BootstrapComponent', () => {
  let fixture: ComponentFixture<BootstrapComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideRouter([])]
    });

    fixture = TestBed.createComponent(BootstrapComponent);
    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
