import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BootstrapComponent } from './integration/bootstrap/bootstrap.component';
import { MaterialComponent } from './integration/material/material.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bootstrap',
    component: BootstrapComponent
  }
  ,
  {
    path: 'material',
    component: MaterialComponent
  }
];
