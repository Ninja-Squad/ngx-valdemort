import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ROUTES } from './app/app.routes';
import { provideRouter, withHashLocation } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES, withHashLocation()), provideAnimations(), provideHttpClient()]
}).catch(err => console.error(err));
