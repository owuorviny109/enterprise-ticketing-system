import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/models/notes.model';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  noteForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
      relatedTo: ['Contact'],
      referenceId: [''],
      createdBy: ['admin'],
      createdDate: [new Date()],
      visibility: ['Private'],
      tags: [[]],
      priority: ['Medium']
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.isSubmitting = true;
      const formData = this.noteForm.value as Note;

      this.http.post<Note>('/api/notes', formData).subscribe({
        next: (note) => {
          this.isSubmitting = false;
          this.toastService.showSuccess('Success', `Note "${note.title}" created`);
          this.router.navigate(['/manage-notes']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.toastService.showError('Error', 'Failed to create note');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.noteForm.controls).forEach(key => {
      this.noteForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.noteForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['minlength']) return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.noteForm.get(fieldName);
    return !!(control?.invalid && control.touched);
  }
}
