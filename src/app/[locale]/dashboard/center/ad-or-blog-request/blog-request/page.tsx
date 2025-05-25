import BlogRequestForm from "@/components/forms/dashboard/adblog-request/BlogRequest";
import { useTranslations } from "next-intl";

export default function CenterBlogRequest() {
  const t = useTranslations("dashboard.center.ad-or-blog-request.blog");

  return (
    <div className="p-10 flex flex-col gap-y-4">
      <div className="space-y-2">
        <p className="heading-4 font-medium text-primary">{t("title")}</p>
        <p className="text-info">{t("description")}</p>
      </div>

      <BlogRequestForm />
    </div>
  );
}
