import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  ticketForm: FormGroup;
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

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      ticketType: ['', Validators.required],
      department: ['', Validators.required],
      requestDetails: ['', [Validators.required, Validators.minLength(10)]],
      attachments: [null],
      agreeToTerms: [false, Validators.requiredTrue]
    });
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
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.ticketForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.ticketForm.controls).forEach(key => {
        this.ticketForm.get(key)?.markAsTouched();
      });
    }
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