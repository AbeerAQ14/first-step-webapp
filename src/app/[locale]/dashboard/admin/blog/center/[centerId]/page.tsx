"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import BlogDetailsWrapper from "@/components/dashboard/blog/BlogDetailsWrapper";
import { AdminBlogRequestFormData } from "@/lib/schemas";

export default function CenterBlogsPage({
  params,
}: {
  params: Promise<{ centerId: string }>;
}) {
  const { centerId } = use(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ["centerBlogs", centerId],
    queryFn: () => {
      // TODO: Replace with actual API call when available
      return Promise.resolve({
        blogs: [
          {
            id: "1",
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
            status: "pending",
          },
          {
            id: "2",
            title: {
              ar: "عنوان المدونة بالعربية 2",
              en: "Blog Title in English 2",
            },
            description: {
              ar: "وصف المدونة بالعربية 2",
              en: "Blog Description in English 2",
            },
            content: {
              ar: "محتوى المدونة بالعربية 2",
              en: "Blog Content in English 2",
            },
            mainImage:
              "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            cardImage:
              "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            status: "approved",
          },
          {
            id: "3",
            title: {
              ar: "عنوان المدونة بالعربية 3",
              en: "Blog Title in English 3",
            },
            description: {
              ar: "وصف المدونة بالعربية 3",
              en: "Blog Description in English 3",
            },
            content: {
              ar: "محتوى المدونة بالعربية 3",
              en: "Blog Content in English 3",
            },
            mainImage:
              "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            cardImage:
              "https://images.unsplash.com/photo-1749746797402-158123ec2d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            status: "rejected",
          },
        ],
      });
    },
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;

  // Defensive: handle empty or missing blogs
  const blogs = data?.blogs || [];

  // Helper to map backend blog to AdminBlogRequestFormData
  const mapBlogToFormData = (blog: any): AdminBlogRequestFormData => ({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    mainImage: blog.mainImage,
    cardImage: blog.cardImage,
  });

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
              .map((blog: any) => (
                <BlogDetailsWrapper
                  key={blog.id}
                  blogId={blog.id.toString()}
                  initialValues={mapBlogToFormData(blog)}
                  mode="show"
                  blogType="pending"
                />
              ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">مدونات مقبولة</p>
          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {blogs
              .filter((blog: any) => blog.status === "approved")
              .map((blog: any) => (
                <BlogDetailsWrapper
                  key={blog.id}
                  blogId={blog.id.toString()}
                  initialValues={mapBlogToFormData(blog)}
                  mode="show"
                  blogType="accepted"
                />
              ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">مدونات مرفوضة</p>
          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {blogs
              .filter((blog: any) => blog.status === "rejected")
              .map((blog: any) => (
                <BlogDetailsWrapper
                  key={blog.id}
                  blogId={blog.id.toString()}
                  initialValues={mapBlogToFormData(blog)}
                  mode="show"
                  blogType="rejected"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
