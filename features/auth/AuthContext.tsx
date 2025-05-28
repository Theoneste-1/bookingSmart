'use client';
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearTokens, getUserRole } from './authUtil'
import type { TokenResponse } from '@/types/dto/authDto';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userRoleData: any | null;
  login: (tokens: TokenResponse, userData?: any) => void;
  logout: () => void;
  checkAuth: () => boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userRoleData, setUserRoleData] = useState<any | null>(null);
  const [decodedJwtUser, setDecodedJwtUser] = useState<any | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // Direct check for token in localStorage
  const checkAuth = (): boolean => {
    if (typeof window === 'undefined') return false;


    const token = localStorage.getItem('access_token');
    if (!token) return false;

    return true;
  };

  // Check authentication status on mount and when window focuses
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const isAuth = checkAuth();
        setAuthenticated(isAuth);


        if (isAuth) {
          // Extract user info from token if available
          const token = localStorage.getItem("access_token");
          const roleData = getUserRole();
          if (roleData && roleData.role_name) {
            setUserRoleData(roleData);
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        console.error('Authentication check failed:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // Check auth immediately
    checkAuthStatus();


    // Also check when window gets focus (useful for token expiry)
    const handleFocus = () => {
      checkAuthStatus();
    };


    window.addEventListener('focus', handleFocus);


    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const login = (tokens: TokenResponse, userRoleData?: any) => {
    setAuthenticated(true);
    if (userRoleData) {
      setUserRoleData(userRoleData);
    }
  };

  const logout = () => {
    clearTokens();
    setAuthenticated(false);
    setDecodedJwtUser(null);
    setUserRoleData(null);
    router.push('/auth/login');
  };

  const value = {
    isAuthenticated: authenticated,
    loading,
    decodedJwtUser,
    userRoleData,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Double-check authentication directly from localStorage
    const isAuthLocal = checkAuth();


    if (!loading && !isAuthenticated && !isAuthLocal) {
      router.push('/auth/login');
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router, checkAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

