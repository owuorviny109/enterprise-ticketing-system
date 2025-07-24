import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <p>Registration form will be implemented here.</p>
    </div>
  `,
  styles: [`
    .register-container {
      padding: 2rem;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class RegisterComponent {}