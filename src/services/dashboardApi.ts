import axios from "axios";
import { apiClient } from "./api";
import { formatTime } from "@/lib/utils";
import { CenterRegisterPayload } from "@/types";
import { BranchAdminFormData } from "@/lib/schemas";
import { ApiErrorHandler } from "@/lib/error-handling";

const prepareCenterFormData = (
  formData: FormData,
  payload: Omit<CenterRegisterPayload, "password">
) => {
  // Append text fields
  formData.append("name", payload.name);
  formData.append("email", payload.email);
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

  formData.append("emergency_contact", payload.emergency_contact ? "1" : "0");
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
    meal.juice && formData.append(`first_meals[${index}][juice]`, meal.juice);
    meal.components &&
      formData.append(`first_meals[${index}][components]`, meal.components);
  });

  payload.second_meals?.forEach((meal, index) => {
    meal.meal_name &&
      formData.append(`second_meals[${index}][meal_name]`, meal.meal_name);
    meal.juice && formData.append(`second_meals[${index}][juice]`, meal.juice);
    meal.components &&
      formData.append(`second_meals[${index}][components]`, meal.components);
  });

  payload.pricing.forEach((price, index) => {
    formData.append(
      `pricing[${index}][enrollment_type]`,
      price.enrollment_type
    );
    formData.append(`pricing[${index}][response_speed]`, price.response_speed);
    formData.append(
      `pricing[${index}][price_amount]`,
      price.price_amount.toString()
    );
  });

  // ✅ Append files
  formData.append("logo", payload.logo);
  formData.append("license_path", payload.license_path);
  formData.append("commercial_record_path", payload.commercial_record_path);
};

export const centerService = {
  getBranches: async () => {
    try {
      const response = await apiClient.get("branches/");
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranch: async (id: string) => {
    try {
      const response = await apiClient.get(`/branches/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  updateBranch: async (
    id: string,
    payload: Omit<CenterRegisterPayload, "password">
  ) => {
    try {
      const formData = new FormData();
      prepareCenterFormData(formData, payload);

      const response = await apiClient.post(`/branches/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  createBranch: async (payload: Omit<CenterRegisterPayload, "password">) => {
    try {
      const formData = new FormData();
      prepareCenterFormData(formData, payload);

      const response = await apiClient.post("/branches", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  assignBranch: async (centerId: string, payload: BranchAdminFormData) => {
    try {
      const response = await apiClient.post(
        `/branches/${centerId}/assign-admin`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  deleteBranch: async (id: string) => {
    try {
      const response = await apiClient.delete(`/branches/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },
};
