import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <p>Main dashboard with analytics will be implemented here.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }
  `]
})
export class DashboardComponent {}