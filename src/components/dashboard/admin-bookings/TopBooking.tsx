"use client";

import { Booking, getColumns } from "@/components/tables/data/top-bookings";
import { DataTable } from "@/components/tables/DataTable";

const bookingsData: Booking[] = [
  {
    id: 1,
    center: "اسم الحضانة",
    branch: "اسم الفرع",
    count: "5",
    income: 5444.5,
  },
  {
    id: 2,
    center: "اسم الحضانة",
    branch: "اسم الفرع",
    count: "4",
    income: 56444.5,
  },
  {
    id: 3,
    center: "اسم الحضانة",
    branch: "اسم الفرع",
    count: "3",
    income: 56664.5,
  },
  {
    id: 4,
    center: "اسم الحضانة",
    branch: "اسم الفرع",
    count: "3",
    income: 5664.5,
  },
  {
    id: 5,
    center: "اسم الحضانة",
    branch: "اسم الفرع",
    count: "3",
    income: 5634.5,
  },
];

const TopBookings = () => {
  const columns = getColumns({ nurseryName: true });

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="font-bold text-primary text-center">
          أعلى 5 حضانات أو مراكز من حيث عدد الحجوزات شهريًا
        </p>

        <DataTable pagination={false} columns={columns} data={bookingsData} />
      </div>
    </div>
  );
};

export default TopBookings;
