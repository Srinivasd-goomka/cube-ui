import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export const handleError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | undefined;

    if (data?.message) {
      toast.error(data.message);
      return;
    }

    if (data?.errors) {
      const firstErrorKey = Object.keys(data.errors)[0];
      if (firstErrorKey && data.errors[firstErrorKey].length) {
        toast.error(data.errors[firstErrorKey][0]);
        return;
      }
    }

    switch (error.code) {
      case "ECONNABORTED":
        toast.error("The request took too long to complete. Please try again.");
        return;
      default:
        if (error.message === "Network Error") {
          toast.error("Please check your internet connection and try again.");
          return;
        }
        break;
    }

    toast.error(error.message || "An unexpected error occurred.");
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message || "An unexpected error occurred.");
    return;
  }

  toast.error("An unexpected error occurred.");
};
