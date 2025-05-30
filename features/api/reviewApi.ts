import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { baseApi } from "./rtk";

export interface Review {
  id: number;
  bookingId: number;
  clientId: number;
  professionalId: number;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const _enhancedReviewApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Review']
})

export const reviewApi = _enhancedReviewApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => API_ENDPOINTS.COMMON.REVIEWS,
      providesTags: ["Review"],
    }),
    getReviewById: builder.query<Review, number>({
      query: (id) => `${API_ENDPOINTS.COMMON.REVIEWS}/${id}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<
      Review,
      Omit<Review, "id" | "isVerified" | "createdAt" | "updatedAt">
    >({
      query: (review) => ({
        url: API_ENDPOINTS.COMMON.REVIEWS,
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
        url: `${API_ENDPOINTS.COMMON.REVIEWS}/${id}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.COMMON.REVIEWS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
    getProfessionalReviews: builder.query<Review[], number>({
      query: (professionalId) =>
        `${API_ENDPOINTS.PROFESSIONAL.REVIEWS}/${professionalId}`,
      providesTags: ["Review"],
    }),
    getClientReviews: builder.query<Review[], number>({
      query: (clientId) => `${API_ENDPOINTS.CLIENT.REVIEWS}/${clientId}`,
      providesTags: ["Review"],
    }),
    verifyReview: builder.mutation<Review, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.COMMON.REVIEWS}/${id}/verify`,
        method: "POST",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetProfessionalReviewsQuery,
  useGetClientReviewsQuery,
  useVerifyReviewMutation,
} = reviewApi;
