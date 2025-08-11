import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = {
    name: 'Sys Admin',
    greeting: 'Good Afternoon Sys!',
    language: 'English',
    email: ''
  };

  showProfileDropdown = false;
  showLanguageDropdown = false;

  constructor(private router: Router) {}

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showLanguageDropdown = false;
  }

  toggleLanguageDropdown() {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    this.showProfileDropdown = false;
  }

  ngOnInit() {
    // Load user data from localStorage if available
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUser.email = user.email;
      this.currentUser.name = user.role === 'admin' ? 'Admin User' : 'User';
      this.updateGreeting();
    }
  }

  private updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    
    if (hour >= 12 && hour < 17) {
      greeting = 'Good Afternoon';
    } else if (hour >= 17) {
      greeting = 'Good Evening';
    }
    
    const firstName = this.currentUser.name.split(' ')[0];
    this.currentUser.greeting = `${greeting} ${firstName}!`;
  }

  onLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Close dropdown
    this.showProfileDropdown = false;
    
    // Navigate to login page
    this.router.navigate(['/auth/login']);
  }

  onProfile() {
    this.showProfileDropdown = false;
    // Navigate to profile page (implement as needed)
    console.log('Navigate to profile');
  }

  onSettings() {
    this.showProfileDropdown = false;
    // Navigate to settings page (implement as needed)
    this.router.navigate(['/settings']);
  }
}