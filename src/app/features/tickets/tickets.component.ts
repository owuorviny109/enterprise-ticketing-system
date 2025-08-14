import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Main tickets list page for admin dashboard
 * Shows all tickets with filtering and search capabilities
 */
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  private router = inject(Router);
  
  // Filter properties
  searchTerm = '';
  selectedType = '';
  selectedCategory = '';
  selectedDepartment = '';
  selectedPriority = '';
  selectedStatus = '';
  selectedAssignee = '';

  // Mock ticket data - replace with API call when backend is ready
  tickets = [
    { key: '#838819', subject: 'How to rejoin the scheme in university', author: 'Ivy Rose Arthur', assignee: 'Mirko Binger', priority: '', status: 'Pending', date: '6 months ago', updated: '13 days ago' },
    { key: '#708842', subject: 'wifi issue', author: 'Emmanuel Oginga', assignee: 'Emmanuel Ogilo', priority: '', status: 'Pending', date: '18 days ago', updated: '13 days ago' },
    { key: '#177456', subject: 'Wireless Issue', author: 'Emmanuel Oginga', assignee: '', priority: '', status: 'Pending', date: '18 days ago', updated: '18 days ago' },
    { key: '#233203', subject: 'Orb login', author: 'bryson igadwa', assignee: '', priority: 'Less Urgent', status: 'Pending', date: '18 days ago', updated: '18 days ago' }
  ];

  filteredTickets = [...this.tickets];

  applyFilters() {
    this.filteredTickets = this.tickets.filter(ticket => {
      const matchesSearch = !this.searchTerm || ticket.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || ticket.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || ticket.priority === this.selectedPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedCategory = '';
    this.selectedDepartment = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
    this.selectedAssignee = '';
    this.filteredTickets = [...this.tickets];
  }

  /**
   * Navigate to ticket creation form
   * Currently redirects to public contact form - users can create tickets regardless of login status
   */
  navigateToCreateTicket() {
    this.router.navigate(['/contact']);
  }
}