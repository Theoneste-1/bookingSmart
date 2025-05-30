'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
  selectIsLoading,
} from "../../features/auth/authSlice";
import { UserRole } from "../../types/auth";
import {
  ROLE_BASED_ROUTES,
  LOGIN_ROUTE,
  UNAUTHORIZED_ROUTE,
} from "../../config/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo || LOGIN_ROUTE);
      return;
    }

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      router.push(UNAUTHORIZED_ROUTE);
      return;
    }

    // If authenticated and no specific role is required, redirect to role-based home
    if (isAuthenticated && userRole && !redirectTo) {
      const roleBasedRoute = ROLE_BASED_ROUTES[userRole];
      if (roleBasedRoute && window.location.pathname === "/") {
        router.push(roleBasedRoute);
      }
    }
  }, [isAuthenticated, userRole, allowedRoles, router, redirectTo, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
