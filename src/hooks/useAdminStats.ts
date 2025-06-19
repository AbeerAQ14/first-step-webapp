import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { useHasRole } from "@/store/authStore";

export type AdminStats = {
  total_enrollments: number;
  total_active_enrollments: number;
  total_branches: number;
  total_children: number;
  total_centers: number;
  total_parent: number;
  ads_for_first_step: number;
  ads_for_centers: number;
  enrollments_over_time: Record<string, number>;
  enrollment_status_breakdown: {
    waitingForConfirmation: number;
    waitingForPayment: number;
    rejected: number;
    confirmed: number;
  };
  child_demographics: {
    age_groups: Record<string, number>;
    gender_distribution: {
      boy: number;
      girl: number;
    };
  };
  total_paid_order_value: any[];
  top_centers: {
    center_id: number;
    nursery_name: string;
    location: string;
    enrollments_count: number;
    branches_with_enrollments: Array<{
      branch_id: number;
      branch_name: string;
      location: string;
    }>;
  }[];
  total_paid_revenue: Record<string, number | null>;
  total: any[];
};

export const useAdminStats = () => {
  const isAdmin = useHasRole("admin");
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: adminService.getAdminStatistics,
    enabled: isAdmin,
  });

  return {
    stats,
    isLoading,
    error,
  };
};
