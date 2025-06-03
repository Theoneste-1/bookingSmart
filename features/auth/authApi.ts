import { baseApi } from "@/features/api/rtk";
import type { TokenResponse } from "@/types/dto/authDto";
import type { ApiResponse } from "@/types/api";

// Define request types based on the auth guide
interface SignInRequest {
  emailOrUsername: string;
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
  username: string;
  refreshToken: string;
}


interface LoginResponse {
  username: string;
  token: string;
  refreshToken: string;
  role: string;
}


// Define response types
interface OtpResponse {
  statusCode: number;
  message: string;
}

interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  isAgreedToTerms: boolean;
}

const _enhancedAuthApi = baseApi.enhanceEndpoints({
  addTagTypes: ["Auth"],
});

// Inject endpoints into the base API
export const authApi = _enhancedAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, SignInRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username: credentials.emailOrUsername,
          password: credentials.password,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation<ApiResponse<String>, SignUpRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      TokenResponse & { role_name: string; role_id: string },
      VerifyOtpRequest
    >({
      query: (verifyData) => ({
        url: "/users/verify-otp",
        method: "POST",
        body: verifyData,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgetPassword: builder.mutation<
      ApiResponse<OtpResponse>,
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/users/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      ApiResponse<OtpResponse>,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/users/reset-password",
        method: "PUT",
        body: {
          token: data.token,
          email: data.email,
          newPassword: data.newPassword,
        },
      }),
    }),

    refreshToken: builder.mutation<TokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: "/users/refresh-token",
        method: "POST",
        body: data,
      }),
    }),

    confirmEmail: builder.mutation<
      ApiResponse<OtpResponse>,
      { userId: string }
    >({
      query: (data) => ({
        url: `/users/confirm-registration/${data.userId}`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: true,
});

// Export hooks for usage in functional components
export const {
  useSignInMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useConfirmEmailMutation,
  useSignupMutation,
} = authApi;
