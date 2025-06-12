"use client";

import CenterCard from "./CenterCard";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";

const Centers = () => {
  const {
    data: centers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["centers"],
    queryFn: adminService.getCenters,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>حدث خطأ أثناء تحميل الحضانات</div>;

  return (
    <div className="flex flex-col gap-4">
      {centers.data.map((center: any) => (
        <CenterCard key={center.user_id} center={center} />
      ))}
    </div>
  );
};

export default Centers;
