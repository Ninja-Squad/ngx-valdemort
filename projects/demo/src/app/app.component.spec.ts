import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, test } from 'vitest';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
