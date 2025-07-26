import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  searchTerm = '';
  selectedType = '';
  selectedCategory = '';
  selectedDepartment = '';
  selectedPriority = '';
  selectedStatus = '';
  selectedAssignee = '';

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
}