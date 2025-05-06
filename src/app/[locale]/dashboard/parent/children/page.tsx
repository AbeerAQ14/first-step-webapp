import ChildrenCards from "@/components/dashboard/children/Children";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function Children() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-end">
        <h1 className="sr-only heading-4 font-medium text-primary">الأطفال</h1>

        <Button asChild size={"sm"} variant={"default"}>
          <Link href={"children/add"}>إضافة طفل</Link>
        </Button>
      </div>

      <ChildrenCards />
    </div>
  );
}
