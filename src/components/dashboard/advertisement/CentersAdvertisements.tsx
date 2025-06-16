"use client";

import { DataTable } from "@/components/tables/DataTable";
import { Advertisement, columns } from "@/components/tables/data/center-ads";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";

const CentersAdvertisements = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allCenterAds"],
    queryFn: adminService.getAllCenterAds,
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;

  // Map backend data to table format
  const rows: Advertisement[] = (data || []).map((item: any) => ({
    id: item.id,
    center: item.center?.nursery_name || item.name || "-",
    phone: item.center?.phone || item.phone || "-",
    email: item.email || "-",
    acceptedAds: item.center?.approved_ads_count ?? 0,
    pendingAds: item.center?.pending_ads_count ?? 0,
    rejectedAds: item.center?.rejected_ads_count ?? 0,
  }));

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          الحجوزات
        </p>
        <DataTable columns={columns} data={rows} pagination={true} />
      </div>
    </div>
  );
};

export default CentersAdvertisements;
