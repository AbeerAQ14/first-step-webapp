"use client";

import { Booking, getColumns } from "@/components/tables/data/top-bookings";
import { DataTable } from "@/components/tables/DataTable";
import { useAdminStats } from "@/hooks/useAdminStats";

const TopBookings = () => {
  const { stats } = useAdminStats();
  const topCenters = stats?.top_centers || [];

  const bookingsData = topCenters.map((center:any, index:number) => ({
    id: index + 1,
    center: center.nursery_name,
    count: Number(center.enrollments_count),
    income: 0, // We don't have income data in the API response
  }));

  const columns = getColumns({ nurseryName: true });

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="font-bold text-primary text-center">
          أعلى 5 حضانات أو مراكز من حيث عدد الحجوزات شهريًا
        </p>
        <DataTable
          data={bookingsData}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default TopBookings;
