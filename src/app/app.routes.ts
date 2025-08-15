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
      {
        path: 'submit-ticket',
        loadComponent: () => import('./features/public/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
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

  // Protected routes with dashboard layout (Gerson's approach)
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) }
    ]
  },

  // Ticket management routes with dashboard layout
  {
    path: 'tickets',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/tickets/tickets.component').then(m => m.TicketsComponent)
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

  // Settings routes with dashboard layout
  {
    path: 'settings',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'user-roles',
        loadComponent: () => import('./features/settings/user-roles/user-roles.component').then(m => m.UserRolesComponent)
      }
    ]
  },

  // User management routes with dashboard layout
  {
    path: 'manage-users',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/manage-users/manage-users.component').then(m => m.ManageUsersComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/manage-users/create-user/create-user.component').then(m => m.CreateUserComponent)
      }
    ]
  },

  // Customer management routes with dashboard layout
  {
    path: 'customers',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/customers/customer-list.component').then(m => m.CustomerListComponent)
      }
    ]
  },

  // Organization management routes with dashboard layout
  {
    path: 'organizations',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/organizations/organizations.component').then(m => m.OrganizationsComponent)
      }
    ]
  },

  // Notes routes with dashboard layout
  {
    path: 'notes',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/notes/notes.component').then(m => m.NotesComponent)
      }
    ]
  },

  // Contacts routes with dashboard layout
  {
    path: 'contacts',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent)
      }
    ]
  },

  // 404 Not Found
  {
    path: '404',
    loadComponent: () => import('./features/public/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

  // Wildcard route - must be last
  { path: '**', redirectTo: '404' }
];
