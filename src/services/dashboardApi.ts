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

  respondEnrollment: async (id: number, status: string) => {
    try {
      const response = await apiClient.patch(`/enrollments/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChildrenFiles: async () => {
    try {
      const response = await apiClient.get(`/children`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChild: async (id: string) => {
    try {
      const response = await apiClient.get(`/children/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChildrenBirthdays: async () => {
    try {
      const response = await apiClient.get(`/child-birthdays`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranchTeam: async (id: string) => {
    try {
      const response = await apiClient.get(
        `/branch-team-members?branch_id=${id}`
      );
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranchTeamMember: async (id: string) => {
    try {
      const response = await apiClient.get(`/branch-team-members/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  createBranchTeamMember: async (payload: any) => {
    try {
      const response = await apiClient.post(`/branch-team-members`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  updateBranchTeamMember: async (id: string, payload: any) => {
    try {
      const response = await apiClient.post(
        `/branch-team-members/${id}`,
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

  deleteBranchTeamMember: async (id: string) => {
    try {
      const response = await apiClient.delete(`/branch-team-members/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getDailyReports: async () => {
    try {
      const response = await apiClient.get(`/daily-reports`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getDailyReport: async (id: string) => {
    try {
      const response = await apiClient.get(`/get-daily-report/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  sendDailyReport: async (childId: string, payload: any) => {
    try {
      const response = await apiClient.post(
        `/children/${childId}/daily-reports`,
        payload
      );
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getParents: async () => {
    try {
      const response = await apiClient.get(`/center/parents`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getParent: async (id: string) => {
    try {
      const response = await apiClient.get(`/center/parent/${id}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getAds: async () => {
    try {
      const response = await apiClient.get(`/ads`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  requestAd: async (payload: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    image: File;
    publish_date: string;
    end_date: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("title[ar]", payload.titleAr);
      formData.append("title[en]", payload.titleEn);
      formData.append("description[ar]", payload.descriptionAr);
      formData.append("description[en]", payload.descriptionEn);
      formData.append("image", payload.image);
      formData.append("publish_date", payload.publish_date);
      formData.append("end_date", payload.end_date);

      const response = await apiClient.post(`/ads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBlogs: async () => {
    try {
      const response = await apiClient.get(`/blog-centers`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  requestBlog: async (payload: {
    cover: File;
    blog_image: File;
    title: string;
    description: string;
    content: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("cover", payload.cover);
      formData.append("blog_image", payload.blog_image);
      formData.append("content", payload.content);

      const response = await apiClient.post(`/blog-centers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getTasks: async () => {
    try {
      const response = await apiClient.get(`/to-do-centers`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getTask: async (taskId: string) => {
    try {
      const response = await apiClient.get(`/to-do-centers/${taskId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  createTask: async (payload: {
    title: string;
    date: string;
    done: boolean;
  }) => {
    try {
      const response = await apiClient.post(`/to-do-centers`, payload);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  updateTask: async (
    taskId: string,
    payload: { title: string; date: string; done: boolean }
  ) => {
    try {
      const response = await apiClient.put(`/to-do-centers/${taskId}`, payload);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      const response = await apiClient.delete(`/to-do-centers/${taskId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getOccasions: async () => {
    try {
      const response = await apiClient.get(`/occassions`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getOccasion: async (occasionId: string) => {
    try {
      const response = await apiClient.get(`/occassions/${occasionId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  createOccasion: async (payload: { title: string; date: string }) => {
    try {
      const response = await apiClient.post(`/occassions`, payload);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  updateOccasion: async (
    occasionId: string,
    payload: { title: string; date: string }
  ) => {
    try {
      const response = await apiClient.put(
        `/occassions/${occasionId}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  deleteOccasion: async (occasionId: string) => {
    try {
      const response = await apiClient.delete(`/occassions/${occasionId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getCenterStats: async () => {
    try {
      const response = await apiClient.get(`/center/statistics`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranchStats: async () => {
    try {
      const response = await apiClient.get(`/branch/statistics`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  sendNotification: async (payload: {
    parent_ids: number[];
    title: string;
    date: string;
    time: string;
  }) => {
    try {
      const response = await apiClient.post(`/notify-parents`, payload);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },
};

export const adminService = {
  getCenters: async () => {
    try {
      const response = await apiClient.get("/dashboard/centers");
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranches: async (centerId: string) => {
    try {
      const response = await apiClient.get(
        `/dashboard/branches/${centerId}/branches`
      );
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getBranch: async (branchId: string) => {
    try {
      const response = await apiClient.get(`/dashboard/branches/${branchId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChildren: async () => {
    try {
      const response = await apiClient.get(`/dashboard/childs`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChild: async (childId: string) => {
    try {
      const response = await apiClient.get(`/dashboard/childs/${childId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getParents: async () => {
    try {
      const response = await apiClient.get(`/dashboard/parents`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getParent: async (parentId: string) => {
    try {
      const response = await apiClient.get(`/dashboard/parents/${parentId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getAdvertisements: async () => {
    try {
      const response = await apiClient.get(`/dashboard/ads-for-admin`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getAdvertisement: async (adId: string) => {
    try {
      const response = await apiClient.get(`dashboard/ads-for-admin/${adId}`);
      return response.data.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  createAdvertisement: async (payload: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    image: File;
    publish_date: string;
    end_date: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("title[ar]", payload.titleAr);
      formData.append("title[en]", payload.titleEn);
      formData.append("description[ar]", payload.descriptionAr);
      formData.append("description[en]", payload.descriptionEn);
      formData.append("image", payload.image);
      formData.append("publish_date", payload.publish_date);
      formData.append("end_date", payload.end_date);

      const response = await apiClient.post(
        `/dashboard/ads-for-admin`,
        formData,
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

  updateAdvertisement: async (
    adId: string,
    payload: {
      titleAr?: string;
      titleEn?: string;
      descriptionAr?: string;
      descriptionEn?: string;
      image: File;
      publish_date?: string;
      end_date?: string;
    }
  ) => {
    try {
      const formData = new FormData();
      payload.titleAr && formData.append("title[ar]", payload.titleAr);
      payload.titleEn && formData.append("title[en]", payload.titleEn);
      payload.descriptionAr &&
        formData.append("description[ar]", payload.descriptionAr);
      payload.descriptionEn &&
        formData.append("description[en]", payload.descriptionEn);
      payload.image && formData.append("image", payload.image);
      payload.publish_date &&
        formData.append("publish_date", payload.publish_date);
      payload.end_date && formData.append("end_date", payload.end_date);

      const response = await apiClient.post(
        `/dashboard/ads-for-admin/${adId}`,
        formData,
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

  deleteAdvertisement: async (adId: string) => {
    try {
      const response = await apiClient.delete(
        `/dashboard/ads-for-admin/${adId}`
      );
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getAllCenterAds: async () => {
    try {
      const response = await apiClient.get(`/dashboard/all-centers-ads`);
      return response.data.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getOneCenterAds: async (centerId: string) => {
    try {
      const response = await apiClient.get(
        `/dashboard/all-for-specific-center/${centerId}`
      );
      return response.data.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getCenterAd: async (adId: string) => {
    try {
      const response = await apiClient.get(`/dashboard/specific-ad/${adId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  approveCenterAd: async (adId: string) => {
    try {
      const response = await apiClient.post(`/ads/${adId}/approve`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  rejectCenterAd: async (adId: string) => {
    try {
      const response = await apiClient.post(`/ads/${adId}/reject`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },
};
