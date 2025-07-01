"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminBlogForm from "@/components/forms/dashboard/blog/AdminBlogForm";
import { adminService } from "@/services/dashboardApi";
import { toast } from "sonner";
import { AdminBlogRequestFormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

export default function AdminBlogAddPage() {
  const t = useTranslations("dashboard.admin.blog.add");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: AdminBlogRequestFormData) => {
    try {
      setLoading(true);
      await adminService.createBlog({
        titleAr: data.title.ar,
        titleEn: data.title.en,
        descriptionAr: data.description.ar,
        descriptionEn: data.description.en,
        contentAr: data.content.ar,
        contentEn: data.content.en,
        mainImage: data.mainImage?.[0] as File,
        cardImage: data.cardImage?.[0] as File,
      });
      toast(t("success"));
      router.back();
    } catch (error) {
      toast(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return <AdminBlogForm onSubmit={handleSubmit} loading={loading} />;
}
