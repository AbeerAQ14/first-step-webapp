import { ContactFormData } from "@/lib/schemas";
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
  getAdSlides: async (locale: string): Promise<AdSlide[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sliders`, {
      headers: {
        "Content-Type": "application/json",
        lang: locale,
        "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
        "X-Authorization-Secret":
          process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch ad slides");
    const data = await res.json();
    return data.data as AdSlide[];
  },

  getCommonQuestions: async (locale: string): Promise<CommonQuestion[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/common-question`,
      {
        headers: {
          "Content-Type": "application/json",
          lang: locale,
          "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
          "X-Authorization-Secret":
            process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch common questions");
    const data = await res.json();
    return data.data as CommonQuestion[];
  },

  getOurValues: async (locale: string): Promise<Value[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/our-value-keys`,
      {
        headers: {
          "Content-Type": "application/json",
          lang: locale,
          "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
          "X-Authorization-Secret":
            process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch values");
    const data = await res.json();
    return data.data as Value[];
  },

  getOurServices: async (locale: string): Promise<Service[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
      {
        headers: {
          "Content-Type": "application/json",
          lang: locale,
          "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
          "X-Authorization-Secret":
            process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch services");
    const data = await res.json();
    return data.data as Service[];
  },

  contactUs: async (payload: ContactFormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
            "X-Authorization-Secret":
              process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const responseData = await res.json();
        console.error("API Error Response:", responseData);

        throw {
          message: responseData?.message || "Something went wrong.",
          errors: responseData?.errors || {},
        };
      }

      return await res.json();
    } catch (error) {
      console.error("Unexpected Error:", error);
      throw { message: "An unexpected error occurred.", errors: {} };
    }
  },
};

export const blogService = {
  getBlogs: async (locale: string): Promise<Blog[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
      headers: {
        "Content-Type": "application/json",
        lang: locale,
        "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
        "X-Authorization-Secret":
          process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    return data.data as Blog[];
  },

  getLatestBlogs: async (locale: string): Promise<Blog[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
      headers: {
        "Content-Type": "application/json",
        lang: locale,
        "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
        "X-Authorization-Secret":
          process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch latest blogs");
    const data = await res.json();
    return data.data as Blog[];
  },
};

export const nurseryService = {
  getNurseries: async (
    locale: string,
    params?: { key: string; value: string }[]
  ): Promise<CenterRegisterPayload[]> => {
    const query = params
      ? "?" +
        params
          .map(
            ({ key, value }) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
      : "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/center-filter${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          lang: locale,
          "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
          "X-Authorization-Secret":
            process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch nurseries");
    const data = await res.json();
    return data.data as CenterRegisterPayload[];
  },

  getLatestNurseries: async (
    locale: string
  ): Promise<CenterRegisterPayload[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/latest-search`,
      {
        headers: {
          "Content-Type": "application/json",
          lang: locale,
          "X-Authorization": process.env.NEXT_PUBLIC_X_AUTHORIZATION || "",
          "X-Authorization-Secret":
            process.env.NEXT_PUBLIC_X_AUTHORIZATION_SECRET || "",
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch latest nurseries");
    const data = await res.json();
    return data.data as CenterRegisterPayload[];
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

      // If the login is successful and contains a token
      if (response.data.token) {
        return response.data;
      }

      // If the login failed and there is no token, handle the error
      throw {
        message: response.data.message || "Login failed, please try again",
        errors: response.data.errors || {},
      };
    } catch (error: any) {
      // If the error object contains a message, we can handle it here
      if (error.message && error.errors) {
        throw {
          message: error.message || "Login failed, please try again",
          errors: error.errors || {},
        };
      }

      // If it's an AxiosError, check for response and handle accordingly
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;

        throw {
          message: responseData?.message || "Login failed, please try again",
          errors: responseData?.errors || {},
        };
      }

      // If it's neither, log the unexpected error
      throw {
        message: "Unexpected error happened",
        errors: {},
      };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post("/forget-password", {
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
  checkOTP: async (email: string, otp: string) => {
    try {
      const response = await apiClient.post("/check-otp", {
        email,
        otp,
      });

      const result = response.data;

      if (!result.status) {
        throw {
          message: result.error || "Invalid OTP",
          errors: {
            otp: [result.error || "Invalid OTP"],
          },
        };
      }

      return result;
    } catch (error: any) {
      // 1. Axios error
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error("API Error Response:", responseData);

        throw {
          message: responseData?.message || "Something went wrong.",
          errors: responseData?.errors || {},
        };
      }

      // 2. Custom error (like invalid OTP) — preserve its structure
      if (error?.errors) {
        throw error;
      }

      // 3. Unexpected error
      console.error("Unexpected Error:", error);
      throw {
        message: error.message || "An unexpected error occurred.",
        errors: {},
      };
    }
  },
  resetPassword: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/rest-password", {
        email,
        password,
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
