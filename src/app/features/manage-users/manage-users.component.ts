import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  template: `
    <div class="manage-users-container">
      <h2>Manage Users</h2>
      <p>User management will be implemented here.</p>
    </div>
  `,
  styles: [`
    .manage-users-container {
      padding: 2rem;
    }
  `]
})
export class ManageUsersComponent {}