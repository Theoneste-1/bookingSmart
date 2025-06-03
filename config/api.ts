
import { UserRole } from "../types/auth";

export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REFRESH_TOKEN: "/auth/refresh-token",
    ME: "/auth/me",
  },

  // User endpoints
  USER: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
  },

  // Professional endpoints
  PROFESSIONAL: {
    PROFILE: "/professionals/profile",
    SERVICES: "/professionals/services",
    AVAILABILITY: "/professionals/availability",
    BOOKINGS: "/professionals/bookings",
    REVIEWS: "/professionals/reviews",
    EARNINGS: "/professionals/earnings",
    CATEGORIES: "/categories",
    AVAILABILITIES: "/availability",
    CREATE: "/professionals"
  },

  // Client endpoints
  CLIENT: {
    PROFILE: "/clients/profile",
    BOOKINGS: "/clients/bookings",
    REVIEWS: "/clients/reviews",
    PAYMENTS: "/clients/payments",
  },

  // Admin endpoints
  ADMIN: {
    USERS: "/admin/users",
    PROFESSIONALS: "/admin/professionals",
    BOOKINGS: "/admin/bookings",
    PAYMENTS: "/admin/payments",
    REPORTS: "/admin/reports",
    REVIEWS: "/admin/reviews",
    SETTINGS: "/admin/settings",
  },

  // Common endpoints
  COMMON: {
    SERVICES: "/services",
    CATEGORIES: "/categories",
    REVIEWS: "/reviews",
    NOTIFICATIONS: "/notifications",
    BOOKINGS: "/bookings",
  },
};

export const ROLE_BASED_ROUTES = {
  [UserRole.ROLE_USER]: "/client",
  [UserRole.ROLE_ADMIN]: "/admin",
  [UserRole.ROLE_SUPPORT]: "/support",
  [UserRole.ROLE_SYSTEM_ADMIN]: "/system-admin",
};

export const DEFAULT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const UNAUTHORIZED_ROUTE = "/unauthorized";
export const NOT_FOUND_ROUTE = "/404";
