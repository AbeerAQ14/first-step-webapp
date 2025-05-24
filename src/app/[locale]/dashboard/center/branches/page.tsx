import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Branches from "@/components/dashboard/branches/Branches";

export default async function CenterDashboardHome() {
  const t = useTranslations("dashboard.center.branches");

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-medium text-primary">{t("title")}</h1>

        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={"branches/add"}>{t("add")}</Link>
        </Button>
      </div>

      <Branches />
    </div>
  );
}
