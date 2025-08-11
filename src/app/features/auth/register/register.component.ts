import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  country = '';
  city = '';
  address = '';
  password = '';
  confirmPassword = '';
  error = '';

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      country: this.country,
      city: this.city,
      address: this.address,
      password: this.password,
    };

    console.log('Sending payload:', payload);
    // TODO: hook into backend service/API
  }
}