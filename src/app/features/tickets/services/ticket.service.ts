import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Types for better type safety
export interface Ticket {
  id: string;
  key: string;
  subject: string;
  description: string;
  type: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'open' | 'in_progress' | 'resolved' | 'closed';
  department: string;
  customerId: string;
  assignedTo?: string;
  organizationId?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface CreateTicketRequest {
  subject: string;
  description: string;
  priority: Ticket['priority'];
  department: string;
  type?: string;
}

export interface TicketFilter {
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  department?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TicketResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/tickets';
  
  // Reactive state management with signals
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Public signals for components to consume
  tickets$ = this.ticketsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  // Signal-based state
  selectedTicket = signal<Ticket | null>(null);
  totalCount = signal<number>(0);

  /**
   * Get tickets with optional filtering and pagination
   */
  getTickets(filter: TicketFilter = {}): Observable<TicketResponse> {
    this.loadingSubject.next(true);
    
    const params = this.buildQueryParams(filter);
    
    return this.http.get<TicketResponse>(`${this.baseUrl}`, { params })
      .pipe(
        tap(response => {
          this.ticketsSubject.next(response.tickets);
          this.totalCount.set(response.total);
          this.loadingSubject.next(false);
        })
      );
  }

  /**
   * Get a single ticket by ID
   */
  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(ticket => this.selectedTicket.set(ticket))
      );
  }

  /**
   * Create a new ticket
   */
  createTicket(ticketData: CreateTicketRequest): Observable<Ticket> {
    this.loadingSubject.next(true);
    
    return this.http.post<Ticket>(this.baseUrl, ticketData)
      .pipe(
        tap(newTicket => {
          // Add to current tickets list
          const currentTickets = this.ticketsSubject.value;
          this.ticketsSubject.next([newTicket, ...currentTickets]);
          this.totalCount.update(count => count + 1);
          this.loadingSubject.next(false);
        })
      );
  }

  /**
   * Update an existing ticket
   */
  updateTicket(id: string, updates: Partial<Ticket>): Observable<Ticket> {
    this.loadingSubject.next(true);
    
    return this.http.patch<Ticket>(`${this.baseUrl}/${id}`, updates)
      .pipe(
        tap(updatedTicket => {
          // Update in current tickets list
          const currentTickets = this.ticketsSubject.value;
          const updatedTickets = currentTickets.map(ticket => 
            ticket.id === id ? updatedTicket : ticket
          );
          this.ticketsSubject.next(updatedTickets);
          
          // Update selected ticket if it's the same one
          if (this.selectedTicket()?.id === id) {
            this.selectedTicket.set(updatedTicket);
          }
          
          this.loadingSubject.next(false);
        })
      );
  }

  /**
   * Delete a ticket
   */
  deleteTicket(id: string): Observable<void> {
    this.loadingSubject.next(true);
    
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          // Remove from current tickets list
          const currentTickets = this.ticketsSubject.value;
          const filteredTickets = currentTickets.filter(ticket => ticket.id !== id);
          this.ticketsSubject.next(filteredTickets);
          this.totalCount.update(count => count - 1);
          
          // Clear selected ticket if it was deleted
          if (this.selectedTicket()?.id === id) {
            this.selectedTicket.set(null);
          }
          
          this.loadingSubject.next(false);
        })
      );
  }

  /**
   * Assign ticket to a user
   */
  assignTicket(ticketId: string, userId: string): Observable<Ticket> {
    return this.updateTicket(ticketId, { assignedTo: userId });
  }

  /**
   * Change ticket status
   */
  changeTicketStatus(ticketId: string, status: Ticket['status']): Observable<Ticket> {
    const updates: Partial<Ticket> = { status };
    
    // Set resolved date if status is resolved
    if (status === 'resolved') {
      updates.resolvedAt = new Date();
    }
    
    return this.updateTicket(ticketId, updates);
  }

  /**
   * Get tickets by status
   */
  getTicketsByStatus(status: Ticket['status']): Observable<Ticket[]> {
    return this.getTickets({ status }).pipe(
      map(response => response.tickets)
    );
  }

  /**
   * Get user's assigned tickets
   */
  getAssignedTickets(userId: string): Observable<Ticket[]> {
    return this.getTickets({ assignedTo: userId }).pipe(
      map(response => response.tickets)
    );
  }

  /**
   * Search tickets
   */
  searchTickets(query: string): Observable<Ticket[]> {
    return this.getTickets({ search: query }).pipe(
      map(response => response.tickets)
    );
  }

  /**
   * Clear current state (useful for logout, etc.)
   */
  clearState(): void {
    this.ticketsSubject.next([]);
    this.selectedTicket.set(null);
    this.totalCount.set(0);
    this.loadingSubject.next(false);
  }

  /**
   * Helper method to build query parameters
   */
  private buildQueryParams(filter: TicketFilter): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value.toString();
      }
    });
    
    return params;
  }

  /**
   * Get ticket statistics
   */
  getTicketStats(): Observable<{
    total: number;
    pending: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  }> {
    return this.http.get<any>(`${this.baseUrl}/stats`);
  }
}