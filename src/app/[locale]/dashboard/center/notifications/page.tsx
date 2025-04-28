import NotificationForm from "@/components/dashboard/notifications/NotificationForm";
import Parents from "@/components/dashboard/notifications/Parents";

export default function CenterDashboardNotifications() {
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="heading-4 font-medium text-primary">
            جدولة الإشعارات
          </h1>

          <NotificationForm />
        </div>

        <div className="mt-6">
          <Parents />
        </div>
      </div>
    </div>
  );
}
