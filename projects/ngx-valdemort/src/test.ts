// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import { speculoosMatchers } from 'ngx-speculoos';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

beforeEach(() => jasmine.addMatchers(speculoosMatchers));

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
