import ReportShow from "@/components/forms/dashboard/center-reports/ReportShow";

export default function DailyReportDetails() {
  return (
    <div className="lg:p-4 space-y-6">
      <p className="heading-4 text-primary text-center">تقرير يومي</p>

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
