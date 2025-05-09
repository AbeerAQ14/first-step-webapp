"use client";

import { Ad, columns } from "@/components/tables/data/ads";
import { DataTable } from "@/components/tables/DataTable";

const adsData: Ad[] = [
  {
    id: 1,
    type: "free",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "الفرع الرئيسي",
    amount: 0,
    reservationStatus: "confirmed", // Assuming "تم الدفع" implies confirmation
  },
  {
    id: 1,
    type: "paid",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 564.5,
    reservationStatus: "waitingForPayment",
  },
  {
    id: 1,
    type: "paid",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 564.5,
    reservationStatus: "confirmed", // Assuming "تم الدفع" implies confirmation
  },
  {
    id: 1,
    type: "paid",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 564.5,
    reservationStatus: "waitingForPayment",
  },
  {
    id: 1,
    type: "paid",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 564.5,
    reservationStatus: "confirmed", // Assuming "تم الدفع" implies confirmation
  },
  {
    id: 1,
    type: "free",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 0,
    reservationStatus: "rejected",
  },
  {
    id: 1,
    type: "free",
    startDate: "8/8/2025",
    endDate: "8/8/2025",
    branch: "اسم الفرع",
    amount: 0,
    reservationStatus: "waitingForPayment",
  },
];

const Ads = () => {
  return (
    <div>
      <DataTable columns={columns} data={adsData} />
    </div>
  );
};

export default Ads;
