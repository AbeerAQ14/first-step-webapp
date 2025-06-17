"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import AdminBlogRequestForm from "@/components/forms/dashboard/adblog-request/AdminBlogRequest";
import { Loader2 } from "lucide-react";

export default function BlogAddPage() {
  const router = useRouter();
  const t = useTranslations("dashboard.center.ad-or-blog-request.blog");

  return (
    <div className="p-10 flex flex-col gap-y-4">
      <div className="space-y-2">
        <p className="heading-4 font-medium text-primary">{t("title")}</p>
        <p className="text-info">{t("description")}</p>
      </div>

      <AdminBlogRequestForm>
        {(data, isValid, isSubmitting) => (
          <>
            <Button size={"sm"} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارى الإرسال
                </>
              ) : (
                "أرسل"
              )}
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="!border-light-gray text-mid-gray"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
          </>
        )}
      </AdminBlogRequestForm>
    </div>
  );
}
