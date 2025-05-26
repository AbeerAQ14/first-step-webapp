import { AxiosError } from "axios";

// Define the expected shape of our API response data
interface ApiResponseData {
  message?: string;
  errors?: Record<string, string[] | string>;
  code?: string;
}

export interface ApiError {
  message: string;
  errors: Record<string, string[] | string>;
  status?: number;
  code?: string;
}

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    // Handle Axios errors
    if (this.isAxiosError(error)) {
      const responseData = error.response?.data as ApiResponseData | undefined;
      const status = error.response?.status;

      return {
        message:
          responseData?.message || this.getDefaultMessageForStatus(status),
        errors: responseData?.errors || {},
        status,
        code: responseData?.code,
      };
    }

    // Handle known ApiErrors (thrown by our own code)
    if (this.isApiError(error)) {
      return error;
    }

    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: {},
      status: 500,
    };
  }

  private static isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError)?.isAxiosError === true;
  }

  private static isApiError(error: unknown): error is ApiError {
    return (
      typeof (error as ApiError)?.message === "string" &&
      typeof (error as ApiError)?.errors === "object"
    );
  }

  private static getDefaultMessageForStatus(status?: number): string {
    switch (status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Authentication required. Please log in.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 422:
        return "Validation failed. Please check your input.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  }
}
