"use client";

import { DataTable } from "@/components/tables/DataTable";
import { Blog, columns } from "@/components/tables/data/center-blogs";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";

const CentersBlogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allCenterBlogs"],
    queryFn: adminService.getAllCenterBlogs,
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;

  // Map backend data to table format
  const rows: Blog[] = (data || []).map((item: any) => ({
    id: item.center?.id,
    center: item.center?.nursery_name || item.name || "-",
    phone: item.center?.phone || item.phone || "-",
    email: item.email || "-",
    acceptedBlogs: item.center?.approved_blogs_count ?? 0,
    pendingBlogs: item.center?.pending_blogs_count ?? 0,
    rejectedBlogs: item.center?.rejected_blogs_count ?? 0,
  }));

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          المدونات
        </p>
        <DataTable columns={columns} data={rows} pagination={true} />
      </div>
    </div>
  );
};

export default CentersBlogs;
