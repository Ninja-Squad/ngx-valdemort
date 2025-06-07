// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import { speculoosMatchers } from 'ngx-speculoos';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

beforeEach(() => jasmine.addMatchers(speculoosMatchers));

@NgModule({
  providers: [provideZonelessChangeDetection()]
})
class TestingModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserTestingModule, TestingModule], platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
