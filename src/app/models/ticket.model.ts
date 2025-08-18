export interface Ticket {
  id: string;
  key: string; // e.g., "#838819"
  subject: string;
  description: string;
  type: 'General Inquiry' | 'Award Progression' | 'Certificate Request' | 'Registration Issue' | 'Complaint or Grievance' | 'Technical Support';
  department: 'Admin' | 'ICT' | 'Finance' | 'Program Management' | 'Customer Service';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'open' | 'in_progress' | 'resolved' | 'closed';
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  attachments?: string[];
}

export interface CreateTicketRequest {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  description: string;
  type: Ticket['type'];
  department: Ticket['department'];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: File[];
}

export interface TicketListResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
}