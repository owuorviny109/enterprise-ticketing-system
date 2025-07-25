import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Dashboard Component
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <div class="breadcrumb">
          <span>🏠</span>
          <span>/</span>
          <span>Dashboard</span>
        </div>
      </div>

      <!-- Metrics Cards -->
      <div class="metrics-grid">
        <div *ngFor="let metric of metrics" class="metric-card" [style.background-color]="metric.bgColor">
          <div class="metric-content">
            <div class="metric-header">
              <h3>{{ metric.title }}</h3>
              <div class="metric-icon" [style.color]="metric.color">📊</div>
            </div>
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-percentage" [style.color]="metric.color">{{ metric.percentage }}</div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-row">
          <!-- Ticket by Department -->
          <div class="chart-card">
            <h3>Ticket by department</h3>
            <div class="pie-chart-container">
              <div class="pie-chart">
                <div class="pie-slice" style="background: conic-gradient(#6f42c1 0deg 116deg, #17a2b8 116deg 236deg, #ffc107 236deg 311deg, #dc3545 311deg 360deg);"></div>
              </div>
              <div class="chart-legend">
                <div *ngFor="let item of departmentData" class="legend-item">
                  <div class="legend-color" [style.background-color]="item.color"></div>
                  <span>{{ item.name }} {{ item.percentage }}% ({{ Math.round(item.percentage * 24 / 100) }})</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ticket by Type -->
          <div class="chart-card">
            <h3>Ticket by type</h3>
            <div class="pie-chart-container">
              <div class="pie-chart">
                <div class="pie-slice" style="background: conic-gradient(#6f42c1 0deg 165deg, #17a2b8 165deg 270deg, #28a745 270deg 330deg, #ffc107 330deg 345deg, #dc3545 345deg 360deg);"></div>
              </div>
              <div class="chart-legend">
                <div *ngFor="let item of ticketTypeData" class="legend-item">
                  <div class="legend-color" [style.background-color]="item.color"></div>
                  <span>{{ item.name }} {{ item.percentage }}% ({{ Math.round(item.percentage * 24 / 100) }})</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Ticket Creator -->
          <div class="chart-card">
            <h3>Top ticket creator</h3>
            <div class="pie-chart-container">
              <div class="pie-chart">
                <div class="pie-slice" style="background: conic-gradient(#6f42c1 0deg 194deg, #17a2b8 194deg 277deg, #28a745 277deg 360deg);"></div>
              </div>
              <div class="chart-legend">
                <div *ngFor="let item of topCreators" class="legend-item">
                  <div class="legend-color" [style.background-color]="item.color"></div>
                  <span>{{ item.name }} {{ item.percentage }}% ({{ Math.round(item.percentage * 13 / 100) }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="bottom-section">
          <!-- Ticket History -->
          <div class="chart-card ticket-history">
            <h3>Ticket history</h3>
            <p class="chart-subtitle">This month: last month 0</p>
            <div class="bar-chart">
              <div class="bar-chart-container">
                <div *ngFor="let data of monthlyData" class="bar-item">
                  <div class="bar" [style.height.px]="data.tickets * 5" [style.background-color]="data.tickets > 0 ? '#6f42c1' : '#e9ecef'"></div>
                  <span class="bar-label">{{ data.month }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Times and Stats -->
          <div class="stats-section">
            <div class="stat-card">
              <h3>First Response Time</h3>
              <div class="response-time">
                <span class="time-value">{{ firstResponseTime.hours }}</span>
                <span class="time-unit">hours</span>
              </div>
            </div>

            <div class="stat-card">
              <h3>Last Response Time</h3>
              <div class="countdown">
                <div class="countdown-item">
                  <span class="countdown-value">{{ lastResponseTime.days }}</span>
                  <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value">{{ lastResponseTime.hours }}</span>
                  <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value">{{ lastResponseTime.minutes }}</span>
                  <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value">{{ lastResponseTime.seconds }}</span>
                  <span class="countdown-label">Seconds</span>
                </div>
              </div>
            </div>

            <div class="stat-card">
              <h3>CUSTOMERS</h3>
              <div class="customer-count">
                <span class="count-value">{{ customers }}</span>
                <div class="count-icon">👥</div>
              </div>
            </div>

            <div class="stat-card">
              <h3>CONTACTS</h3>
              <div class="contact-count">
                <span class="count-value">{{ contacts }}</span>
                <div class="count-icon">📞</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 0; }
    .dashboard-header { margin-bottom: 30px; }
    .dashboard-header h1 { font-size: 24px; font-weight: 600; color: #495057; margin: 0 0 5px 0; }
    .breadcrumb { color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .metric-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    .metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .metric-header h3 { font-size: 12px; font-weight: 600; color: #6c757d; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .metric-icon { font-size: 20px; }
    .metric-value { font-size: 32px; font-weight: 700; color: #495057; margin-bottom: 5px; }
    .metric-percentage { font-size: 14px; font-weight: 600; }
    .charts-section { background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    .chart-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 30px; }
    .chart-card { text-align: center; }
    .chart-card h3 { font-size: 16px; font-weight: 600; color: #495057; margin-bottom: 20px; }
    .pie-chart-container { display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .pie-chart { width: 150px; height: 150px; }
    .pie-slice { width: 100%; height: 100%; border-radius: 50%; }
    .chart-legend { display: flex; flex-direction: column; gap: 8px; text-align: left; }
    .legend-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #495057; }
    .legend-color { width: 12px; height: 12px; border-radius: 2px; }
    .bottom-section { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
    .ticket-history { text-align: left; }
    .chart-subtitle { color: #6c757d; font-size: 14px; margin-bottom: 20px; }
    .bar-chart-container { display: flex; align-items: end; gap: 15px; height: 150px; padding: 20px 0; }
    .bar-item { display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 1; }
    .bar { width: 20px; min-height: 5px; border-radius: 2px; transition: all 0.3s ease; }
    .bar-label { font-size: 12px; color: #6c757d; }
    .stats-section { display: grid; grid-template-columns: 1fr; gap: 20px; }
    .stat-card { background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; }
    .stat-card h3 { font-size: 12px; font-weight: 600; color: #6c757d; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .response-time { display: flex; flex-direction: column; align-items: center; }
    .time-value { font-size: 36px; font-weight: 700; color: #495057; }
    .time-unit { font-size: 14px; color: #6c757d; }
    .countdown { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
    .countdown-item { display: flex; flex-direction: column; align-items: center; min-width: 40px; }
    .countdown-value { font-size: 20px; font-weight: 700; color: #495057; }
    .countdown-label { font-size: 10px; color: #6c757d; text-transform: uppercase; }
    .customer-count, .contact-count { display: flex; align-items: center; justify-content: center; gap: 15px; }
    .count-value { font-size: 36px; font-weight: 700; color: #495057; }
    .count-icon { font-size: 24px; color: #6c757d; }
  `]
})
export class DashboardComponent {
  Math = Math;

  metrics = [
    { title: 'NEW TICKETS', value: '0', percentage: '0%', color: '#17a2b8', bgColor: '#e8f4f8' },
    { title: 'OPEN TICKETS', value: '22', percentage: '91%', color: '#6f42c1', bgColor: '#f3e8ff' },
    { title: 'CLOSED TICKETS', value: '2', percentage: '8%', color: '#28a745', bgColor: '#e8f5e8' },
    { title: 'UNASSIGNED TICKETS', value: '18', percentage: '75%', color: '#6f42c1', bgColor: '#f3e8ff' }
  ];

  departmentData = [
    { name: 'Admin', percentage: 32.33, color: '#6f42c1' },
    { name: 'ICT', percentage: 33.33, color: '#17a2b8' },
    { name: 'Finance', percentage: 20.83, color: '#ffc107' },
    { name: 'Program Management', percentage: 12.5, color: '#dc3545' }
  ];

  ticketTypeData = [
    { name: 'General Inquiry', percentage: 45.83, color: '#6f42c1' },
    { name: 'Award Progression', percentage: 29.17, color: '#17a2b8' },
    { name: 'Certificate Request', percentage: 16.67, color: '#28a745' },
    { name: 'Registration Issue', percentage: 4.17, color: '#ffc107' },
    { name: 'Complaint or Grievance', percentage: 4.17, color: '#dc3545' }
  ];

  topCreators = [
    { name: 'access', percentage: 53.85, color: '#6f42c1' },
    { name: 'Ivy Rose Arthur', percentage: 23.08, color: '#17a2b8' },
    { name: 'bryson igadwa', percentage: 23.08, color: '#28a745' }
  ];

  firstResponseTime = { hours: 44 };
  lastResponseTime = { days: 1, hours: 6, minutes: 22, seconds: 59 };
  customers = 30;
  contacts = 1;

  monthlyData = [
    { month: 'Jul', tickets: 0 }, { month: 'Aug', tickets: 24 }, { month: 'Sep', tickets: 0 },
    { month: 'Oct', tickets: 0 }, { month: 'Nov', tickets: 0 }, { month: 'Dec', tickets: 0 },
    { month: 'Jan', tickets: 0 }, { month: 'Feb', tickets: 0 }, { month: 'Mar', tickets: 0 },
    { month: 'Apr', tickets: 0 }, { month: 'May', tickets: 0 }, { month: 'Jun', tickets: 0 }
  ];
}

// Tickets Component
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tickets-page">
      <div class="page-header">
        <h1>Tickets</h1>
        <div class="breadcrumb">
          <span>🏠</span>
          <span>/</span>
          <span>Tickets</span>
        </div>
      </div>

      <div class="tickets-container">
        <!-- Search and Actions -->
        <div class="search-section">
          <div class="search-left">
            <input 
              type="text" 
              placeholder="Search..." 
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              class="search-input"
            >
            <button class="reset-btn" (click)="resetFilters()">Reset</button>
          </div>
          
          <div class="search-right">
            <button class="export-btn">📤 EXPORT</button>
            <button class="import-btn">📥 IMPORT</button>
            <select class="items-per-page">
              <option value="10">10</option>
            </select>
            <button class="new-ticket-btn">New Ticket</button>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters-section">
          <div class="filter-label">Filter Ticket By:</div>
          <div class="filters-row">
            <select [(ngModel)]="selectedType" class="filter-select">
              <option value="">Type</option>
              <option value="Bug Report">Bug Report</option>
            </select>
            <select [(ngModel)]="selectedCategory" class="filter-select">
              <option value="">Category</option>
            </select>
            <select [(ngModel)]="selectedDepartment" class="filter-select">
              <option value="">Department</option>
            </select>
            <select [(ngModel)]="selectedPriority" class="filter-select">
              <option value="">Priority</option>
              <option value="Less Urgent">Less Urgent</option>
            </select>
            <select [(ngModel)]="selectedStatus" class="filter-select">
              <option value="">Status</option>
              <option value="Pending">Pending</option>
            </select>
            <select [(ngModel)]="selectedAssignee" class="filter-select">
              <option value="">Assign To</option>
            </select>
          </div>
        </div>

        <!-- Tickets Table -->
        <div class="table-container">
          <table class="tickets-table">
            <thead>
              <tr>
                <th>Key ↕</th>
                <th>Subject</th>
                <th>Priority ↕</th>
                <th>Status ↕</th>
                <th>Date ↕</th>
                <th>Updated ↕</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ticket of filteredTickets" class="ticket-row">
                <td class="ticket-key">{{ ticket.key }}</td>
                <td class="ticket-subject">
                  <div class="subject-content">
                    <div class="subject-title">{{ ticket.subject }}</div>
                    <div class="subject-meta">
                      <span class="author">by {{ ticket.author }}</span>
                      <span *ngIf="ticket.assignee" class="assignee">👤 {{ ticket.assignee }}</span>
                    </div>
                  </div>
                </td>
                <td class="ticket-priority">
                  <span *ngIf="ticket.priority" class="priority-badge">{{ ticket.priority }}</span>
                </td>
                <td class="ticket-status">
                  <span class="status-badge">{{ ticket.status }}</span>
                </td>
                <td class="ticket-date">{{ ticket.date }}</td>
                <td class="ticket-updated">{{ ticket.updated }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-section">
          <div class="pagination-info">
            <button class="pagination-btn">« Previous</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="pagination-btn">Next »</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tickets-page { padding: 0; }
    .page-header { margin-bottom: 30px; }
    .page-header h1 { font-size: 24px; font-weight: 600; color: #495057; margin: 0 0 5px 0; }
    .breadcrumb { color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px; }
    .tickets-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .search-section { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e9ecef; }
    .search-left { display: flex; align-items: center; gap: 15px; }
    .search-input { padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; width: 250px; }
    .reset-btn, .export-btn, .import-btn, .new-ticket-btn { padding: 8px 16px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; }
    .reset-btn { background: #6c757d; color: white; }
    .export-btn, .import-btn { background: #17a2b8; color: white; }
    .new-ticket-btn { background: #6f42c1; color: white; }
    .search-right { display: flex; align-items: center; gap: 15px; }
    .items-per-page { padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; }
    .filters-section { padding: 20px; background: #f8f9fa; border-bottom: 1px solid #e9ecef; }
    .filter-label { font-weight: 600; color: #495057; margin-bottom: 15px; }
    .filters-row { display: flex; gap: 15px; flex-wrap: wrap; }
    .filter-select { padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 14px; min-width: 120px; }
    .table-container { overflow-x: auto; }
    .tickets-table { width: 100%; border-collapse: collapse; }
    .tickets-table th { background: #f8f9fa; padding: 15px; text-align: left; font-weight: 600; color: #495057; border-bottom: 1px solid #e9ecef; font-size: 14px; }
    .ticket-row { border-bottom: 1px solid #e9ecef; transition: background-color 0.2s ease; }
    .ticket-row:hover { background: #f8f9fa; }
    .tickets-table td { padding: 15px; vertical-align: top; }
    .ticket-key { font-weight: 600; color: #6f42c1; font-size: 14px; }
    .subject-content { display: flex; flex-direction: column; gap: 5px; }
    .subject-title { font-weight: 500; color: #495057; font-size: 14px; }
    .subject-meta { display: flex; gap: 15px; font-size: 12px; color: #6c757d; }
    .assignee { color: #6f42c1; }
    .priority-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #fff3cd; color: #856404; }
    .status-badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #f8d7da; color: #721c24; }
    .pagination-section { padding: 20px; border-top: 1px solid #e9ecef; }
    .pagination-info { display: flex; justify-content: center; align-items: center; gap: 10px; }
    .pagination-btn, .page-btn { padding: 8px 12px; background: white; border: 1px solid #ced4da; border-radius: 4px; color: #6c757d; cursor: pointer; font-size: 14px; }
    .page-btn.active { background: #6f42c1; color: white; border-color: #6f42c1; }
  `]
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