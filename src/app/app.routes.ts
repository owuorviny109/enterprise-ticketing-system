import { Routes } from '@angular/router';
    
export const routes: Routes = [
  // Public routes
  { 
    path: '', 
    pathMatch: 'full',
    loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'submit-ticket', 
    pathMatch: 'full',
    loadComponent: () => import('./features/public/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
  },

  // Admin routes with dashboard layout
  {
    path: 'dashboard',
    loadComponent: () => import('./components/layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/admin.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'tickets',
    loadComponent: () => import('./components/layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/admin.component').then(m => m.TicketsComponent)
      }
    ]
  },
  {
    path: 'settings/user-roles',
    loadComponent: () => import('./components/layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/forms.component').then(m => m.UserRolesComponent)
      }
    ]
  },
  {
    path: 'manage-users/create',
    loadComponent: () => import('./components/layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/forms.component').then(m => m.CreateUserComponent)
      }
    ]
  },
  {
    path: 'organizations/create',
    loadComponent: () => import('./components/layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/forms.component').then(m => m.CreateOrganizationComponent)
      }
    ]
  }
];
