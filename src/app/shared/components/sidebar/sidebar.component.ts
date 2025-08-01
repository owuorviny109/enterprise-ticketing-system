import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
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