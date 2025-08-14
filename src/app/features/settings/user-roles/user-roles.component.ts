<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService, Role } from '../services/role.service';
=======
<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService, Role } from '../services/role.service';
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39
>>>>>>> Gerson

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
<<<<<<< HEAD
export class UserRolesComponent implements OnInit {
  searchTerm = '';
=======
<<<<<<< HEAD
export class UserRolesComponent {
  searchTerm = '';
  roles = [
    { id: 1, name: 'Admin', slug: 'admin' },
    { id: 2, name: 'Customer', slug: 'customer' },
    { id: 4, name: 'Staff', slug: 'Staff' }
  ];
  filteredRoles = [...this.roles];
=======
export class UserRolesComponent implements OnInit {
  searchTerm = '';
>>>>>>> Gerson
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
<<<<<<< HEAD
=======
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39
>>>>>>> Gerson

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> Gerson

  createNewRole() {
    // TODO: Implement create new role functionality
    console.log('Create new role clicked');
  }

  editRole(role: Role) {
    // TODO: Implement edit role functionality
    console.log('Edit role clicked:', role);
  }
<<<<<<< HEAD
=======
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39
>>>>>>> Gerson
}