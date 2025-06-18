"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { AdminBlogRequestFormData } from "@/lib/schemas";

export default function CenterBlogsPage({
  params,
}: {
  params: Promise<{ centerId: string }>;
}) {
  const { centerId } = use(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ["centerBlogs", centerId],
    queryFn: () => adminService.getOneCenterBlogs(centerId),
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;

  // Defensive: handle empty or missing blogs
  const blogs = data?.blog_centers || [];

  // Helper to map backend blog to AdminBlogRequestFormData
  const mapBlogToFormData = (blog: any): AdminBlogRequestFormData => ({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    mainImage:
      "https://images.unsplash.com/photo-1744265385437-8b591b626a8b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cardImage:
      "https://images.unsplash.com/photo-1744265385437-8b591b626a8b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  console.log(blogs);

  return (
    <div className="space-y-4">
      <h1 className="heading-4 text-primary font-medium text-center">
        الحضانة أو المركز
      </h1>
      <div className="flex flex-col gap-y-12">
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">
            مدونات في انتظار القبول
          </p>
          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {blogs
              .filter((blog: any) => blog.status === "pending")
              .map((blog: any) => null)}
          </div>
        </div>
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">مدونات مقبولة</p>
          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {blogs
              .filter((blog: any) => blog.status === "approved")
              .map((blog: any) => null)}
          </div>
        </div>
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">مدونات مرفوضة</p>
          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {blogs
              .filter((blog: any) => blog.status === "rejected")
              .map((blog: any) => null)}
          </div>
        </div>
      </div>
    </div>
  );
}
