import { apiClient } from "./api";
import { formatTime } from "@/lib/utils";
import { CenterRegisterPayload } from "@/types";
import { BranchAdminFormData } from "@/lib/schemas";
import { ApiErrorHandler } from "@/lib/error-handling";

const prepareCenterFormData = (
  formData: FormData,
  payload: Omit<CenterRegisterPayload, "password">
) => {
  // Append text fields only if they exist
  if (payload.name) formData.append("name", payload.name);
  if (payload.email) formData.append("email", payload.email);
  if (payload.address) formData.append("address", payload.address);
  if (payload.phone) formData.append("phone", payload.phone);

  if (payload.additional_service) {
    formData.append("additional_service", payload.additional_service);
  }
  if (payload.work_days_from)
    formData.append("work_days_from", payload.work_days_from);
  if (payload.work_days_to)
    formData.append("work_days_to", payload.work_days_to);
  if (payload.work_hours_from)
    formData.append("work_hours_from", formatTime(payload.work_hours_from));
  if (payload.work_hours_to)
    formData.append("work_hours_to", formatTime(payload.work_hours_to));
  if (payload.time_of_first_period) {
    formData.append(
      "time_of_first_period",
      formatTime(payload.time_of_first_period)
    );
  }
  if (payload.time_of_second_period) {
    formData.append(
      "time_of_second_period",
      formatTime(payload.time_of_second_period)
    );
  }

  if (payload.emergency_contact !== undefined) {
    formData.append("emergency_contact", payload.emergency_contact ? "1" : "0");
  }
  if (payload.special_needs !== undefined) {
    formData.append("special_needs", payload.special_needs ? "1" : "0");
  }

  if (payload.nursery_name)
    formData.append("nursery_name", payload.nursery_name);
  if (payload.location) formData.append("location", payload.location);
  if (payload.city) formData.append("city", payload.city);
  if (payload.neighborhood)
    formData.append("neighborhood", payload.neighborhood);

  if (payload.provides_food !== undefined) {
    formData.append("provides_food", payload.provides_food ? "1" : "0");
  }

  // Append arrays only if they exist
  if (payload.nursery_type?.length) {
    payload.nursery_type.forEach((item) => {
      formData.append("nursery_type[]", item);
    });
  }

  if (payload.communication_methods?.length) {
    payload.communication_methods.forEach((item) => {
      formData.append("communication_methods[]", item);
    });
  }

  if (payload.services?.length) {
    payload.services.forEach((item) => {
      formData.append("services[]", item);
    });
  }

  if (payload.accepted_ages?.length) {
    payload.accepted_ages.forEach((item) => {
      formData.append("accepted_ages[]", item);
    });
  }

  if (payload.first_meals?.length) {
    payload.first_meals.forEach((meal, index) => {
      if (meal.meal_name) {
        formData.append(`first_meals[${index}][meal_name]`, meal.meal_name);
      }
      if (meal.juice) {
        formData.append(`first_meals[${index}][juice]`, meal.juice);
      }
      if (meal.components) {
        formData.append(`first_meals[${index}][components]`, meal.components);
      }
    });
  }

  if (payload.second_meals?.length) {
    payload.second_meals.forEach((meal, index) => {
      if (meal.meal_name) {
        formData.append(`second_meals[${index}][meal_name]`, meal.meal_name);
      }
      if (meal.juice) {
        formData.append(`second_meals[${index}][juice]`, meal.juice);
      }
      if (meal.components) {
        formData.append(`second_meals[${index}][components]`, meal.components);
      }
    });
  }

  if (payload.pricing?.length) {
    payload.pricing.forEach((price, index) => {
      if (price.enrollment_type) {
        formData.append(
          `pricing[${index}][enrollment_type]`,
          price.enrollment_type
        );
      }
      if (price.response_speed) {
        formData.append(
          `pricing[${index}][response_speed]`,
          price.response_speed
        );
      }
      if (price.price_amount) {
        formData.append(
          `pricing[${index}][price_amount]`,
          price.price_amount.toString()
        );
      }
    });
  }

  // Append files only if they exist
  if (payload.logo) formData.append("logo", payload.logo);
  if (payload.license_path)
    formData.append("license_path", payload.license_path);
  if (payload.commercial_record_path)
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

  deleteBranch: async (id: number) => {
    try {
      const response = await apiClient.delete(`/branches/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getEnrollments: async () => {
    try {
      const response = await apiClient.get(`/enrollments`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },
};
