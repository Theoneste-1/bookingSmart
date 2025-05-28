import { baseApi } from '@/features/api/rtk';
import type { TokenResponse } from '@/types/dto/authDto';
import type { ApiResponse } from '@/types/api';

// Define request types based on the auth guide
interface SignInRequest {
  email: string;
  password: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface ForgetPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  email: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  email: string;
}

interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

// Define response types
interface OtpResponse {
  statusCode: number;
  message: string;
}

const _enhancedAuthApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Auth'],
});

// Inject endpoints into the base API
export const authApi = _enhancedAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ApiResponse<OtpResponse>, SignInRequest>({
      query: (credentials) => ({
        url: '/users/signin',
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyOtp: builder.mutation<
      TokenResponse & { role_name: string; role_id: string },
      VerifyOtpRequest
    >({
      query: (verifyData) => ({
        url: '/users/verify-otp',
        method: 'POST',
        body: verifyData,
      }),
      invalidatesTags: ['Auth'],
    }),

    forgetPassword: builder.mutation<ApiResponse<OtpResponse>, ForgetPasswordRequest>({
      query: (data) => ({
        url: '/users/forget-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<OtpResponse>, ResetPasswordRequest>({
      query: (data) => ({
        url: '/users/reset-password',
        method: 'PUT',
        body: {
          token: data.token,
          email: data.email,
          newPassword: data.newPassword,
        },
      }),
    }),

    refreshToken: builder.mutation<TokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: '/users/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),

    confirmEmail: builder.mutation<ApiResponse<OtpResponse>, { userId: string }>({
      query: (data) => ({
        url: `/users/confirm-registration/${data.userId}`,
        method: 'PUT',
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useSignInMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useConfirmEmailMutation,
} = authApi;
