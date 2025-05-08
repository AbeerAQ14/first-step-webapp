import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Reports from "@/components/dashboard/center-reports/Reports";

export default function DailyReports() {
  return (
    <div className="lg:p-4 space-y-1">
      <p className="heading-4 text-primary text-center">التقارير</p>

      <Reports />

      <div className="mt-4 flex justify-center">
        <Button asChild size={"sm"}>
          <Link href="daily-reports/send">إرسال تقرير</Link>
        </Button>
      </div>
    </div>
  );
}
