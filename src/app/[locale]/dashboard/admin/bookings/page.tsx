import Numbers from "@/components/dashboard/center-bookings/Numbers";
import MonthlyAreaComparison from "@/components/charts/MonthlyAreaComparison";
import TopBookings from "@/components/dashboard/admin-bookings/TopBooking";
import Bookings from "@/components/dashboard/admin-bookings/Bookings";

export default async function BookingsPage() {
  const rows = [
    {
      month: 4, // April
      value: 3620,
      valueLabel: "ر.س",
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      month: 3, // March
      value: 3620,
      valueLabel: "ر.س",
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      month: 2, // February
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

        <MonthlyAreaComparison title={"مقارنة الحجوزات"} rows={rows} />
      </div>

      <div className="mt-6">
        <TopBookings />
      </div>

      <div className="mt-6">
        <Bookings />
      </div>
    </div>
  );
}
