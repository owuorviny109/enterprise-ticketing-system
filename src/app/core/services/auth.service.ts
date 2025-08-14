import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'crm_users';
  private currentUserKey = 'crm_current_user';

  constructor(private router: Router) {}

  register(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (users.find(u => u.email === user.email)) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    //  Dev override: bypass credential checks
    const mockUser: User = {
      firstName: 'Dev',
      lastName: 'Tester',
      email: email,
      password: password
    };

    localStorage.setItem(this.currentUserKey, JSON.stringify(mockUser));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return true; // Always consider the user logged in during development
  }

  get currentUserValue() {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  //  Optional: clear all users during dev testing
  clearAllUsers(): void {
    localStorage.removeItem(this.storageKey);
  }
}
=======

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Implement authentication service
  // This is a placeholder for future authentication implementation
  
  constructor() { }

  // Placeholder methods - implement when authentication is needed
  isLoggedIn(): boolean {
    return false; // Default: not logged in
  }

  getCurrentUser(): any {
    return null; // Default: no user
  }

  login(email: string, password: string): Promise<boolean> {
    // TODO: Implement login logic
    return Promise.resolve(false);
  }

  logout(): void {
    // TODO: Implement logout logic
  }
}
>>>>>>> Gerson
