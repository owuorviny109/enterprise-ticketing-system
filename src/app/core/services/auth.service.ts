import { Injectable } from '@angular/core';
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
      return false; // Email already exists
    }

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return false;
    }

    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  get currentUserValue() {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }
}
