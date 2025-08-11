import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  // Sample credentials for testing
  private sampleCredentials = [
    { email: 'admin@presidentsaward.ke', password: 'admin123', role: 'admin' },
    { email: 'user@presidentsaward.ke', password: 'user123', role: 'user' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.loading = true;

    // Check against sample credentials first (for demo purposes)
    const validCredential = this.sampleCredentials.find(
      cred => cred.email === this.email && cred.password === this.password
    );

    if (validCredential) {
      // Simulate API delay
      setTimeout(() => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify({
          email: validCredential.email,
          role: validCredential.role
        }));
        alert(`Login successful! Welcome ${validCredential.role}!`);
        this.router.navigate(['/dashboard']);
      }, 1500);
      return;
    }

    // If no sample credentials match, try API call
    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:4200/api/login', payload).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(response.user));
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials or try the sample accounts.';
      }
    });
  }
}
