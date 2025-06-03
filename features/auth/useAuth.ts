"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSignInMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} from "./authApi";
import {
  saveTokens,
  getUsername,
  getRefreshToken,
  saveUserRole,
  clearTokens,
  clearUserData,
} from "./authUtil";
import { useAuth } from "./AuthContext";

export const useLoginFlow = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [signIn, { isLoading: isSigningIn, error: signInError }] =
    useSignInMutation();
  const [verifyOtp, { isLoading: isVerifying, error: verifyError }] =
    useVerifyOtpMutation();
  const router = useRouter();
  const { login } = useAuth();

  // Step 1: Sign in with email and password
  const handleSignIn = async ({
    emailOrUsername,
    password,
  }: {
    emailOrUsername: string;
    password: string;
  }) => {
    console.log("the data were: ", emailOrUsername, password);
    try {
      const response = await signIn({
        emailOrUsername: emailOrUsername,
        password,
      }).unwrap();

        saveTokens({
        accessToken: response.token,
        refreshToken: response.refreshToken,
      });
      saveUserRole({
        role_name: response.role,
      });
      login({
        accessToken: response.token,
        refreshToken: response.refreshToken,
      });

      setEmail(emailOrUsername);

      // based on the role route him
      if (response.role === "ADMIN") {
        console.log("the response is  also ", response)
        router.push("/admin-dashboard");
      }else if (response.role === "USER") {
        router.push('/client-dashboard')
      }
      // router.push(`/auth/verification?email=${encodeURIComponent(email)}`);
      return response;
    } catch (error) {
      console.error("Failed to sign in:", error);
      console.error("Failed to sign in:", error);
      throw error;
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otpCode: string, email: string) => {
    try {
      const response = await verifyOtp({ email, otp: otpCode }).unwrap();
      // saveTokens({
      //   accessToken: response.accessToken,
      //   refreshToken: response.refreshToken,
      // });
      // saveUserRole({
      //   role_name: response.role
      // });
      // login({
      //   accessToken: response.accessToken,
      //   refreshToken: response.refreshToken,
      // });

      let route = null;
      switch (response.role_name) {
        case "admin":
          route = "/admin";
          break;
        case "focal person":
          route = "/focal-person";
          break;
        case "coordinator":
          route = "/coordinator";
          break;
        case "high authority":
          route = "/high-authority";
          break;
        default:
          route = "/404";
          break;
      }
      router.push(route);

      return response;
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      console.error("Failed to verify OTP:", error);
      throw error;
    }
  };
  const handleLogout = () => {
    clearTokens();
    clearUserData();
    router.push("/login");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    otp,
    setOtp,
    handleSignIn,
    handleVerifyOtp,
    isSigningIn,
    isVerifying,
    signInError,
    verifyError,
    handleLogout,
  };
};

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await forgetPassword({ email }).unwrap();
      router.push("/auth/check-email");
      return response;
    } catch (error) {
      console.error("Failed to request password reset:", error);
      console.error("Failed to request password reset:", error);
      throw error;
    }
  };

  return {
    email,
    setEmail,
    handleForgotPassword,
    isLoading,
    error,
  };
};

export const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const router = useRouter();

  const handleResetPassword = async (
    token: string,
    newPassword: string,
    email: string
  ) => {
    try {
      const response = await resetPassword({
        token,
        newPassword,
        email,
      }).unwrap();
      router.push("/login");
      router.push("/login");
      return response;
    } catch (error) {
      console.error("Failed to reset password:", error);
      console.error("Failed to reset password:", error);
      throw error;
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    token,
    setToken,
    handleResetPassword,
    isLoading,
    error,
  };
};

export const useTokenRefresh = () => {
  const [refreshUserToken, { isLoading, error }] = useRefreshTokenMutation();

  const handleRefreshToken = async () => {
    try {
      // const userId = getUserI();
      const refreshTokenValue = getRefreshToken();

      const username = getUsername();
      const refreshToken = getRefreshToken();

      if (!username || !refreshTokenValue) {
        throw new Error("Missing user name or refresh token");
      }

      const response = await refreshUserToken({
        username,
        refreshToken: refreshTokenValue,
      }).unwrap();

      saveTokens(response);
      return response;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  return {
    handleRefreshToken,
    isLoading,
    error,
  };
};
