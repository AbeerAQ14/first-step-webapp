import Numbers from "@/components/dashboard/center-bookings/Numbers";
import AreaComparison from "@/components/charts/AreaComparison";
import Bookings from "@/components/dashboard/center-bookings/Bookings";

export default async function CenterDashboardBookings() {
  const rows = [
    {
      label: "شهر إبريل",
      value: 3620,
      valueLabel: "ر.س",
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      label: "شهر مارس",
      value: 3620,
      valueLabel: "ر.س",
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      label: "شهر فبراير",
      value: 3620,
      valueLabel: "ر.س",
      trend: "up" as const,
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-4">
        <Numbers />

        <AreaComparison title={"مقارنة الحجوزات"} rows={rows} />
      </div>

      <div className="mt-6">
        <Bookings />
      </div>
    </div>
  );
}
