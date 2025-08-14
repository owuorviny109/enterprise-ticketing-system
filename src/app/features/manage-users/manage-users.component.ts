import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="manage-users-container">
      <div class="header">
        <h1>Manage Users</h1>
        <button class="create-user-btn" routerLink="/manage-users/create">
          <i class="icon-plus"></i>
          Create New User
        </button>
      </div>
      
      <div class="users-list">
        <p>User list will be implemented here.</p>
        <p>For now, you can <a routerLink="/manage-users/create">create a new user</a>.</p>
      </div>
    </div>
  `,
  styles: [`
    .manage-users-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .create-user-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: #5856eb;
          }

          .icon-plus {
            width: 16px;
            height: 16px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>') no-repeat center;
          }
        }
      }

      .users-list {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        a {
          color: #6366f1;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `]
})
export class ManageUsersComponent {}