import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "../api/bookingApi";
import { Review } from "../api/reviewApi";
import { User } from "@/types/auth";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { RootState } from "@/store";
import { baseApi } from "./rtk";

export interface ClientProfile extends User {
  address: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
  };
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: number;
  type: "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL";
  lastFourDigits: string;
  isDefault: boolean;
  expiryDate: string;
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paymentMethodId: number;
  createdAt: string;
  updatedAt: string;
}

const enhancedClientApi = baseApi.enhanceEndpoints({
  addTagTypes:["Client", "Booking", "Payment", "Review"],
})
export const clientApi =enhancedClientApi.injectEndpoints({
  endpoints: (builder) => ({
    // Profile Management
    getProfile: builder.query<ClientProfile, void>({
      query: () => API_ENDPOINTS.CLIENT.PROFILE,
      providesTags: ["Client"],
    }),
    updateProfile: builder.mutation<ClientProfile, Partial<ClientProfile>>({
      query: (profile) => ({
        url: API_ENDPOINTS.CLIENT.PROFILE,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Client"],
    }),
    updatePreferences: builder.mutation<
      ClientProfile,
      ClientProfile["preferences"]
    >({
      query: (preferences) => ({
        url: `${API_ENDPOINTS.CLIENT.PROFILE}/preferences`,
        method: "PUT",
        body: preferences,
      }),
      invalidatesTags: ["Client"],
    }),

    // Payment Methods
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => `${API_ENDPOINTS.CLIENT.PAYMENTS}/methods`,
      providesTags: ["Payment"],
    }),
    addPaymentMethod: builder.mutation<
      PaymentMethod,
      Omit<PaymentMethod, "id" | "lastFourDigits">
    >({
      query: (method) => ({
        url: `${API_ENDPOINTS.CLIENT.PAYMENTS}/methods`,
        method: "POST",
        body: method,
      }),
      invalidatesTags: ["Payment"],
    }),
    removePaymentMethod: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.CLIENT.PAYMENTS}/methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
    setDefaultPaymentMethod: builder.mutation<PaymentMethod, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.CLIENT.PAYMENTS}/methods/${id}/default`,
        method: "POST",
      }),
      invalidatesTags: ["Payment"],
    }),

    // Bookings
    getBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.CLIENT.BOOKINGS,
      providesTags: ["Booking"],
    }),
    getBookingById: builder.query<Booking, number>({
      query: (id) => `${API_ENDPOINTS.CLIENT.BOOKINGS}/${id}`,
      providesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.CLIENT.BOOKINGS}/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Reviews
    getReviews: builder.query<Review[], void>({
      query: () => API_ENDPOINTS.CLIENT.REVIEWS,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<
      Review,
      Omit<Review, "id" | "isVerified" | "createdAt" | "updatedAt">
    >({
      query: (review) => ({
        url: API_ENDPOINTS.CLIENT.REVIEWS,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation<
      Review,
      { id: number; rating?: number; comment?: string }
    >({
      query: ({ id, ...review }) => ({
        url: `${API_ENDPOINTS.CLIENT.REVIEWS}/${id}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),

    // Payments
    getPayments: builder.query<Payment[], void>({
      query: () => API_ENDPOINTS.CLIENT.PAYMENTS,
      providesTags: ["Payment"],
    }),
    getPaymentById: builder.query<Payment, number>({
      query: (id) => `${API_ENDPOINTS.CLIENT.PAYMENTS}/${id}`,
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePreferencesMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
} = clientApi;
