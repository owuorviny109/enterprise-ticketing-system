import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ticketForm!: FormGroup;
  showSuccess = false;
  isSubmitting = false;

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
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.ticketForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      ticketType: ['', Validators.required],
      department: ['', Validators.required],
      requestDetails: ['', [Validators.required, Validators.minLength(10)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToTicketForm() {
    this.router.navigate(['/contact']);
  }

  scrollToForm() {
    const formElement = document.querySelector('.ticket-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.isSubmitting = true;

      const formData = this.ticketForm.value;
      const ticketData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        description: formData.requestDetails,
        type: formData.ticketType,
        department: formData.department,
        priority: 'medium' // Default priority for public tickets
      };

      this.http.post('http://localhost:3000/api/tickets', ticketData).subscribe({
        next: (response) => {
          console.log('Ticket created successfully:', response);
          this.showSuccess = true;
          this.isSubmitting = false;
          this.ticketForm.reset();
        },
        error: (error) => {
          console.error('Error creating ticket:', error);
          this.isSubmitting = false;
          alert('Failed to create ticket. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Files selected:', input.files);
      // Handle file upload logic here
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.ticketForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${minLength} characters`;
      }
      if (control.errors['requiredTrue']) {
        return 'You must agree to the terms and conditions';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      subject: 'Subject',
      ticketType: 'Ticket type',
      department: 'Department',
      requestDetails: 'Request details',
      agreeToTerms: 'Terms agreement'
    };
    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched() {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const control = this.ticketForm.get(key);
      control?.markAsTouched();
    });
  }
}