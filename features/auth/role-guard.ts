import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

type UserRole = 'Admin' | 'SuperAdmin' | 'Client'

export const useRoleGuard = (
  allowedRoles: UserRole[],
  redirectPath = '/unauthorized',
) => {
  const { userRoleData, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!userRoleData) return;
    const hasRequiredRole = allowedRoles.some(
      (role) => userRoleData.role_name?.toLowerCase() === role.toLowerCase(),
    );
    if (!hasRequiredRole) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, userRoleData, loading, allowedRoles, router, redirectPath]);

  const isAuthorized = userRoleData
    ? allowedRoles.some(
        (role) => userRoleData.role_name?.toLowerCase() === role.toLowerCase(),
      )
    : false;

  return {
    isAuthorized,
    isLoading: loading || !userRoleData,
    userRole: userRoleData?.role_name as UserRole | undefined,
  };
};
