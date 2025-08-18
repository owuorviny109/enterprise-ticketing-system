import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser = {
    name: 'Sys Admin',
    greeting: 'Good Afternoon Sys!',
    language: 'English'
  };

  showProfileDropdown = false;
  showLanguageDropdown = false;

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showLanguageDropdown = false;
  }

  toggleLanguageDropdown() {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    this.showProfileDropdown = false;
  }
}