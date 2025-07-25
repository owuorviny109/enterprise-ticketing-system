import { Routes } from '@angular/router';
    
export const routes: Routes = [
  { path: '', pathMatch: 'full',
    loadComponent: () => { return import('./features/public/home/home.component').then(m => m.HomeComponent)
    }
  },

  { path: 'submit-ticket', pathMatch: 'full',
    loadComponent: () => { return import('./features/public/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
    }
  }
];
