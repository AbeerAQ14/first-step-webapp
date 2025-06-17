"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogDetailsWrapper from "@/components/dashboard/blog/BlogDetailsWrapper";
import { AdminBlogRequestFormData } from "@/lib/schemas";
import { adminService } from "@/services/dashboardApi";

export default function BlogDetails({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);

  // TODO: Replace with actual API call when available
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => {
      // Dummy data for now
      return Promise.resolve({
        title: {
          ar: "عنوان المدونة بالعربية",
          en: "Blog Title in English",
        },
        description: {
          ar: "وصف المدونة بالعربية",
          en: "Blog Description in English",
        },
        content: {
          ar: "محتوى المدونة بالعربية",
          en: "Blog Content in English",
        },
        mainImage:
          "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        cardImage:
          "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
    },
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
    mainImage: data.mainImage,
    cardImage: data.cardImage,
  };

  return (
    <div>
      <BlogDetailsWrapper
        blogId={blogId}
        initialValues={initialValues}
        mode="show"
      />
    </div>
  );
}
