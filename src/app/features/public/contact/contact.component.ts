import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFormComponent, TicketFormConfig } from '../../../shared/components/ticket-form/ticket-form.component';

/**
 * Public contact/ticket submission page
 * Used by non-authenticated users to create tickets
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TicketFormComponent],
  template: `
    <app-ticket-form 
      [config]="formConfig"
      [initialData]="initialData"
      (formSubmit)="onTicketSubmit($event)">
    </app-ticket-form>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Public form configuration - shows personal info fields
  formConfig: TicketFormConfig = {
    mode: 'public',
    showPersonalInfo: true,
    showPriority: false,
    showAssignment: false,
    submitButtonText: 'Submit',
    title: 'Create a ticket',
    description: 'Submit your request and our team will get back to you as soon as possible.'
  };

  // Empty for now - will be used for pre-filling when authentication is implemented
  initialData: any = {};

  /**
   * Handle ticket submission from public users
   * Currently saves to localStorage - replace with API call when backend is ready
   */
  onTicketSubmit(event: any) {
    const { formData, onSuccess, onError } = event;
    
    // Simulate API call delay
    setTimeout(() => {
      console.log('Public ticket submitted:', formData);
      
      // Temporary storage in localStorage until backend is implemented
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const newTicket = {
        id: Date.now().toString(),
        key: '#' + Math.floor(100000 + Math.random() * 900000),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      tickets.push(newTicket);
      localStorage.setItem('tickets', JSON.stringify(tickets));
      
      onSuccess();
    }, 2000);
  }
}