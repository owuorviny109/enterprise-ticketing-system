import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Role {
  id: number;
  name: string;
  slug: string;
  permissions?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRoleRequest {
  name: string;
  slug: string;
  permissions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = '/api/roles'; // This would be configured from environment

  constructor() {}

  getRoles(): Observable<Role[]> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.get<Role[]>(this.apiUrl);
    
    // Mock implementation for now
    const mockRoles: Role[] = [
      { id: 1, name: 'Admin', slug: 'admin', permissions: ['*'] },
      { id: 2, name: 'Customer', slug: 'customer', permissions: ['tickets.create', 'tickets.view'] },
      { id: 4, name: 'Staff', slug: 'Staff', permissions: ['tickets.*', 'users.view'] }
    ];

    return of(mockRoles).pipe(delay(500));
  }

  createRole(roleData: CreateRoleRequest): Observable<Role> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.post<Role>(this.apiUrl, roleData);
    
    // Mock implementation for now
    const mockRole: Role = {
      id: this.generateId(),
      name: roleData.name,
      slug: roleData.slug,
      permissions: roleData.permissions || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(mockRole).pipe(delay(1000));
  }

  updateRole(id: number, roleData: Partial<Role>): Observable<Role> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.put<Role>(`${this.apiUrl}/${id}`, roleData);
    
    // Mock implementation for now
    const mockRole: Role = {
      id,
      name: roleData.name || '',
      slug: roleData.slug || '',
      permissions: roleData.permissions || [],
      updatedAt: new Date()
    };

    return of(mockRole).pipe(delay(1000));
  }

  deleteRole(id: number): Observable<void> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
    // Mock implementation for now
    return of(void 0).pipe(delay(500));
  }

  getRoleById(id: number): Observable<Role> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.get<Role>(`${this.apiUrl}/${id}`);
    
    // Mock implementation for now
    return of({} as Role).pipe(delay(500));
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000) + 1000;
  }
}