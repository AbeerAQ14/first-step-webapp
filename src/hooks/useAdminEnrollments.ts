import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { useHasRole } from "@/store/authStore";

export type Enrollment = {
  enrollment_id: number;
  status: string;
  enrollment_type: string;
  price_amount: string;
  enrollment_date: string;
  branch_name: string;
};

export type Child = {
  child_id: number;
  child_name: string;
  enrollments: Enrollment[];
};

export type Parent = {
  parent_id: number;
  parent_name: string;
  children: Child[];
};

export const useAdminEnrollments = () => {
  const isAdmin = useHasRole("admin");

  const { data: enrollments, isLoading, error } = useQuery({
    queryKey: ["adminEnrollments"],
    queryFn: adminService.getAdminEnrollments,
    enabled: isAdmin,
  });

  return {
    enrollments,
    isLoading,
    error,
  };
};
