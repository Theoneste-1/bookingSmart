import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { baseApi } from "./rtk";

export interface ProfessionalProfile {
  id: number;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  professionalTitle: string;
  yearsOfExperience: number;
  hourlyRate: number;
  isVerified: boolean;
  adminId: number;
  categories: Category[];
  availabilities: Availability[];
  appointments: Appointment[];
  reviews: Review[];
}

export interface ServiceCreateDto {
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  categoryId: number;
  isActive: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Appointment {
  id: number;
  clientId: number;
  professionalId: number;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
}

export interface Review {
  id: number;
  clientId: number;
  professionalId: number;
  rating: number;
  comment: string;
  createdAt: string;
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

export interface ProfessionalCreateDto {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  professionalTitle: string;
  yearsOfExperience: number;
  hourlyRate: number;
  isAgreedToTerms: boolean;
}

export interface CategoryCreateDto {
  name: string;
  description: string;
  professionalId: number;
}

export interface AvailabilityCreateDto {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const _enhancedProApi = baseApi.enhanceEndpoints({
  addTagTypes: ["Professional", "Service", "Availability", "Category", 'Appointments'],
});

export const professionalApi = _enhancedProApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfessionalProfile, void>({
      query: () => API_ENDPOINTS.PROFESSIONAL.PROFILE,
      providesTags: ["Professional"],
    }),
    getAllProfessionals: builder.query<ProfessionalProfile, void>({
      query: () => "/professionals",
      providesTags: [{ type: "Professional", id: "LIST" }],
    }),
    createProfessional: builder.mutation<
      ProfessionalProfile,
      ProfessionalCreateDto
    >({
      query: (professional) => ({
        url: API_ENDPOINTS.PROFESSIONAL.CREATE,
        method: "POST",
        body: professional,
      }),
      invalidatesTags: ["Professional"],
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
      query: (id) => `professionals/${id}/categories/services`,
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
      query: (id) => `professionals/${id}/availabilities`,
      providesTags: ["Availability"],
    }),
    getCategories: builder.query<Category[], void>({
      query: (id) => `professionals/${id}/categories`,
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query<Category, string>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),

    getCategoryServices: builder.query<Service[], string>({
      query: (categoryId) => `/services/category/${categoryId}`,
      providesTags: (result, error, categoryId) => 
      categoryId
          ? [
              { type: 'Service', id:categoryId },
              { type: 'Service', id: 'LIST' }
            ]
          : [{ type: 'Service', id: 'LIST' }]
    }),

    getAppointments: builder.query<Appointment[], void>({
      query: (id) => `professionals/${id}/appointments`,
      providesTags: ["Appointments"],
    }),

    createCategory: builder.mutation<Category, CategoryCreateDto>({
      query: (category) => ({
        url: API_ENDPOINTS.PROFESSIONAL.CATEGORIES,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    createService: builder.mutation<Service, ServiceCreateDto>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: 'Service', id: 'LIST' },
        { type: 'Category', id: categoryId },
        {type: 'Service', id: categoryId}
      ]
    }),

    updateCategory: builder.mutation<
      Category,
      Partial<Category> & { id: number }
    >({
      query: ({ id, ...category }) => ({
        url: `${API_ENDPOINTS.PROFESSIONAL.CATEGORIES}/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.PROFESSIONAL.CATEGORIES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    createAvailability: builder.mutation<Availability, AvailabilityCreateDto>({
      query: (availability) => ({
        url: API_ENDPOINTS.PROFESSIONAL.AVAILABILITIES,
        method: "POST",
        body: availability,
      }),
      invalidatesTags: ["Availability"],
    }),
    updateAvailability: builder.mutation<
      Availability,
      Partial<Availability> & { id: number }
    >({
      query: ({ id, ...availability }) => ({
        url: `${API_ENDPOINTS.PROFESSIONAL.AVAILABILITIES}/${id}`,
        method: "PUT",
        body: availability,
      }),
      invalidatesTags: ["Availability"],
    }),
    deleteAvailability: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.PROFESSIONAL.AVAILABILITIES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Availability"],
    }),
    getProfessionalById: builder.query<ProfessionalProfile, string>({
      query: (id) => `professionals/${id}`,
      providesTags: (result, error, id) => [{ type: "Professional", id }],
    }),
    getProfessionalAvailability: builder.query<Availability[], string>({
      query: (id) => `professionals/${id}/availabilities`,
      providesTags: (result, error, id) => [{ type: "Availability", id }],
    }),
    getProfessionalCategories: builder.query<Category[], string>({
      query: (id) => `professionals/${id}/categories`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfessionalMutation,
  useUpdateProfileMutation,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useGetProfessionalByIdQuery,
  useGetProfessionalAvailabilityQuery,
  useGetProfessionalCategoriesQuery,
  useGetAllProfessionalsQuery,
  useGetCategoryByIdQuery,
  useGetCategoryServicesQuery,
  useCreateServiceMutation,
} = professionalApi;
