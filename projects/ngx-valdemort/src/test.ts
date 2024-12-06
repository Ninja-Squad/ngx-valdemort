// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { provideAutomaticChangeDetection, speculoosMatchers } from 'ngx-speculoos';
import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';

beforeEach(() => jasmine.addMatchers(speculoosMatchers));

@NgModule({
  providers: [provideExperimentalZonelessChangeDetection(), provideAutomaticChangeDetection()]
})
class TestingModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserDynamicTestingModule, TestingModule], platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
