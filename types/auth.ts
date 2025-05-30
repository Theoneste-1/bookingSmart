import { Appointment, Review, Payment } from "./models";

export enum UserRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_SUPPORT = "ROLE_SUPPORT",
  CLIENT = "CLIENT",
  ROLE_SYSTEM_ADMIN = "ROLE_SYSTEM_ADMIN",
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  agreedToTerms: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  agreedToTerms: boolean;
  address?: string;
  preferredLanguage?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  password: string;
}

export interface EmailVerification {
  token: string;
}

export interface ClientProfile extends User {
  address: string;
  preferredLanguage: string;
  appointments: Appointment[];
  reviews: Review[];
  payments: Payment[];
}
