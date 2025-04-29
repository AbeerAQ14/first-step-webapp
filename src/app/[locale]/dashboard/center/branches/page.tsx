import { Button } from "@/components/ui/button";
import Branches from "@/components/dashboard/branches/Branches";
import { Link } from "@/i18n/navigation";

export default async function CenterDashboardHome() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-medium text-primary">الفروع</h1>

        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={"branches/add"}>إضافة فرع</Link>
        </Button>
      </div>

      <Branches />
    </div>
  );
}
