import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

// Sidebar Component
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-content">
        <ul class="menu-list">
          <li *ngFor="let item of menuItems" class="menu-item">
            <a 
              [routerLink]="item.route" 
              class="menu-link"
              [class.active]="item.active"
              (click)="item.expandable && item.label === 'Settings' ? toggleSettings() : null"
            >
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-label">{{ item.label }}</span>
              <span *ngIf="item.expandable" class="expand-icon">
                {{ item.label === 'Settings' && expandedSettings ? '▼' : '▶' }}
              </span>
            </a>
            
            <ul *ngIf="item.label === 'Settings' && expandedSettings" class="submenu">
              <li *ngFor="let subItem of settingsSubItems" class="submenu-item">
                <a [routerLink]="subItem.route" class="submenu-link">
                  {{ subItem.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #f8f9fa;
      border-right: 1px solid #e9ecef;
      position: fixed;
      left: 0;
      top: 0;
      overflow-y: auto;
      z-index: 1000;
    }
    .sidebar-content { padding: 20px 0; }
    .menu-list { list-style: none; margin: 0; padding: 0; }
    .menu-item { margin-bottom: 2px; }
    .menu-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #6c757d;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .menu-link:hover { background: #e9ecef; color: #495057; }
    .menu-link.active {
      background: #6f42c1;
      color: white;
      border-radius: 0 25px 25px 0;
      margin-right: 10px;
    }
    .menu-icon { margin-right: 12px; font-size: 16px; width: 20px; text-align: center; }
    .menu-label { flex: 1; }
    .expand-icon { font-size: 12px; margin-left: auto; }
    .submenu { list-style: none; margin: 0; padding: 0; background: #f1f3f4; }
    .submenu-link {
      display: block;
      padding: 8px 20px 8px 52px;
      color: #6c757d;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.2s ease;
    }
    .submenu-link:hover { background: #e9ecef; color: #495057; }
  `]
})
export class SidebarComponent {
  menuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/dashboard', active: false },
    { icon: '🎫', label: 'Tickets', route: '/tickets', active: false },
    { icon: '❓', label: 'FAQs', route: '/faqs', active: false },
    { icon: '👥', label: 'Customers', route: '/customers', active: false },
    { icon: '📝', label: 'Notes', route: '/notes', active: false },
    { icon: '📞', label: 'Contacts', route: '/contacts', active: false },
    { icon: '🏢', label: 'Organizations', route: '/organizations', active: false },
    { icon: '👤', label: 'Manage Users', route: '/manage-users', active: false },
    { icon: '⚙️', label: 'Settings', route: '/settings', active: false, expandable: true },
    { icon: '📄', label: 'Front Pages', route: '/front-pages', active: false },
    { icon: '🔄', label: 'System Update', route: '/system-update', active: false }
  ];

  settingsSubItems = [
    { label: 'User Roles', route: '/settings/user-roles' },
    { label: 'Global', route: '/settings/global' },
    { label: 'Departments', route: '/settings/departments' }
  ];

  expandedSettings = false;

  toggleSettings() {
    this.expandedSettings = !this.expandedSettings;
  }
}

// Header Component
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header">
      <div class="header-left">
        <div class="logo-section">
          <img src="/logo.png" alt="Logo" class="logo">
          <span class="greeting">{{ currentUser.greeting }}</span>
        </div>
      </div>

      <div class="header-right">
        <div class="language-selector" (click)="toggleLanguageDropdown()">
          <span class="flag">🇬🇧</span>
          <span>{{ currentUser.language }}</span>
          <span class="dropdown-arrow">▼</span>
          
          <div *ngIf="showLanguageDropdown" class="dropdown-menu">
            <div class="dropdown-item">
              <span class="flag">🇬🇧</span>
              <span>English</span>
            </div>
          </div>
        </div>

        <div class="profile-section" (click)="toggleProfileDropdown()">
          <span class="profile-name">{{ currentUser.name }}</span>
          <span class="dropdown-arrow">▼</span>
          
          <div *ngIf="showProfileDropdown" class="dropdown-menu">
            <div class="dropdown-item">Profile</div>
            <div class="dropdown-item">Settings</div>
            <div class="dropdown-item">Logout</div>
          </div>
        </div>

        <div class="theme-toggle">
          <button class="theme-btn">🌙</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      height: 70px;
      background: white;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      margin-left: 250px;
      position: fixed;
      top: 0;
      right: 0;
      left: 250px;
      z-index: 999;
    }
    .header-left { display: flex; align-items: center; }
    .logo-section { display: flex; align-items: center; gap: 15px; }
    .logo { height: 40px; width: auto; }
    .greeting { font-size: 16px; font-weight: 500; color: #495057; }
    .header-right { display: flex; align-items: center; gap: 20px; }
    .language-selector, .profile-section {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      transition: background 0.2s ease;
    }
    .language-selector:hover, .profile-section:hover { background: #f8f9fa; }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      min-width: 150px;
      z-index: 1000;
      margin-top: 5px;
    }
    .dropdown-item {
      padding: 10px 15px;
      cursor: pointer;
      transition: background 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dropdown-item:hover { background: #f8f9fa; }
    .theme-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.2s ease;
    }
    .theme-btn:hover { background: #f8f9fa; }
  `]
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

// Dashboard Layout Component
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="dashboard-layout">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: #f8f9fa;
    }
    .main-content {
      flex: 1;
      margin-left: 250px;
      margin-top: 70px;
      padding: 30px;
      min-height: calc(100vh - 70px);
    }
  `]
})
export class DashboardLayoutComponent {}