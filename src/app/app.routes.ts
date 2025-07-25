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
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'tickets',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/tickets/tickets.component').then(m => m.TicketsComponent)
      }
    ]
  },
  {
    path: 'settings/user-roles',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/settings/user-roles/user-roles.component').then(m => m.UserRolesComponent)
      }
    ]
  }
];
