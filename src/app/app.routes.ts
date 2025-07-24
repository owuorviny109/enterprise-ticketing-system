import { Routes } from '@angular/router';

export const routes: Routes = [
  // Public routes (no authentication required) - using public layout
  {
    path: '',
    loadComponent: () => import('./layout/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/public/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'faqs',
        loadComponent: () => import('./features/public/faqs/faqs.component').then(m => m.FaqsComponent)
      },
    ]
  },

  // Authentication routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Protected routes (authentication required)
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // Ticket management routes
  {
    path: 'tickets',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/tickets/pages/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/tickets/pages/create-ticket/create-ticket.component').then(m => m.CreateTicketComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/tickets/pages/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
      }
    ]
  },

  // User management routes
  {
    path: 'users',
    loadComponent: () => import('./features/manage-users/manage-users.component').then(m => m.ManageUsersComponent),
    // canActivate: [authGuard, adminGuard] // Uncomment when guards are implemented
  },

  // Customer management routes
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customer-list.component').then(m => m.CustomerListComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // Organization management routes
  {
    path: 'organizations',
    loadComponent: () => import('./features/organizations/organizations.component').then(m => m.OrganizationsComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // Notes routes
  {
    path: 'notes',
    loadComponent: () => import('./features/notes/notes.component').then(m => m.NotesComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // Contacts routes
  {
    path: 'contacts',
    loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // Settings routes
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
    // canActivate: [authGuard] // Uncomment when auth guard is implemented
  },

  // 404 Not Found
  {
    path: '404',
    loadComponent: () => import('./features/public/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

  // Wildcard route - must be last
  { path: '**', redirectTo: '404' }
];
