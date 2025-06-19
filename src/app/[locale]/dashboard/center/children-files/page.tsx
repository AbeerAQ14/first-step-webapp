"use client";

import { useTranslations } from "next-intl";
import MonthlyAreaComparison from "@/components/charts/MonthlyAreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";
import Children from "@/components/dashboard/children-files/Children";
import { useHasRole } from "@/store/authStore";
import { useCenterStats } from "@/hooks/useCenterStats";
import { Skeleton } from "@/components/ui/skeleton";

const CircularProgressSkeleton = () => {
  return (
    <div className="w-full h-[300px] rounded-xl bg-white p-6 flex flex-col items-center justify-center">
      <Skeleton className="w-32 h-32 rounded-full mb-4" />
      <Skeleton className="w-24 h-8 mb-2" />
      <Skeleton className="w-32 h-6" />
    </div>
  );
};

export default function CenterDashboardHome() {
  const t = useTranslations("dashboard.charts.children");
  const isCenter = useHasRole("center");
  const { stats, isLoading } = useCenterStats(isCenter ? "center" : "branch");

  const rows = [
    {
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      value: 3620,
      valueLabel: "طفل",
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {isLoading ? (
          <CircularProgressSkeleton />
        ) : (
          <CircularProgressChart
            currentValue={stats.total_children}
            title={t("title")}
            valueLabel={t("valueLabel")}
            capacityLabel={t("capacityLabel")}
          />
        )}
        <MonthlyAreaComparison title={t("comparison.title")} rows={rows} />
      </div>

      <div className="mt-6">
        <Children />
      </div>
    </div>
  );
}
