import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { baseApi } from "./rtk";

export interface ProfessionalProfile {
  id: number;
  userId: number;
  bio: string;
  specialties: string[];
  experience: number;
  education: string[];
  certifications: string[];
  hourlyRate: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  professionalId: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  id: number;
  professionalId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
const _enhancedProApi = baseApi.enhanceEndpoints({
  addTagTypes:["Professional", "Service", "Availability"],
})
export const professionalApi = _enhancedProApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfessionalProfile, void>({
      query: () => API_ENDPOINTS.PROFESSIONAL.PROFILE,
      providesTags: ["Professional"],
    }),
    updateProfile: builder.mutation<
      ProfessionalProfile,
      Partial<ProfessionalProfile>
    >({
      query: (profile) => ({
        url: API_ENDPOINTS.PROFESSIONAL.PROFILE,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Professional"],
    }),
    getServices: builder.query<Service[], void>({
      query: () => API_ENDPOINTS.PROFESSIONAL.SERVICES,
      providesTags: ["Service"],
    }),
    addService: builder.mutation<
      Service,
      Omit<Service, "id" | "professionalId" | "createdAt" | "updatedAt">
    >({
      query: (service) => ({
        url: API_ENDPOINTS.PROFESSIONAL.SERVICES,
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<Service, Partial<Service> & { id: number }>(
      {
        query: ({ id, ...service }) => ({
          url: `${API_ENDPOINTS.PROFESSIONAL.SERVICES}/${id}`,
          method: "PUT",
          body: service,
        }),
        invalidatesTags: ["Service"],
      }
    ),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.PROFESSIONAL.SERVICES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
    getAvailability: builder.query<Availability[], void>({
      query: () => API_ENDPOINTS.PROFESSIONAL.AVAILABILITY,
      providesTags: ["Availability"],
    }),
    updateAvailability: builder.mutation<Availability[], Availability[]>({
      query: (availability) => ({
        url: API_ENDPOINTS.PROFESSIONAL.AVAILABILITY,
        method: "PUT",
        body: availability,
      }),
      invalidatesTags: ["Availability"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
} = professionalApi;
