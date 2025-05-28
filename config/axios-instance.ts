import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiResponse, ErrorResponse } from "@/types/api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          toast.error("Session expired. Please login again.");
          break;
        case 403:
          toast.error("You don't have permission to perform this action");
          break;
        case 422:
          if (data?.errors) {
            Object.values(data.errors)
              .flat()
              .forEach((error) => {
                toast.error(error);
              });
          } else {
            toast.error(data?.message || "Validation error");
          }
          break;
        case 500:
          toast.error("An unexpected error occurred. Please try again later.");
          break;
        default:
          toast.error(data?.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

// Helper function to handle API responses
export const handleApiResponse = async <T>(
  promise: Promise<{ data: ApiResponse<T> }>,
): Promise<T> => {
  try {
    const response = await promise;
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
