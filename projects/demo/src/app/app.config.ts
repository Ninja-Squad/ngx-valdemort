import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideExperimentalZonelessChangeDetection()
  ]
};
