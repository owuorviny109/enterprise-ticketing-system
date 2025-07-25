import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// User Roles Component
@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-roles-page">
      <div class="page-header">
        <h1>User Roles</h1>
        <div class="breadcrumb">
          <span>🏠</span>
          <span>/</span>
          <span>User Roles</span>
        </div>
      </div>

      <div class="roles-container">
        <div class="search-section">
          <div class="search-left">
            <input 
              type="text" 
              placeholder="Search..." 
              [(ngModel)]="searchTerm"
              (input)="applySearch()"
              class="search-input"
            >
            <button class="reset-btn" (click)="resetSearch()">Reset</button>
          </div>
          
          <div class="search-right">
            <button class="new-role-btn">Create a New Role</button>
          </div>
        </div>

        <div class="table-container">
          <table class="roles-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let role of filteredRoles" class="role-row">
                <td class="role-id">{{ role.id }}</td>
                <td class="role-name">{{ role.name }}</td>
                <td class="role-slug">{{ role.slug }}</td>
                <td class="role-actions">
                  <button class="edit-btn">▶</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-roles-page { padding: 0; }
    .page-header { margin-bottom: 30px; }
    .page-header h1 { font-size: 24px; font-weight: 600; color: #495057; margin: 0 0 5px 0; }
    .breadcrumb { color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px; }
    .roles-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .search-section { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e9ecef; }
    .search-left { display: flex; align-items: center; gap: 15px; }
    .search-input { padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; width: 250px; }
    .reset-btn { padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; }
    .new-role-btn { padding: 8px 16px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; }
    .table-container { overflow-x: auto; }
    .roles-table { width: 100%; border-collapse: collapse; }
    .roles-table th { background: #f8f9fa; padding: 15px; text-align: left; font-weight: 600; color: #495057; border-bottom: 1px solid #e9ecef; font-size: 14px; }
    .role-row { border-bottom: 1px solid #e9ecef; transition: background-color 0.2s ease; }
    .role-row:hover { background: #f8f9fa; }
    .roles-table td { padding: 15px; vertical-align: middle; }
    .role-id { font-weight: 600; color: #495057; font-size: 14px; }
    .role-name { font-weight: 500; color: #495057; font-size: 14px; }
    .role-slug { color: #6c757d; font-size: 14px; }
    .role-actions { text-align: center; }
    .edit-btn { background: none; border: none; color: #6c757d; cursor: pointer; font-size: 16px; padding: 5px; border-radius: 4px; transition: all 0.2s ease; }
    .edit-btn:hover { background: #f8f9fa; color: #6f42c1; }
  `]
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

// Create User Component
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-user-page">
      <div class="page-header">
        <h1>Create a new user</h1>
        <div class="breadcrumb">
          <span>🏠</span>
          <span>/</span>
          <span>Users</span>
          <span>/</span>
          <span>Create a new user</span>
        </div>
      </div>

      <div class="form-container">
        <form (ngSubmit)="createUser()" class="user-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First name</label>
              <input type="text" id="firstName" [(ngModel)]="user.firstName" name="firstName" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="lastName">Last name</label>
              <input type="text" id="lastName" [(ngModel)]="user.lastName" name="lastName" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" [(ngModel)]="user.email" name="email" class="form-input" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" [(ngModel)]="user.phone" name="phone" class="form-input">
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" [(ngModel)]="user.city" name="city" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" [(ngModel)]="user.address" name="address" class="form-input">
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" [(ngModel)]="user.country" name="country" class="form-select">
                <option value="">Select Country</option>
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
              </select>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" [(ngModel)]="user.password" name="password" class="form-input" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="role">Role</label>
              <div class="custom-dropdown">
                <div class="dropdown-trigger" (click)="toggleRoleDropdown()">
                  <span>{{ getRoleLabel() }}</span>
                  <span class="dropdown-arrow">▼</span>
                </div>
                <div *ngIf="showRoleDropdown" class="dropdown-menu">
                  <div *ngFor="let role of roles" class="dropdown-item" (click)="selectRole(role)">
                    {{ role.label }}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="photo">Photo</label>
              <div class="photo-upload">
                <input type="file" id="photoInput" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
                <button type="button" class="browse-btn" (click)="browsePhoto()">Browse</button>
                <span *ngIf="user.photo" class="file-name">{{ user.photo.name }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="create-btn">Create User</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-user-page { padding: 0; }
    .page-header { margin-bottom: 30px; }
    .page-header h1 { font-size: 24px; font-weight: 600; color: #495057; margin: 0 0 5px 0; }
    .breadcrumb { color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px; }
    .form-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 30px; }
    .user-form { max-width: 100%; }
    .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-weight: 600; color: #495057; margin-bottom: 8px; font-size: 14px; }
    .form-input, .form-select { padding: 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; transition: border-color 0.2s ease; }
    .form-input:focus, .form-select:focus { outline: none; border-color: #6f42c1; box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.1); }
    .custom-dropdown { position: relative; }
    .dropdown-trigger { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ced4da; border-radius: 4px; background: white; cursor: pointer; font-size: 14px; transition: border-color 0.2s ease; }
    .dropdown-trigger:hover { border-color: #6f42c1; }
    .dropdown-menu { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-top: none; border-radius: 0 0 4px 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; }
    .dropdown-item { padding: 12px; cursor: pointer; font-size: 14px; transition: background-color 0.2s ease; }
    .dropdown-item:hover { background: #f8f9fa; }
    .photo-upload { display: flex; align-items: center; gap: 15px; }
    .browse-btn { padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; transition: background-color 0.2s ease; }
    .browse-btn:hover { background: #5a6268; }
    .file-name { font-size: 14px; color: #6c757d; }
    .form-actions { margin-top: 30px; display: flex; justify-content: flex-end; }
    .create-btn { padding: 12px 24px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
    .create-btn:hover { background: #5a32a3; }
  `]
})
export class CreateUserComponent {
  user = {
    firstName: '', lastName: '', email: '', phone: '', city: '', address: '', country: '', password: '', role: '', photo: null as File | null
  };

  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'customer', label: 'Customer' },
    { value: 'staff', label: 'Staff' }
  ];

  showRoleDropdown = false;

  toggleRoleDropdown() { this.showRoleDropdown = !this.showRoleDropdown; }
  selectRole(role: any) { this.user.role = role.value; this.showRoleDropdown = false; }
  onFileSelected(event: any) { const file = event.target.files[0]; if (file) { this.user.photo = file; } }
  browsePhoto() { const fileInput = document.getElementById('photoInput') as HTMLInputElement; fileInput?.click(); }
  createUser() { console.log('Creating user:', this.user); }
  getRoleLabel() { const role = this.roles.find(r => r.value === this.user.role); return role ? role.label : 'Select Role'; }
}

// Create Organization Component
@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-organization-page">
      <div class="page-header">
        <h1>Create a new organization</h1>
        <div class="breadcrumb">
          <span>🏠</span>
          <span>/</span>
          <span>Organizations</span>
          <span>/</span>
          <span>Create a new organization</span>
        </div>
      </div>

      <div class="form-container">
        <form (ngSubmit)="createOrganization()" class="organization-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" [(ngModel)]="organization.name" name="name" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" [(ngModel)]="organization.email" name="email" class="form-input" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" [(ngModel)]="organization.phone" name="phone" class="form-input">
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" [(ngModel)]="organization.address" name="address" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" [(ngModel)]="organization.city" name="city" class="form-input">
            </div>
            <div class="form-group">
              <label for="provinceState">Province/State</label>
              <input type="text" id="provinceState" [(ngModel)]="organization.provinceState" name="provinceState" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" [(ngModel)]="organization.country" name="country" class="form-select">
                <option value="">Select Country</option>
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
              </select>
            </div>
            <div class="form-group">
              <label for="postalCode">Postal code</label>
              <input type="text" id="postalCode" [(ngModel)]="organization.postalCode" name="postalCode" class="form-input">
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="create-btn">Create Organization</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-organization-page { padding: 0; }
    .page-header { margin-bottom: 30px; }
    .page-header h1 { font-size: 24px; font-weight: 600; color: #495057; margin: 0 0 5px 0; }
    .breadcrumb { color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px; }
    .form-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 30px; }
    .organization-form { max-width: 100%; }
    .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-weight: 600; color: #495057; margin-bottom: 8px; font-size: 14px; }
    .form-input, .form-select { padding: 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; transition: border-color 0.2s ease; }
    .form-input:focus, .form-select:focus { outline: none; border-color: #6f42c1; box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.1); }
    .form-actions { margin-top: 30px; display: flex; justify-content: flex-end; }
    .create-btn { padding: 12px 24px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
    .create-btn:hover { background: #5a32a3; }
  `]
})
export class CreateOrganizationComponent {
  organization = {
    name: '', email: '', phone: '', address: '', city: '', provinceState: '', country: '', postalCode: ''
  };

  createOrganization() {
    console.log('Creating organization:', this.organization);
  }
}