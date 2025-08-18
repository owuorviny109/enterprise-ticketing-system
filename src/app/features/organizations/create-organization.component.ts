import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpClient } from '@angular/common/http';

export interface Organization {
  id?: string;
  name: string;
  phone?: string;
  city?: string;
  country?: string;
  email?: string;
  address?: string;
  province?: string;
  postalCode?: string;
}

@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
  organizationForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: [''],
      city: [''],
      country: [''],
      email: ['', [Validators.email]],
      address: [''],
      province: [''],
      postalCode: ['']
    });
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      this.isSubmitting = true;

      const formData = this.organizationForm.value as Organization;

      this.http.post<Organization>('/api/organizations', formData).subscribe({
        next: (org) => {
          console.log('Organization created:', org);
          this.isSubmitting = false;
          this.toastService.showSuccess('Success', `Organization ${org.name} created successfully`);
          this.router.navigate(['/organizations']);
        },
        error: (error) => {
          console.error('Error creating organization:', error);
          this.isSubmitting = false;
          this.toastService.showError('Error', 'Failed to create organization. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.organizationForm.controls).forEach(key => {
      const control = this.organizationForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.organizationForm.get(fieldName);
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
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: 'Name',
      phone: 'Phone',
      city: 'City',
      country: 'Country',
      email: 'Email',
      address: 'Address',
      province: 'Province/State',
      postalCode: 'Postal Code'
    };
    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.organizationForm.get(fieldName);
    return !!(control?.invalid && control.touched);
  }
}
