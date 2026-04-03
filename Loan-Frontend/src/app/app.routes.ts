import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout';
import { AuthComponent } from './features/auth/auth';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'customers', loadComponent: () => import('./features/customers/customers').then(m => m.CustomersComponent) },
      { path: 'loan-applications', loadComponent: () => import('./features/loan-applications/loan-applications').then(m => m.LoanApplicationsComponent) },
      { path: 'products', loadComponent: () => import('./features/products/products').then(m => m.ProductsComponent) },
      { path: 'underwriting', loadComponent: () => import('./features/underwriting/underwriting').then(m => m.UnderwritingComponent) },
      { path: 'disbursement', loadComponent: () => import('./features/disbursement/disbursement').then(m => m.DisbursementComponent) },
      { path: 'servicing', loadComponent: () => import('./features/servicing/servicing').then(m => m.ServicingComponent) },
      { path: 'collections', loadComponent: () => import('./features/collections/collections').then(m => m.CollectionsComponent) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
