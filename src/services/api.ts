import { useAuthStore } from "@/store/authStore";
import {
  AdSlide,
  Blog,
  CommonQuestion,
  ParentRegisterPayload,
  Service,
  Value,
} from "@/types";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION,
    "X-Authorization-Secret": process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET,
  },
});

// Optional: Add interceptors (useful later for auth tokens, error handling)
apiClient.interceptors.request.use((config) => {
  // Retrieve token (e.g., from Zustand store or localStorage)
  const token = useAuthStore.getState().token; // Example with Zustand
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const websiteService = {
  getAdSlides: async (locale: string) => {
    const response = await apiClient.get("/sliders", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as AdSlide[];
  },

  getCommonQuestions: async (locale: string) => {
    const response = await apiClient.get("/common-question", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as CommonQuestion[];
  },

  getOurValues: async (locale: string) => {
    const response = await apiClient.get("/our-value-keys", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Value[];
  },

  getOurServices: async (locale: string) => {
    const response = await apiClient.get("/services", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Service[];
  },
};

export const blogService = {
  getBlogs: async (locale: string) => {
    const response = await apiClient.get("/blogs", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Blog[];
  },

  getLatestBlogs: async (locale: string) => {
    const response = await apiClient.get("/blogs", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Blog[];
  },
};

export const authService = {
  registerParent: async (payload: ParentRegisterPayload) => {
    try {
      console.log(payload);
      const response = await apiClient.post("/register-parent", {
        ...payload,
      });
      return response.data;
    } catch (error) {
      // Handle different types of errors (network, server response)
      if (axios.isAxiosError(error)) {
        console.error("API Error Response:", error.response?.data);
        // Throw a more specific error or the error response data
        throw new Error(
          error.response?.data?.message ||
            "Failed to submit data. Please try again."
        );
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};
