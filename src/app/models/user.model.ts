import { UserRole } from '../config/roles.enum';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  country?: string;
  role: UserRole;
  photoUrl?: string;
  organizationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  country?: string;
  password: string;
  role: UserRole;
  photo?: File;
}