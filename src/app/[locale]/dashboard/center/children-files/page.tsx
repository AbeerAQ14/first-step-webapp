import { useTranslations } from "next-intl";
import MonthlyAreaComparison from "@/components/charts/MonthlyAreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";
import Children from "@/components/dashboard/children-files/Children";

export default function CenterDashboardHome() {
  const rows = [
    {
      month: 4, // April
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      month: 3, // March
      value: 3620,
      valueLabel: "طفل",
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      month: 2, // February
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  const t = useTranslations("dashboard.charts.children");

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <CircularProgressChart
          totalValue={1000}
          currentValue={350}
          title={t("title")}
          valueLabel={t("valueLabel")}
          capacityLabel={t("capacityLabel")}
        />
        <MonthlyAreaComparison title={t("comparison.title")} rows={rows} />
      </div>

      <div className="mt-6">
        <Children />
      </div>
    </div>
  );
}
