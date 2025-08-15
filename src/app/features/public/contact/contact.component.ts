import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFormComponent, TicketFormConfig } from '../../../shared/components/ticket-form/ticket-form.component';
import { TicketService } from '../../tickets/services/ticket.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CreateTicketRequest } from '../../../models/ticket.model';

/**
 * Public contact/ticket submission page
 * Used by non-authenticated users to create tickets
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TicketFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);

  // Public form configuration - shows personal info fields
  formConfig: TicketFormConfig = {
    mode: 'public',
    showPersonalInfo: true,
    showPriority: false,
    showAssignment: false,
    submitButtonText: 'Submit Ticket',
    title: 'Create a ticket',
    description: 'Submit your request and our team will get back to you as soon as possible.'
  };

  // Empty for now - will be used for pre-filling when authentication is implemented
  initialData: any = {};

  /**
   * Handle ticket submission from public users
   * DATABASE READY: This will work with your backend
   */
  onTicketSubmit(event: any) {
    const { formData, onSuccess, onError } = event;
    
    // Prepare ticket data for database
    const ticketData: CreateTicketRequest = {
      subject: formData.subject,
      ticketType: formData.ticketType,
      department: formData.department,
      requestDetails: formData.requestDetails,
      priority: 'medium', // Default priority for public tickets
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      attachments: formData.attachments || []
    };

    // DATABASE READY: This will work with your backend
    this.ticketService.createTicket(ticketData).subscribe({
      next: (ticket) => {
        console.log('Public ticket created:', ticket);
        this.toastService.showSuccess('Success', `Ticket #${ticket.key || ticket.id} submitted successfully!`);
        onSuccess();
      },
      error: (error) => {
        console.error('Error creating ticket:', error);
        this.toastService.showError('Error', 'Failed to submit ticket. Please try again.');
        onError();
      }
    });
  }
}