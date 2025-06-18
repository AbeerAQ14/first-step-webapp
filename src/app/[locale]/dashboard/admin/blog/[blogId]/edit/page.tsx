"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminBlogRequestFormData } from "@/lib/schemas";
import { adminService } from "@/services/dashboardApi";

export default function BlogEdit({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => adminService.getBlog(blogId),
    enabled: !!blogId,
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;
  if (!data) return null;

  // Map API response to AdminBlogRequestFormData
  const initialValues: AdminBlogRequestFormData = {
    title: data.title,
    description: data.description,
    content: data.content,
    mainImage: data.file,
    cardImage: data.image,
  };

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          تعديل المدونة
        </h1>
      </div>
    </div>
  );
}
