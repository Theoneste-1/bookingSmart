import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import {
  getAccessToken,
  saveTokens,
  clearTokens,
  getRefreshToken,
  getUsername,
} from "../auth/authUtil";
import type { TokenResponse } from "@/types/dto/authDto";
import { Mutex } from "async-mutex";
import { API_BASE_URL } from "@/config/api";

// Create a mutex to prevent multiple refresh requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    console.log(token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

// Create a wrapped baseQuery to handle token refreshing
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if another request is already refreshing the token
  const release = await mutex.acquire();

  try {
    // Try the initial query
    let result = await baseQuery(args, api, extraOptions);

    // Check if we got HTML instead of JSON
    if (
      result.error &&
      result.error.status === "PARSING_ERROR" &&
      result.error.data?.toString().includes("<!DOCTYPE html>")
    ) {
      // Create a more helpful error message
      const originalUrl = typeof args === "string" ? args : args.url;
      const customError: FetchBaseQueryError = {
        status: "CUSTOM_ERROR",
        data: {
          message: `Received HTML instead of JSON from the server. This usually means the API is unavailable or the URL is incorrect. URL: ${originalUrl}`,
        },
        error: "Received HTML instead of JSON response",
      };
      result.error = customError;
      return result;
    }

    // If we get a 401 Unauthorized error
    if (result.error && result.error.status === 401) {
      // Check if we have a refresh token to try
      const refreshToken = getRefreshToken();
      const userId = getUsername();

      if (refreshToken && userId) {
        // Try to get a new token
        const refreshResult = await baseQuery(
          {
            url: "/users/refresh-token",
            method: "POST",
            body: { userId, refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Store the new tokens
          saveTokens(refreshResult.data as TokenResponse);

          // Retry the original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refresh token fails, logout the user
          clearTokens();
          // Redirect to login page if refresh fails
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      } else {
        // No refresh token, logout the user
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return result;
  } finally {
    // Release the mutex to allow other requests to continue
    release();
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [],
});

export const {} = baseApi;
