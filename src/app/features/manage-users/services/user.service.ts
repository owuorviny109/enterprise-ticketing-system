import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, CreateUserRequest } from '../../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = '/api/users'; // This would be configured from environment

    constructor(private http: HttpClient) { }

    createUser(userData: CreateUserRequest): Observable<User> {
        // TODO: Replace with actual HTTP call when backend is ready
        // return this.http.post<User>(this.apiUrl, userData);

        // Mock implementation for now
        const mockUser: User = {
            id: this.generateId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            city: userData.city,
            address: userData.address,
            country: userData.country,
            role: userData.role,
            photoUrl: userData.photo ? URL.createObjectURL(userData.photo) : undefined,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return of(mockUser).pipe(delay(1000)); // Simulate network delay
    }

    getUsers(): Observable<User[]> {
        // TODO: Replace with actual HTTP call when backend is ready
        // return this.http.get<User[]>(this.apiUrl);

        // Mock implementation for now
        return of([]).pipe(delay(500));
    }

    getUserById(id: string): Observable<User> {
        // TODO: Replace with actual HTTP call when backend is ready
        // return this.http.get<User>(`${this.apiUrl}/${id}`);

        // Mock implementation for now
        return of({} as User).pipe(delay(500));
    }

    updateUser(id: string, userData: Partial<User>): Observable<User> {
        // TODO: Replace with actual HTTP call when backend is ready
        // return this.http.put<User>(`${this.apiUrl}/${id}`, userData);

        // Mock implementation for now
        return of({} as User).pipe(delay(1000));
    }

    deleteUser(id: string): Observable<void> {
        // TODO: Replace with actual HTTP call when backend is ready
        // return this.http.delete<void>(`${this.apiUrl}/${id}`);

        // Mock implementation for now
        return of(void 0).pipe(delay(500));
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}