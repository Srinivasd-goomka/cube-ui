import axiosInstance from "../../lib/axios/axiosInstance";
import { handleError } from "../../lib/helpers/requestHandler/error-handler";

export class HelperService {
  protected async get<T>(url: string): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  protected async post<T, D>(url: string, data: D): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  protected async put<T, D>(url: string, data: D): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  protected async delete<T>(url: string): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}

export const apiServiceInstance = new HelperService();
