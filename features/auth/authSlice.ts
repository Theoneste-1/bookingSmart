import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, UserRole } from "../../types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateTokens: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  setCredentials,
  setLoading,
  setError,
  logout,
  updateUser,
  updateTokens,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUserRole = (state: { auth: AuthState }) =>
  state.auth.user?.role;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refreshToken;

// Role-based selectors
export const selectIsAdmin = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.ROLE_ADMIN;
export const selectIsSystemAdmin = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.ROLE_SYSTEM_ADMIN;
export const selectIsSupport = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.ROLE_SUPPORT;
export const selectIsUser = (state: { auth: AuthState }) =>
  state.auth.user?.role === UserRole.ROLE_USER;

export default authSlice.reducer;
