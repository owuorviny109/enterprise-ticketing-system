export interface Ticket {
  id: string;
  key: string; // Auto-generated ticket key like #838819
  subject: string;
  description: string;
  type: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'open' | 'in_progress' | 'resolved' | 'closed';
  department: string;
  customerId?: string;
  assignedTo?: string;
  attachments?: File[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface CreateTicketRequest {
  // Personal info (public mode only)
  firstName?: string;
  lastName?: string;
  email?: string;
  
  // Ticket details
  subject: string;
  ticketType: string;
  department: string;
  requestDetails: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string;
  attachments?: File[];
  agreeToTerms?: boolean;
}

export interface TicketCreateResponse {
  success: boolean;
  ticket?: Ticket;
  message?: string;
  error?: string;
}

export interface TicketListResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
}