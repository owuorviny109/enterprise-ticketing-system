import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Ticket form configuration interface
 */
export interface TicketFormConfig {
  mode: 'public' | 'admin';
  showPersonalInfo: boolean;
  showPriority: boolean;
  showAssignment: boolean;
  submitButtonText: string;
  title: string;
  description: string;
}

/**
 * Reusable ticket form component
 * Used by both public and admin ticket creation
 */
@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent implements OnInit {
  // Form configuration - controls which fields to show/hide
  @Input() config: TicketFormConfig = {
    mode: 'public',
    showPersonalInfo: true,
    showPriority: false,
    showAssignment: false,
    submitButtonText: 'Submit',
    title: 'Create a ticket',
    description: 'Submit your request and our team will get back to you as soon as possible.'
  };

  // Pre-fill data for logged-in users (future use)
  @Input() initialData: any = {};
  
  // Events
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  ticketForm!: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  ticketTypes = [
    'General Inquiry',
    'Award Progression',
    'Certificate Request',
    'Registration Issue',
    'Complaint or Grievance',
    'Technical Support'
  ];

  departments = [
    'Admin',
    'ICT',
    'Finance',
    'Program Management',
    'Customer Service'
  ];

  priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initialize form with dynamic fields based on configuration
   */
  private initializeForm() {
    // Base form fields (always present)
    const formConfig: any = {
      subject: [this.initialData.subject || '', [Validators.required, Validators.minLength(5)]],
      ticketType: [this.initialData.ticketType || '', Validators.required],
      department: [this.initialData.department || '', Validators.required],
      requestDetails: [this.initialData.requestDetails || '', [Validators.required, Validators.minLength(10)]],
      attachments: [null]
    };

    // Add terms checkbox for public users only
    if (this.config.mode === 'public') {
      formConfig.agreeToTerms = [false, Validators.requiredTrue];
    }

    // Add personal info fields when needed
    if (this.config.showPersonalInfo) {
      formConfig.firstName = [this.initialData.firstName || '', [Validators.required, Validators.minLength(2)]];
      formConfig.lastName = [this.initialData.lastName || '', [Validators.required, Validators.minLength(2)]];
      formConfig.email = [this.initialData.email || '', [Validators.required, Validators.email]];
    }

    // Add admin-specific fields
    if (this.config.showPriority) {
      formConfig.priority = [this.initialData.priority || 'medium'];
    }

    if (this.config.showAssignment) {
      formConfig.assignedTo = [this.initialData.assignedTo || ''];
    }

    this.ticketForm = this.fb.group(formConfig);
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.ticketForm.patchValue({
        attachments: files
      });
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit({
        formData: this.ticketForm.value,
        onSuccess: () => {
          this.isSubmitting = false;
          if (this.config.mode === 'public') {
            this.showSuccess = true;
            this.ticketForm.reset();
            setTimeout(() => this.showSuccess = false, 5000);
          }
        },
        onError: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.ticketForm.controls).forEach(key => {
        this.ticketForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  getFieldError(fieldName: string): string {
    const field = this.ticketForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }
}