import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { baseApi } from "./rtk";

export interface Booking {
  id: number;
  clientId: number;
  professionalId: number;
  serviceId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes: string;
  price: number;
  serviceName:string;
  professionalName:string;
  duration: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

const _enhancedBookingApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Booking']
})
export const bookingApi = _enhancedBookingApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.COMMON.BOOKINGS,
      providesTags: ["Booking"],
    }),
    getBookingById: builder.query<Booking, number>({
      query: (id) => `${API_ENDPOINTS.COMMON.BOOKINGS}/${id}`,
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation<
      Booking,
      Omit<
        Booking,
        "id" | "status" | "paymentStatus" | "createdAt" | "updatedAt"
      >
    >({
      query: (booking) => ({
        url: API_ENDPOINTS.COMMON.BOOKINGS,
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Booking"],
    }),
    updateBookingStatus: builder.mutation<
      Booking,
      { id: number; status: BookingStatus }
    >({
      query: ({ id, status }) => ({
        url: `${API_ENDPOINTS.COMMON.BOOKINGS}/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Booking"],
    }),
    updatePaymentStatus: builder.mutation<
      Booking,
      { id: number; paymentStatus: PaymentStatus }
    >({
      query: ({ id, paymentStatus }) => ({
        url: `${API_ENDPOINTS.COMMON.BOOKINGS}/${id}/payment`,
        method: "PUT",
        body: { paymentStatus },
      }),
      invalidatesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.COMMON.BOOKINGS}/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),
    getClientBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.CLIENT.BOOKINGS,
      providesTags: ["Booking"],
    }),
    getProfessionalBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.PROFESSIONAL.BOOKINGS,
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useUpdatePaymentStatusMutation,
  useCancelBookingMutation,
  useGetClientBookingsQuery,
  useGetProfessionalBookingsQuery,
} = bookingApi;
