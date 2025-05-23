import AreaComparison from "@/components/charts/AreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";

export default async function CenterDashboardHome() {
  const rows = [
    {
      month: "شهر إبريل",
      value: 3620,
      valueName: "ر.س",
      trend: "up",
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      month: "شهر مارس",
      value: 3620,
      valueName: "ر.س",
      trend: "down",
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      month: "شهر فبراير",
      value: 3620,
      valueName: "ر.س",
      trend: "up",
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <CircularProgressChart totalValue={1000} currentValue={350} />
        <AreaComparison title={"مقارنة الحجوزات"} rows={rows} />
      </div>
    </div>
  );
}
