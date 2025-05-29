"use client";

import Team from "@/components/dashboard/team/Team";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

export interface TeamMember {
  id: number;
  name: string;
  profession: string;
  image_url: string;
  branch_id: number;
  created_at: string;
  updated_at: string;
}

interface BranchTeamResponse {
  data: TeamMember[];
}

const BranchSkeleton = () => {
  return (
    <div className="mb-10">
      <div className="mb-3.5 flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-sidebar p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CenterDashboardTeam() {
  const t = useTranslations("dashboard.center.team");

  const { data: branches = [], isLoading: isLoadingBranches } = useQuery({
    queryKey: ["branches"],
    queryFn: centerService.getBranches,
  });

  const branchQueries = useQueries({
    queries: branches.map((branch: any) => ({
      queryKey: ["branch-team", branch.id],
      queryFn: () => centerService.getBranchTeam(branch.id.toString()),
      enabled: !!branch.id,
    })),
  }) as UseQueryResult<BranchTeamResponse>[];

  const isLoading =
    isLoadingBranches || branchQueries.some((query) => query.isLoading);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-10">
        <BranchSkeleton />
        <BranchSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      {branches.map((branch: any, index: number) => {
        const teamData = branchQueries[index]?.data?.data || [];
        return (
          <div key={branch.id}>
            <div className="mb-3.5 flex items-center justify-between">
              <h1 className="heading-4 font-medium text-primary">
                {branch.name}
              </h1>

              <Button asChild size={"sm"} variant={"outline"}>
                <Link href={`team/add?branch_id=${branch.id}`}>
                  {t("add.button")}
                </Link>
              </Button>
            </div>

            <Team members={teamData} />
          </div>
        );
      })}
    </div>
  );
}
