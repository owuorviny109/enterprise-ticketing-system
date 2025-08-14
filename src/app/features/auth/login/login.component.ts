import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms'; // Use FormsModule instead of ReactiveFormsModule
=======
import { FormsModule } from '@angular/forms';
>>>>>>> Gerson
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.loading = true;

    const payload = {
      email: this.email,
      password: this.password
    };

<<<<<<< HEAD
    this.http.post<any>('http://localhost:4200/api/login', payload).subscribe({
      next: (response) => {
        alert('Login successful!');
=======
    this.http.post<any>('http://localhost:3000/api/login', payload).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        alert(`${response.message} Welcome ${response.user.role}!`);
>>>>>>> Gerson
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
      }
    });
  }
}
