import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notes-container">
      <div class="header">
        <h1>Notes Management</h1>
        <nav class="breadcrumb">
          <span class="breadcrumb-item">🏠</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">Notes</span>
        </nav>
      </div>

      <div class="content">
        <div class="actions">
          <button class="create-btn" routerLink="/notes/create">
            <span class="icon">+</span>
            Create New Note
          </button>
        </div>

        <div class="notes-list">
          <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>Create your first note to get started with note management.</p>
            <button class="create-btn-secondary" routerLink="/notes/create">
              Create Note
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notes-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: #6c757d;
    }

    .breadcrumb-item {
      color: #6c757d;
    }

    .breadcrumb-item.active {
      color: #333;
    }

    .breadcrumb-separator {
      margin: 0 0.5rem;
      color: #dee2e6;
    }

    .content {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .actions {
      margin-bottom: 2rem;
    }

    .create-btn {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }

    .create-btn:hover {
      background-color: #218838;
    }

    .icon {
      font-size: 1rem;
      font-weight: bold;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #666;
      margin-bottom: 2rem;
    }

    .create-btn-secondary {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .create-btn-secondary:hover {
      background-color: #0056b3;
    }
  `]
})
export class NotesComponent {}