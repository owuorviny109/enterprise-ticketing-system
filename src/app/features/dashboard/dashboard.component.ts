import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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