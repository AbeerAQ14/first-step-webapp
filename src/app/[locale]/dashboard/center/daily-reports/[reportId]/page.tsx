import ReportShow from "@/components/forms/dashboard/center-reports/ReportShow";
import { useTranslations } from "next-intl";

export default async function DailyReportDetails({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const t = useTranslations("dashboard.center-reports.report");

  return (
    <div className="lg:p-4 space-y-6">
      <p className="heading-4 text-primary text-center">{t("title")}</p>

      <ReportShow
        initialValues={{
          activities: "تدريب بيانو",
          behavior: "كان هادئًا",
          meals: "وجبة غداء صحية",
          napTime: "ساعة واحدة",
          additionalNotes: "لا توجد ملاحظات",
          recipients: [],
        }}
      />
    </div>
  );
}
