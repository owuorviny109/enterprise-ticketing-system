import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent {
  searchTerm = '';
  roles = [
    { id: 1, name: 'Admin', slug: 'admin' },
    { id: 2, name: 'Customer', slug: 'customer' },
    { id: 4, name: 'Staff', slug: 'Staff' }
  ];
  filteredRoles = [...this.roles];

  applySearch() {
    this.filteredRoles = this.roles.filter(role =>
      role.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      role.slug.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetSearch() {
    this.searchTerm = '';
    this.filteredRoles = [...this.roles];
  }
}