import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bootstrap',
    loadComponent: () => import('./integration/bootstrap/bootstrap.component').then(m => m.BootstrapComponent)
  },
  {
    path: 'material',
    loadComponent: () => import('./integration/material/material.component').then(m => m.MaterialComponent)
  }
];
