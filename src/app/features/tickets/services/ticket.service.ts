import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Ticket, CreateTicketRequest, TicketListResponse } from '../../../models/ticket.model';

export type { Ticket, CreateTicketRequest, TicketListResponse } from '../../../models/ticket.model';

export interface TicketFilter {
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  department?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/tickets';
  private readonly dashboardUrl = 'http://localhost:3000/api/dashboard';

  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  tickets$ = this.ticketsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  selectedTicket = signal<Ticket | null>(null);
  totalCount = signal<number>(0);

  getTickets(filter: TicketFilter = {}): Observable<TicketListResponse> {
    this.loadingSubject.next(true);
    const params = this.buildQueryParams(filter);

    return this.http.get<TicketListResponse>(`${this.baseUrl}`, { params }).pipe(
      tap(response => {
        this.ticketsSubject.next(response.tickets);
        this.totalCount.set(response.total);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        console.error('Error fetching tickets:', error);
        throw error;
      })
    );
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/${id}`).pipe(
      tap(ticket => this.selectedTicket.set(ticket))
    );
  }

  createTicket(ticketData: CreateTicketRequest): Observable<Ticket> {
    this.loadingSubject.next(true);
    return this.http.post<Ticket>(`${this.baseUrl}`, ticketData).pipe(
      tap(newTicket => {
        const currentTickets = this.ticketsSubject.value;
        this.ticketsSubject.next([newTicket, ...currentTickets]);
        this.totalCount.update(count => count + 1);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        console.error('Error creating ticket:', error);
        throw error;
      })
    );
  }

  updateTicket(id: string, updates: Partial<Ticket>): Observable<Ticket> {
    this.loadingSubject.next(true);
    return this.http.patch<Ticket>(`${this.baseUrl}/${id}`, updates).pipe(
      tap(updatedTicket => {
        const currentTickets = this.ticketsSubject.value;
        const updatedTickets = currentTickets.map(ticket =>
          ticket.id === id ? updatedTicket : ticket
        );
        this.ticketsSubject.next(updatedTickets);
        if (this.selectedTicket()?.id === id) {
          this.selectedTicket.set(updatedTicket);
        }
        this.loadingSubject.next(false);
      })
    );
  }

  deleteTicket(id: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentTickets = this.ticketsSubject.value;
        const filteredTickets = currentTickets.filter(ticket => ticket.id !== id);
        this.ticketsSubject.next(filteredTickets);
        this.totalCount.update(count => count - 1);
        if (this.selectedTicket()?.id === id) {
          this.selectedTicket.set(null);
        }
        this.loadingSubject.next(false);
      })
    );
  }

  assignTicket(ticketId: string, userId: string): Observable<Ticket> {
    return this.updateTicket(ticketId, { assignedTo: userId });
  }

  changeTicketStatus(ticketId: string, status: Ticket['status']): Observable<Ticket> {
    const updates: Partial<Ticket> = { status };
    if (status === 'resolved') {
      updates.resolvedAt = new Date();
    }
    return this.updateTicket(ticketId, updates);
  }

  getTicketsByStatus(status: Ticket['status']): Observable<Ticket[]> {
    return this.getTickets({ status }).pipe(map(response => response.tickets));
  }

  getAssignedTickets(userId: string): Observable<Ticket[]> {
    return this.getTickets({ assignedTo: userId }).pipe(map(response => response.tickets));
  }

  searchTickets(query: string): Observable<Ticket[]> {
    return this.getTickets({ search: query }).pipe(map(response => response.tickets));
  }

  clearState(): void {
    this.ticketsSubject.next([]);
    this.selectedTicket.set(null);
    this.totalCount.set(0);
    this.loadingSubject.next(false);
  }

  private buildQueryParams(filter: TicketFilter): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value.toString();
      }
    });
    return params;
  }

  getTicketStats(): Observable<{
    total: number;
    pending: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  }> {
    return this.http.get<any>(`${this.baseUrl}/stats`).pipe(
      catchError(error => {
        console.error('Error fetching ticket stats:', error);
        return of({
          total: 0,
          pending: 0,
          open: 0,
          inProgress: 0,
          resolved: 0,
          closed: 0
        });
      })
    );
  }

  // 🆕 Dashboard Metrics Endpoints

  getTicketsByDepartment(): Observable<{ department: string; ticket_count: number }[]> {
    return this.http.get<any[]>(`${this.dashboardUrl}/tickets-by-department`).pipe(
      catchError(error => {
        console.error('Error fetching tickets by department:', error);
        return of([]);
      })
    );
  }

  getTicketsByType(): Observable<{ type: string; count: number }[]> {
    return this.http.get<any[]>(`${this.dashboardUrl}/tickets-by-type`).pipe(
      catchError(error => {
        console.error('Error fetching tickets by type:', error);
        return of([]);
      })
    );
  }

  getTopCreators(): Observable<{ creator: string; tickets_created: number }[]> {
    return this.http.get<any[]>(`${this.dashboardUrl}/top-creators`).pipe(
      catchError(error => {
        console.error('Error fetching top creators:', error);
        return of([]);
      })
    );
  }

  getCRMStats(): Observable<{
    active_customers: number;
    total_contacts: number;
    active_departments: number;
  }> {
    return this.http.get<any>(`${this.dashboardUrl}/crm-stats`).pipe(
      catchError(error => {
        console.error('Error fetching CRM stats:', error);
        return of({
          active_customers: 0,
          total_contacts: 0,
          active_departments: 0
        });
      })
    );
  }
}
