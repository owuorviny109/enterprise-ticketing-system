import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService, User } from './services/user.service';

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
      
      <!-- Loading State -->
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading users...</p>
        </div>
      }

      <!-- Users Table -->
      @if (!loading() && users().length > 0) {
        <div class="users-table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr>
                  <td>
                    <div class="user-info">
                      <div class="user-avatar">
                        {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
                      </div>
                      <div>
                        <div class="user-name">{{ user.first_name }} {{ user.last_name }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="role-badge" [class]="'role-' + user.role">
                      {{ user.role | titlecase }}
                    </span>
                  </td>
                  <td>{{ user.phone || '-' }}</td>
                  <td>{{ getUserLocation(user) }}</td>
                  <td>{{ user.created_at | date:'short' }}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-action edit" title="Edit User">
                        <i class="icon-edit"></i>
                      </button>
                      <button class="btn-action delete" title="Delete User" (click)="confirmDelete(user)">
                        <i class="icon-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Empty State -->
      @if (!loading() && users().length === 0) {
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>No users found</h3>
          <p>Get started by creating your first user</p>
          <button class="btn-primary" routerLink="/manage-users/create">
            Create First User
          </button>
        </div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>Error Loading Users</h3>
          <p>{{ error() }}</p>
          <button class="btn-secondary" (click)="loadUsers()">
            Try Again
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .manage-users-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
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
    }

    .create-user-btn:hover {
      background-color: #5856eb;
    }

    .icon-plus {
      width: 16px;
      height: 16px;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>') no-repeat center;
    }

    .loading-state, .empty-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .empty-icon, .error-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .users-table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
    }

    .users-table th {
      background-color: #f8f9fa;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 1px solid #dee2e6;
    }

    .users-table td {
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .users-table tr:hover {
      background-color: #f8f9fa;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #6366f1;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-name {
      font-weight: 500;
      color: #333;
    }

    .role-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .role-admin {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .role-staff {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .role-user {
      background-color: #f3f4f6;
      color: #374151;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-action {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    .btn-action.edit {
      background-color: #f3f4f6;
      color: #6b7280;
    }

    .btn-action.edit:hover {
      background-color: #e5e7eb;
    }

    .btn-action.delete {
      background-color: #fef2f2;
      color: #dc2626;
    }

    .btn-action.delete:hover {
      background-color: #fee2e2;
    }

    .icon-edit, .icon-delete {
      width: 16px;
      height: 16px;
    }

    .icon-edit {
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>') no-repeat center;
    }

    .icon-delete {
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>') no-repeat center;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background-color: #6366f1;
      color: white;
    }

    .btn-primary:hover {
      background-color: #5856eb;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .users-table-container {
        overflow-x: auto;
      }

      .users-table {
        min-width: 800px;
      }
    }
  `]
})
export class ManageUsersComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error.set('Failed to load users. Please try again.');
        this.loading.set(false);
      }
    });
  }

  getUserLocation(user: User): string {
    const parts = [user.city, user.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '-';
  }

  confirmDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      this.deleteUser(user.id);
    }
  }

  private deleteUser(userId: number) {
    // TODO: Implement delete user functionality
    console.log('Delete user:', userId);
  }
}