import axiosInstance from "../../lib/axios/axiosInstance";
import { handleError } from "../../lib/helpers/requestHandler/error-handler";

interface ApiResponse<T> {
  data?: {
    data: T;
  };
}

export class HelperService {
  public async get<T>(url: string, filters?: Record<string, unknown>): Promise<T> {
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          url += `&${key}=${filters[key]}`;
        }
      });
    }
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url);
      return response.data?.data as T;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async post<T, D>(url: string, data: D): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async put<T, D>(url: string, data: D): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  public async delete<T>(url: string): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}

export const helperService = new HelperService();
