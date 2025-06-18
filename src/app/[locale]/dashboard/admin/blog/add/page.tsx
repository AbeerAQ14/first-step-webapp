"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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
    </div>
  );
}
