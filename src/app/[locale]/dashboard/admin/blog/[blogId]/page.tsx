"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminBlogRequestFormData } from "@/lib/schemas";
import { adminService } from "@/services/dashboardApi";

export default function BlogDetails({
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

  return <div></div>;
}
