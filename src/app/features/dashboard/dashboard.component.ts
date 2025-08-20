import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../tickets/services/ticket.service';
import { Ticket } from '../tickets/services/ticket.service';

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

  metrics: DashboardMetric[] = [
    { title: 'NEW TICKETS', value: '0', percentage: '0%', color: '#17a2b8', bgColor: '#e8f4f8' },
    { title: 'OPEN TICKETS', value: '0', percentage: '0%', color: '#6f42c1', bgColor: '#f3e8ff' },
    { title: 'CLOSED TICKETS', value: '0', percentage: '0%', color: '#28a745', bgColor: '#e8f5e8' },
    { title: 'UNASSIGNED TICKETS', value: '0', percentage: '0%', color: '#6f42c1', bgColor: '#f3e8ff' }
  ];

  departmentData: ChartData[] = [];
  ticketTypeData: ChartData[] = [];
  topCreators: ChartData[] = [];

  totalTickets = 0;
  customers = 0;
  contacts = 0;
  departments = 0;
  loading = true;

  private chartColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    // Load ticket summary stats
    this.ticketService.getTicketStats().subscribe({
      next: (stats) => {
        this.updateMetrics(stats);
        this.totalTickets = stats.total || 0;
      },
      error: (err) => console.error('❌ Ticket stats error:', err)
    });

    // Load tickets by department
    this.ticketService.getTicketsByDepartment().subscribe({
      next: (data) => {
        this.departmentData = this.mapChartData(data, 'department', 'ticket_count');
      },
      error: (err) => console.error('❌ Department data error:', err)
    });

    // Load tickets by type
    this.ticketService.getTicketsByType().subscribe({
      next: (data) => {
        this.ticketTypeData = this.mapChartData(data, 'type', 'count');
      },
      error: (err) => console.error('❌ Type data error:', err)
    });

    // Load top creators
    this.ticketService.getTopCreators().subscribe({
      next: (data) => {
        this.topCreators = this.mapChartData(data, 'creator', 'tickets_created', 5);
      },
      error: (err) => console.error('❌ Creator data error:', err)
    });

    // Load CRM stats
    this.ticketService.getCRMStats().subscribe({
      next: (stats) => {
        this.customers = stats.active_customers || 0;
        this.contacts = stats.total_contacts || 0;
        this.departments = stats.active_departments || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ CRM stats error:', err);
        this.loading = false;
      }
    });
  }

  private updateMetrics(stats: any) {
    const total = stats.total || 0;

    this.metrics = [
      {
        title: 'NEW TICKETS',
        value: (stats.pending || 0).toString(),
        percentage: total ? Math.round((stats.pending / total) * 100) + '%' : '0%',
        color: '#17a2b8',
        bgColor: '#e8f4f8'
      },
      {
        title: 'OPEN TICKETS',
        value: (stats.open || 0).toString(),
        percentage: total ? Math.round((stats.open / total) * 100) + '%' : '0%',
        color: '#6f42c1',
        bgColor: '#f3e8ff'
      },
      {
        title: 'CLOSED TICKETS',
        value: (stats.closed || 0).toString(),
        percentage: total ? Math.round((stats.closed / total) * 100) + '%' : '0%',
        color: '#28a745',
        bgColor: '#e8f5e8'
      },
      {
        title: 'UNASSIGNED TICKETS',
        value: (total - (stats.closed || 0)).toString(),
        percentage: total ? Math.round(((total - stats.closed) / total) * 100) + '%' : '0%',
        color: '#6f42c1',
        bgColor: '#f3e8ff'
      }
    ];
  }

  private mapChartData(data: any[], labelKey: string, valueKey: string, limit: number = 10): ChartData[] {
    const total = data.reduce((sum, item) => sum + item[valueKey], 0);
    return data.slice(0, limit).map((item, index) => ({
      name: item[labelKey] || 'Unknown',
      count: item[valueKey],
      percentage: total ? Math.round((item[valueKey] / total) * 100) : 0,
      color: this.chartColors[index % this.chartColors.length]
    }));
  }

  calculateStrokeDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 60;
    const strokeLength = (percentage / 100) * circumference;
    const gapLength = circumference - strokeLength;
    return `${strokeLength} ${gapLength}`;
  }

  calculateStrokeDashOffset(startPercentage: number): number {
    const circumference = 2 * Math.PI * 60;
    return -(startPercentage / 100) * circumference;
  }

  getCumulativePercentage(data: ChartData[], index: number): number {
    return data.slice(0, index).reduce((sum, item) => sum + item.percentage, 0);
  }
}
