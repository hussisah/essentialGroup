import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [
     { path: '', component: LandingComponent },
  {
    path: 'essential-motors',
    loadChildren: () => import('../../src/app/businesses/essential-motors-ng/essential-motors-ng.routes').then(m => m.routes)
  },
  {
    path: 'tech-essential',
    loadChildren: () => import('../../src/app/businesses/essential-properties/essential-properties.routes').then(m => m.routes)
  },
  {
    path: 'essential-properties',
    loadChildren: () => import('../../src/app/businesses/tech-essential/tech-essential.routes').then(m => m.routes)
  },
  {
  path: 'success',
  loadComponent: () => import('./pages/success-page/success-page.component').then(m => m.SuccessPageComponent)
  },
  {
  path: 'admin',
  loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  { path: 'admin-login', 
    component: AdminLoginComponent 
  },
  
  { path: 'admin-dashboard', 
    component: AdminDashboardComponent 
  }


];
