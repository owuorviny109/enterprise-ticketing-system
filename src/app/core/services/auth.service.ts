import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  country?: string;
  organization?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly baseUrl = '/api';
  
  // Reactive state management
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  // Public observables
  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  // Signals for modern Angular
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check for existing token on service initialization
    this.checkExistingAuth();
  }

  /**
   * Check for existing authentication on app startup
   */
  private checkExistingAuth(): void {
    const token = this.getToken();
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.setCurrentUser(user);
        this.setAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearAuth();
      }
    }
  }

  /**
   * Login user with email and password
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { email, password };
    
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginData)
      .pipe(
        tap(response => {
          // Store token and user data
          this.setToken(response.token);
          this.setCurrentUser(response.user);
          this.setAuthenticated(true);
          
          // Store user data in localStorage for persistence
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }),
        catchError(error => {
          console.error('Login error:', error);
          this.clearAuth();
          throw error;
        })
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Set JWT token
   */
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Set current user
   */
  private setCurrentUser(user: User): void {
    this.currentUser.set(user);
    this.currentUserSubject.next(user);
  }

  /**
   * Set authentication status
   */
  private setAuthenticated(status: boolean): void {
    this.isAuthenticated.set(status);
    this.isAuthenticatedSubject.next(status);
  }

  /**
   * Clear all authentication data
   */
  private clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.currentUserSubject.next(null);
    this.setAuthenticated(false);
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Check if user is staff
   */
  isStaff(): boolean {
    return this.hasRole('staff') || this.hasRole('admin');
  }

  /**
   * Get user's full name
   */
  getUserFullName(): string {
    const user = this.getCurrentUser();
    if (user) {
      return `${user.first_name} ${user.last_name}`;
    }
    return 'Guest';
  }

  /**
   * Refresh user data
   */
  refreshUser(): Observable<User | null> {
    // This would typically fetch updated user data from the server
    // For now, return current user
    const user = this.getCurrentUser();
    return of(user);
  }
}
