import Numbers from "@/components/dashboard/center-bookings/Numbers";
import AreaComparison from "@/components/charts/AreaComparison";
import TopBookings from "@/components/dashboard/admin-bookings/TopBooking";
import Bookings from "@/components/dashboard/admin-bookings/Bookings";

export default async function BookingsPage() {
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
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-4">
        <Numbers />

        <AreaComparison title={"مقارنة الحجوزات"} rows={rows} />
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
