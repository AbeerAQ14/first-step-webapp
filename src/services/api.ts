import { formatTime } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import {
  AdSlide,
  Blog,
  CenterRegisterPayload,
  CommonQuestion,
  ParentRegisterPayload,
  Service,
  Value,
} from "@/types";
import axios from "axios";
import { cache } from "react";

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
  getAdSlides: cache(async (locale: string) => {
    const response = await apiClient.get("/sliders", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as AdSlide[];
  }),

  getCommonQuestions: cache(async (locale: string) => {
    const response = await apiClient.get("/common-question", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as CommonQuestion[];
  }),

  getOurValues: cache(async (locale: string) => {
    const response = await apiClient.get("/our-value-keys", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Value[];
  }),

  getOurServices: cache(async (locale: string) => {
    const response = await apiClient.get("/services", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Service[];
  }),
};

export const blogService = {
  getBlogs: cache(async (locale: string) => {
    const response = await apiClient.get("/blogs", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Blog[];
  }),

  getLatestBlogs: cache(async (locale: string) => {
    const response = await apiClient.get("/blogs", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as Blog[];
  }),
};

export const nurseryService = {
  getNurseries: cache(
    async (locale: string, params?: { key: string; value: string }[]) => {
      // Convert array of params to an object
      const queryParams = params?.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const response = await apiClient.get(`/center-filter`, {
        headers: {
          lang: locale,
        },
        params: queryParams,
      });

      return response.data.data as CenterRegisterPayload[];
    }
  ),

  getLatestNurseries: cache(async (locale: string) => {
    const response = await apiClient.get("/latest-search", {
      headers: {
        lang: locale,
      },
    });
    return response.data.data as CenterRegisterPayload[];
  }),
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

  registerCenter: async (payload: CenterRegisterPayload) => {
    try {
      console.log(payload);
      const formData = new FormData();

      // Append text fields
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("address", payload.address);
      formData.append("phone", payload.phone);

      payload.additional_service &&
        formData.append("additional_service", payload.additional_service);
      formData.append("work_days_from", payload.work_days_from);
      formData.append("work_days_to", payload.work_days_to);
      formData.append("work_hours_from", formatTime(payload.work_hours_from));
      formData.append("work_hours_to", formatTime(payload.work_hours_to));
      payload.time_of_first_period &&
        formData.append(
          "time_of_first_period",
          formatTime(payload.time_of_first_period)
        );
      payload.time_of_second_period &&
        formData.append(
          "time_of_second_period",
          formatTime(payload.time_of_second_period)
        );

      formData.append(
        "emergency_contact",
        payload.emergency_contact ? "1" : "0"
      );
      formData.append("special_needs", payload.special_needs ? "1" : "0");

      formData.append("nursery_name", payload.nursery_name);
      formData.append("location", payload.location);
      formData.append("city", payload.city);
      formData.append("neighborhood", payload.neighborhood);

      formData.append("provides_food", payload.provides_food ? "1" : "0");

      // Append arrays
      payload.nursery_type.forEach((item) => {
        formData.append("nursery_type[]", item);
      });

      payload.communication_methods.forEach((item) => {
        formData.append("communication_methods[]", item);
      });

      payload.services.forEach((item) => {
        formData.append("services[]", item);
      });

      payload.accepted_ages.forEach((item) => {
        formData.append("accepted_ages[]", item);
      });

      payload.first_meals?.forEach((meal, index) => {
        meal.meal_name &&
          formData.append(`first_meals[${index}][meal_name]`, meal.meal_name);
        meal.juice &&
          formData.append(`first_meals[${index}][juice]`, meal.juice);
        meal.components &&
          formData.append(`first_meals[${index}][components]`, meal.components);
      });

      payload.second_meals?.forEach((meal, index) => {
        meal.meal_name &&
          formData.append(`second_meals[${index}][meal_name]`, meal.meal_name);
        meal.juice &&
          formData.append(`second_meals[${index}][juice]`, meal.juice);
        meal.components &&
          formData.append(
            `second_meals[${index}][components]`,
            meal.components
          );
      });

      payload.pricing.forEach((price, index) => {
        formData.append(
          `pricing[${index}][enrollment_type]`,
          price.enrollment_type
        );
        formData.append(
          `pricing[${index}][response_speed]`,
          price.response_speed
        );
        formData.append(
          `pricing[${index}][price_amount]`,
          price.price_amount.toString()
        );
      });

      // ✅ Append files
      formData.append("logo", payload.logo);
      formData.append("license_path", payload.license_path);
      formData.append("commercial_record_path", payload.commercial_record_path);

      const response = await apiClient.post("/register-center", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error("API Error Response:", error.response?.data);

        throw {
          message: responseData?.message || "Something went wrong.",
          errors: responseData?.errors || {},
        };
      } else {
        console.error("Unexpected Error:", error);
        throw { message: "An unexpected error occurred.", errors: {} };
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        // Log the API response for debugging
        console.error("Login API Error:", responseData);

        // Normalize the error shape for the form handler
        throw {
          message: responseData?.message || "فشل تسجيل الدخول. حاول مرة أخرى.",
          errors: responseData?.errors || {},
        };
      } else {
        console.error("Unexpected Login Error:", error);
        throw {
          message: "حدث خطأ غير متوقع.",
          errors: {},
        };
      }
    }
  },
  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post("/password/email", {
        email,
      });
      return response.data;
    } catch (error) {
      // Handle different types of errors (network, server response)
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error("API Error Response:", responseData);

        throw {
          message: responseData?.message || "Something went wrong.",
          errors: responseData?.errors || {},
        };
      } else {
        console.error("Unexpected Error:", error);
        throw { message: "An unexpected error occurred.", errors: {} };
      }
    }
  },
};
