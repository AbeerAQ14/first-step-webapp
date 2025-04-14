import { AdSlide, Blog, CommonQuestion, Service, Value } from "@/types";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION,
    "X-Authorization-Secret": process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET,
  },
});

// Optional: Add interceptors (useful later for auth tokens, error handling)
apiClient.interceptors.request.use((config) => {
  // Retrieve token (e.g., from Zustand store or localStorage)
  // const token = useAuthStore.getState().token; // Example with Zustand
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
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
