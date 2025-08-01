import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { TicketFormComponent, TicketFormConfig } from '../../../../shared/components/ticket-form/ticket-form.component';
import { CreateTicketRequest } from '../../../../models/ticket.model';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, TicketFormComponent],
  template: `
    <div class="create-ticket-container">
      <div class="header">
        <h2>Create New Ticket</h2>
        <button type="button" class="btn-secondary" (click)="goBack()">
          ← Back to List
        </button>
      </div>
      
      <app-ticket-form 
        [config]="formConfig"
        (formSubmit)="onTicketSubmit($event)"
        (formCancel)="goBack()">
      </app-ticket-form>
    </div>
  `,
  styles: [`
    .create-ticket-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      background-color: #6c757d;
      color: white;
      transition: background-color 0.2s;
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
    }
  `]
})
export class CreateTicketComponent {
  private router = inject(Router);
  private ticketService = inject(TicketService);

  formConfig: TicketFormConfig = {
    mode: 'public',
    showPersonalInfo: true,
    showPriority: false,
    showAssignment: false,
    submitButtonText: 'Submit Ticket',
    title: 'Create New Ticket',
    description: 'Fill out the form below to create a new support ticket.'
  };

  async onTicketSubmit(event: any) {
    const { formData, onSuccess, onError } = event;
    
    try {
      // Convert form data to the expected format
      const ticketData: CreateTicketRequest = {
        subject: formData.subject,
        ticketType: formData.ticketType,
        department: formData.department,
        requestDetails: formData.requestDetails,
        priority: formData.priority || 'normal',
        assignedTo: formData.assignedTo,
        attachments: formData.attachments
      };

      const ticket = await this.ticketService.createTicket(ticketData).toPromise();
      console.log('Admin ticket created:', ticket);
      onSuccess();
      this.router.navigate(['/tickets']);
    } catch (error) {
      console.error('Error creating ticket:', error);
      onError();
    }
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }
}