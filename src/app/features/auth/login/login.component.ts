import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <p>Login form will be implemented here.</p>
    </div>
  `,
  styles: [`
    .login-container {
      padding: 2rem;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class LoginComponent {}