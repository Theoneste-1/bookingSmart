'use client';

import { ReactNode } from 'react';
import { useRoleGuard } from './role-guard';
import { Loader2 } from 'lucide-react';

type UserRole = 'Admin' | 'Client' |'SuperAdmin'

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectPath?: string;
};

export function RoleGuard({
  children,
  allowedRoles,
  redirectPath = '/unauthorized',
}: RoleGuardProps) {
  const { isAuthorized, isLoading } = useRoleGuard(allowedRoles, redirectPath);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['Admin']}>{children}</RoleGuard>;
}

export function superAdminGuard({children} : {children: ReactNode}) {
    return <RoleGuard allowedRoles={['SuperAdmin']}>{children}</RoleGuard>
}

export function ClientGuard({children}: {children: ReactNode}) {
    return <RoleGuard allowedRoles={['Client']}>{children}</RoleGuard>
}


