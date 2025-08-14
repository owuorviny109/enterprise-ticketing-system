import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService, Role } from '../services/role.service';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  searchTerm = '';
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  isLoading = false;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.filteredRoles = [...roles];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        this.isLoading = false;
      }
    });
  }

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

  createNewRole() {
    // TODO: Implement create new role functionality
    console.log('Create new role clicked');
  }

  editRole(role: Role) {
    // TODO: Implement edit role functionality
    console.log('Edit role clicked:', role);
  }
}