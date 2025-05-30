import { TokenResponse } from '@/types/dto/authDto';
import Cookies from 'js-cookie';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_ID_KEY = 'user_id';
export const USER_ROLE_KEY = 'user_role';
export const USER_NAME_KEY = 'user_name'


export const saveTokens = (tokens: TokenResponse, userId?: string): void => {
  if (typeof window === 'undefined') return;

  // Save to localStorage
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);

  if (userId) {
    localStorage.setItem(USER_ID_KEY, userId);
    Cookies.set(USER_ID_KEY, userId, { path: "/" });
  }
};
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () : string | null => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const getUsername = () : string | null => {
  if(typeof window === 'undefined') return null
  return localStorage.getItem(USER_NAME_KEY)
}


export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;

  // Clear localStorage
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);

  // Clear cookies
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
  Cookies.remove(USER_ID_KEY, { path: "/" });
};

/**
 * Checks if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};


export const saveUserRole = ({
  role_name,
}: {
  role_name: string;
}) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(USER_ROLE_KEY, JSON.stringify({ role_name }));
};

export const getUserRole = () => {
  if (typeof window === 'undefined') return;
  return JSON.parse(localStorage.getItem(USER_ROLE_KEY) || '{}');
};

export const clearUserData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_ROLE_KEY);
};
