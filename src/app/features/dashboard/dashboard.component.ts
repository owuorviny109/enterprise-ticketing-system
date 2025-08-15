import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../tickets/services/ticket.service';
import { Ticket } from '../../../models/ticket.model';

interface DashboardMetric {
  title: string;
  value: string;
  percentage: string;
  color: string;
  bgColor: string;
}

interface ChartData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private ticketService = inject(TicketService);
  Math = Math;

  // Dashboard metrics
  metrics: DashboardMetric[] = [
    { title: 'NEW TICKETS', value: '0', percentage: '0%', color: '#17a2b8', bgColor: '#e8f4f8' },
    { title: 'OPEN TICKETS', value: '0', percentage: '0%', color: '#6f42c1', bgColor: '#f3e8ff' },
    { title: 'CLOSED TICKETS', value: '0', percentage: '0%', color: '#28a745', bgColor: '#e8f5e8' },
    { title: 'UNASSIGNED TICKETS', value: '0', percentage: '0%', color: '#6f42c1', bgColor: '#f3e8ff' }
  ];

  // Chart data
  departmentData: ChartData[] = [];
  ticketTypeData: ChartData[] = [];
  topCreators: ChartData[] = [];

  // Stats
  totalTickets = 0;
  customers = 0;
  contacts = 0;
  loading = true;

  // Colors for charts
  private chartColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];

  ngOnInit() {
    this.loadDashboardData();
  }

  /**
   * Load all dashboard data
   */
  loadDashboardData() {
    this.loading = true;
    
    // Load ticket statistics
    this.ticketService.getTicketStats().subscribe({
      next: (stats) => {
        console.log('📊 Ticket stats loaded:', stats);
        this.updateMetrics(stats);
        this.totalTickets = stats.total || 0;
      },
      error: (error) => {
        console.error('❌ Error loading ticket stats:', error);
      }
    });

    // Load all tickets to analyze by department, type, etc.
    this.ticketService.getTickets({ limit: 1000 }).subscribe({
      next: (response) => {
        console.log('🎫 Tickets loaded for dashboard analysis:', response);
        this.analyzeTicketData(response.tickets);
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error loading tickets:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Update metrics with real data from backend
   */
  private updateMetrics(stats: any) {
    const total = stats.total || 0;
    
    this.metrics = [
      { 
        title: 'NEW TICKETS', 
        value: (stats.pending || 0).toString(), 
        percentage: total > 0 ? Math.round(((stats.pending || 0) / total) * 100) + '%' : '0%', 
        color: '#17a2b8', 
        bgColor: '#e8f4f8' 
      },
      { 
        title: 'OPEN TICKETS', 
        value: (stats.open || 0).toString(), 
        percentage: total > 0 ? Math.round(((stats.open || 0) / total) * 100) + '%' : '0%', 
        color: '#6f42c1', 
        bgColor: '#f3e8ff' 
      },
      { 
        title: 'CLOSED TICKETS', 
        value: (stats.closed || 0).toString(), 
        percentage: total > 0 ? Math.round(((stats.closed || 0) / total) * 100) + '%' : '0%', 
        color: '#28a745', 
        bgColor: '#e8f5e8' 
      },
      { 
        title: 'UNASSIGNED TICKETS', 
        value: ((stats.total || 0) - (stats.closed || 0)).toString(), 
        percentage: total > 0 ? Math.round((((stats.total || 0) - (stats.closed || 0)) / total) * 100) + '%' : '0%', 
        color: '#6f42c1', 
        bgColor: '#f3e8ff' 
      }
    ];
  }

  /**
   * Analyze ticket data for charts
   */
  private analyzeTicketData(tickets: Ticket[]) {
    if (!tickets || tickets.length === 0) {
      this.departmentData = [];
      this.ticketTypeData = [];
      this.topCreators = [];
      return;
    }

    const total = tickets.length;

    // Analyze by department
    const departmentCounts = this.groupBy(tickets, 'department');
    this.departmentData = Object.entries(departmentCounts).map(([dept, count], index) => ({
      name: dept,
      count: count as number,
      percentage: Math.round(((count as number) / total) * 100),
      color: this.chartColors[index % this.chartColors.length]
    }));

    // Analyze by ticket type
    const typeCounts = this.groupBy(tickets, 'type');
    this.ticketTypeData = Object.entries(typeCounts).map(([type, count], index) => ({
      name: type,
      count: count as number,
      percentage: Math.round(((count as number) / total) * 100),
      color: this.chartColors[index % this.chartColors.length]
    }));

    // Analyze top creators (by customer email/name)
    const creatorCounts = this.groupBy(tickets, 'customerId');
    this.topCreators = Object.entries(creatorCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([creator, count], index) => ({
        name: creator === 'anonymous' ? 'Anonymous Users' : creator,
        count: count as number,
        percentage: Math.round(((count as number) / total) * 100),
        color: this.chartColors[index % this.chartColors.length]
      }));

    // Update customer count (unique customers)
    const uniqueCustomers = new Set(tickets.map(t => t.customerId).filter(id => id && id !== 'anonymous'));
    this.customers = uniqueCustomers.size;
    this.contacts = this.customers; // For now, contacts = customers
  }

  /**
   * Group array by property
   */
  private groupBy(array: any[], property: string): { [key: string]: number } {
    return array.reduce((acc, item) => {
      const key = item[property] || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Calculate stroke dash array for pie charts
   */
  calculateStrokeDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 60; // radius = 60
    const strokeLength = (percentage / 100) * circumference;
    const gapLength = circumference - strokeLength;
    return `${strokeLength} ${gapLength}`;
  }

  /**
   * Calculate stroke dash offset for pie charts
   */
  calculateStrokeDashOffset(startPercentage: number): number {
    const circumference = 2 * Math.PI * 60;
    return -(startPercentage / 100) * circumference;
  }

  /**
   * Get cumulative percentage for pie chart positioning
   */
  getCumulativePercentage(data: ChartData[], index: number): number {
    return data.slice(0, index).reduce((sum, item) => sum + item.percentage, 0);
  }
}