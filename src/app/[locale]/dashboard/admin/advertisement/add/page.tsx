import CenterAdRequest from "@/components/forms/dashboard/adblog-request/CenterAdRequest";
import { useTranslations } from "next-intl";

export default function AdminAdRequestPage() {
  const t = useTranslations("dashboard.center.ad-or-blog-request.ad");

  return (
    <div>
      <div className="p-10 flex flex-col gap-y-4">
        <div className="space-y-2">
          <p className="heading-4 font-medium text-primary">{t("title")}</p>
          <p className="text-mid-gray">{t("description")}</p>
        </div>

        <CenterAdRequest />
      </div>
    </div>
  );
}
