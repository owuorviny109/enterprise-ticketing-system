import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/home/home.component';
import { TicketFormComponent } from './features/public/ticket-form/ticket-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'submit-ticket', component: TicketFormComponent }
];
