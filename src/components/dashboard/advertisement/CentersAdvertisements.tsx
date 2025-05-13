"use client";

import { DataTable } from "@/components/tables/DataTable";
import { Advertisement, columns } from "@/components/tables/data/center-ads";

const advertisements: Advertisement[] = [
  {
    id: "1",
    center: "اسم الحضانة",
    phone: "2222222222",
    email: "mennarmara@gmail.com",
    acceptedAds: 6,
    pendingAds: 6,
    rejectedAds: 6,
  },
  {
    id: "2",
    center: "مركز الطفولة المبكرة",
    phone: "2333333333",
    email: "childcenter@example.com",
    acceptedAds: 3,
    pendingAds: 2,
    rejectedAds: 1,
  },
  {
    id: "3",
    center: "روضة النجوم",
    phone: "2444444444",
    email: "starskinder@example.com",
    acceptedAds: 5,
    pendingAds: 1,
    rejectedAds: 0,
  },
  {
    id: "4",
    center: "حضانة الزهور",
    phone: "2555555555",
    email: "flowersnursery@example.com",
    acceptedAds: 4,
    pendingAds: 2,
    rejectedAds: 2,
  },
  {
    id: "5",
    center: "مركز براعم الغد",
    phone: "2666666666",
    email: "budscenter@example.com",
    acceptedAds: 6,
    pendingAds: 0,
    rejectedAds: 0,
  },
  {
    id: "6",
    center: "روضة المستقبل",
    phone: "2777777777",
    email: "futurekinder@example.com",
    acceptedAds: 2,
    pendingAds: 3,
    rejectedAds: 1,
  },
  {
    id: "7",
    center: "حضانة الأمل",
    phone: "2888888888",
    email: "hopecenter@example.com",
    acceptedAds: 1,
    pendingAds: 4,
    rejectedAds: 3,
  },
  {
    id: "8",
    center: "مركز الريان",
    phone: "2999999999",
    email: "alrayannursery@example.com",
    acceptedAds: 0,
    pendingAds: 6,
    rejectedAds: 0,
  },
];

const CentersAdvertisements = () => {
  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          الحجوزات
        </p>

        <DataTable columns={columns} data={advertisements} pagination={true} />
      </div>
    </div>
  );
};

export default CentersAdvertisements;
