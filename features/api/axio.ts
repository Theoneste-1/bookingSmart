import axiosInstance from "@/config/axios-instance";
import type { ApiResponse } from "@/types/api";
class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get<ApiResponse<T>>(endpoint, {
      params,
    });
    return response.data.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data);
    return response.data.data;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.put<ApiResponse<T>>(endpoint, data);
    return response.data.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.delete<ApiResponse<T>>(endpoint);
    return response.data.data;
  }
}

export const apiService = ApiService.getInstance();
