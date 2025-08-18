import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Footer],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ticketForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
  successMessage = '';
  fileUploadMessages: string[] = [];

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
      attachments: [<File[]>[]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const newFiles = Array.from(input.files);
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxFileSizeMB = 5;
    const maxFilesAllowed = 3;

    const currentFiles: File[] = this.ticketForm.get('attachments')?.value || [];
    const validFiles: File[] = [];
    this.fileUploadMessages = [];

    for (const file of newFiles) {
      const isDuplicate = currentFiles.some(
        f => f.name === file.name && f.size === file.size && f.type === file.type
      );
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= maxFileSizeMB * 1024 * 1024;

      if (isDuplicate) {
        this.fileUploadMessages.push(`"${file.name}" is already selected.`);
        continue;
      }

      if (!isValidType) {
        this.fileUploadMessages.push(`"${file.name}" has an invalid file type.`);
        continue;
      }

      if (!isValidSize) {
        this.fileUploadMessages.push(`"${file.name}" exceeds the ${maxFileSizeMB}MB limit.`);
        continue;
      }

      validFiles.push(file);
    }

    const totalFiles = currentFiles.length + validFiles.length;
    if (totalFiles > maxFilesAllowed) {
      this.fileUploadMessages.push(`You can only upload up to ${maxFilesAllowed} files.`);
      return;
    }

    const updatedFiles = [...currentFiles, ...validFiles];
    this.ticketForm.patchValue({ attachments: updatedFiles });

    input.value = ''; // allow reselecting same file again
  }

  onFileRemove(file: File): void {
    const attachments: File[] = this.ticketForm.get('attachments')?.value || [];
    const updatedAttachments = attachments.filter(
      f => !(f.name === file.name && f.size === file.size)
    );
    this.ticketForm.patchValue({ attachments: updatedAttachments });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.successMessage = '✅ Ticket submitted successfully. You may log in later to track it.';
        this.ticketForm.reset({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          ticketType: '',
          department: '',
          requestDetails: '',
          attachments: [],
          agreeToTerms: false
        });

        setTimeout(() => {
          this.showSuccess = false;
          this.successMessage = '';
        }, 5000);
      }, 2000);
    } else {
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

  scrollToForm(): void {
    const formElement = document.querySelector('.ticket-form-section');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}