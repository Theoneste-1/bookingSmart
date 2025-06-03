import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking, BookingStatus } from "../api/bookingApi";
import { Review } from "../api/reviewApi";
import { User } from "@/types/auth";
import { RootState } from "@/store";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { baseApi } from "./rtk";

export interface SystemSettings {
  id: number;
  key: string;
  value: string;
  description: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProfessionals: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings: Booking[];
  recentReviews: Review[];
}


const enhancedAdminApi = baseApi.enhanceEndpoints({
  addTagTypes: ["AdminApi","User", "Professional", "Booking", "Review", "Settings"],
})
export const adminApi = enhancedAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Management
    getUsers: builder.query<User[], void>({
      query: () => API_ENDPOINTS.ADMIN.USERS,
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `${API_ENDPOINTS.ADMIN.USERS}/${id}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.ADMIN.USERS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.USERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Professional Management
    getProfessionals: builder.query<User[], void>({
      query: () => API_ENDPOINTS.ADMIN.PROFESSIONALS,
      providesTags: ["Professional"],
    }),
    verifyProfessional: builder.mutation<User, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.PROFESSIONALS}/${id}/verify`,
        method: "POST",
      }),
      invalidatesTags: ["Professional"],
    }),
    suspendProfessional: builder.mutation<User, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.PROFESSIONALS}/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["Professional"],
    }),

    // Booking Management
    getAllBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.ADMIN.BOOKINGS,
      providesTags: ["Booking"],
    }),
    updateBookingStatus: builder.mutation<
      Booking,
      { id: number; status: BookingStatus }
    >({
      query: ({ id, status }) => ({
        url: `${API_ENDPOINTS.ADMIN.BOOKINGS}/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Booking"],
    }),

    // Review Management
    getAllReviews: builder.query<Review[], void>({
      query: () => API_ENDPOINTS.ADMIN.REVIEWS,
      providesTags: ["Review"],
    }),
    verifyReview: builder.mutation<Review, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.REVIEWS}/${id}/verify`,
        method: "POST",
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.REVIEWS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),

    // System Settings
    getSettings: builder.query<SystemSettings[], void>({
      query: () => API_ENDPOINTS.ADMIN.SETTINGS,
      providesTags: ["Settings"],
    }),
    updateSetting: builder.mutation<
      SystemSettings,
      { key: string; value: string }
    >({
      query: ({ key, value }) => ({
        url: `${API_ENDPOINTS.ADMIN.SETTINGS}/${key}`,
        method: "PUT",
        body: { value },
      }),
      invalidatesTags: ["Settings"],
    }),

    // Dashboard
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => `${API_ENDPOINTS.ADMIN.REPORTS}/dashboard`,
      providesTags: ["Booking", "Review", "User", "Professional"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProfessionalsQuery,
  useVerifyProfessionalMutation,
  useSuspendProfessionalMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetAllReviewsQuery,
  useVerifyReviewMutation,
  useDeleteReviewMutation,
  useGetSettingsQuery,
  useUpdateSettingMutation,
  useGetDashboardStatsQuery,
} = adminApi;
