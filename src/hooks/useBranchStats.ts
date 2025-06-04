import { useQuery } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";

export type BranchStats = {
  total_enrollments: number;
  total_active_enrollments: number;
  total_children: number;
  total_team_members: number;
  total_parents: number;
  enrollments_over_time: Record<string, number>;
  enrollment_status_breakdown: {
    pending: number;
    accepted: number;
    rejected: number;
  };
  child_demographics: {
    age_groups: Record<string, number>;
    gender_distribution: {
      boy: number;
      girl: number;
    };
  };
  parent_engagement: {
    most_active_parents: any[];
    total_messages: number;
  };
  total_revenue_for_the_lates_5_months: any[];
};

export const useBranchStats = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["branchStats"],
    queryFn: async () => {
      const response = await centerService.getBranchStats();
      return response;
    },
  });

  return {
    stats,
    isLoading,
    error,
  };
};
