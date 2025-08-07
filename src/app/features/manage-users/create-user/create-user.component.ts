import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../../../config/roles.enum';
import { CreateUserRequest } from '../../../models/user.model';
import { UserService } from '../services/user.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  userRoles = Object.values(UserRole);
  selectedPhoto: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: [''],
      address: [''],
      country: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPhoto = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      const formData = this.userForm.value as CreateUserRequest;
      if (this.selectedPhoto) {
        formData.photo = this.selectedPhoto;
      }

      this.userService.createUser(formData).subscribe({
        next: (user) => {
          console.log('User created successfully:', user);
          this.isSubmitting = false;
          this.toastService.showSuccess('Success', `User ${user.firstName} ${user.lastName} created successfully`);
          // Navigate back to users list
          this.router.navigate(['/manage-users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.isSubmitting = false;
          this.toastService.showError('Error', 'Failed to create user. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.userForm.get(fieldName);
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
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      city: 'City',
      address: 'Address',
      country: 'Country',
      password: 'Password',
      role: 'Role'
    };
    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!(control?.invalid && control.touched);
  }
}