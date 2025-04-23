import { Button } from "@/components/ui/button";
import Branches from "@/components/dashboard/branches/Branches";

export default async function CenterDashboardHome() {
  return (
    <div className="px-4 md:px-10">
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-medium text-primary">الفروع</h1>

        <Button size={"sm"} variant={"outline"}>
          إضافة فرع
        </Button>
      </div>

      <Branches />
    </div>
  );
}
