import NotificationForm from "@/components/dashboard/notifications/NotificationForm";
import Parents from "@/components/dashboard/notifications/Parents";
import { Button } from "@/components/ui/button";

export default function CenterDashboardNotifications() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col items-center gap-y-6">
        <div className="mb-2 w-full flex flex-col gap-y-6">
          <h1 className="heading-4 font-medium text-primary">
            جدولة الإشعارات
          </h1>

          <NotificationForm />
        </div>

        <div>
          <Parents />
        </div>

        <Button size={"sm"}>إرسال الإشعار</Button>
      </div>
    </div>
  );
}
