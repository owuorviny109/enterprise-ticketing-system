import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="create-ticket-container">
      <div class="header">
        <h2>Create New Ticket</h2>
        <button type="button" class="btn-secondary" (click)="goBack()">
          ← Back to List
        </button>
      </div>
      
      <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()" class="ticket-form">
        <div class="form-group">
          <label for="subject">Subject *</label>
          <input 
            id="subject" 
            type="text" 
            formControlName="subject"
            class="form-control"
            placeholder="Enter ticket subject"
          >
          @if (ticketForm.get('subject')?.invalid && ticketForm.get('subject')?.touched) {
            <div class="error-message">Subject is required</div>
          }
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea 
            id="description" 
            formControlName="description"
            class="form-control"
            rows="5"
            placeholder="Describe your issue in detail"
          ></textarea>
          @if (ticketForm.get('description')?.invalid && ticketForm.get('description')?.touched) {
            <div class="error-message">Description is required</div>
          }
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" formControlName="priority" class="form-control">
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" formControlName="department" class="form-control">
              <option value="technical">Technical Support</option>
              <option value="billing">Billing</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn-primary"
            [disabled]="ticketForm.invalid || isSubmitting()"
          >
            @if (isSubmitting()) {
              Creating...
            } @else {
              Create Ticket
            }
          </button>
          <button type="button" class="btn-secondary" (click)="resetForm()">
            Reset
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-ticket-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .ticket-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
    }
  `]
})
export class CreateTicketComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  
  isSubmitting = signal(false);
  
  ticketForm: FormGroup = this.fb.group({
    subject: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['normal'],
    department: ['technical']
  });

  async onSubmit() {
    if (this.ticketForm.valid) {
      this.isSubmitting.set(true);
      
      try {
        const ticketData = this.ticketForm.value;
        await this.ticketService.createTicket(ticketData);
        
        // Navigate to ticket list or show success message
        this.router.navigate(['/tickets']);
      } catch (error) {
        console.error('Error creating ticket:', error);
        // Handle error (show toast, etc.)
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  resetForm() {
    this.ticketForm.reset({
      priority: 'normal',
      department: 'technical'
    });
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }
}