import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Trash2 } from "lucide-react";

const ParentCard = () => {
  const childrenCound = 3;

  const childrenNames = ["منة ", "زياد", "عمرو", "هبة"];

  return (
    <div className="relative bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-2 lg:gap-4">
          <p className="font-bold text-primary text-xl">اسم ولي الأمر</p>
          <span className="font-medium text-mid-gray flex gap-1">
            <span>رقم الجوال:</span>
            <span>21548456123</span>
          </span>
          <span className="font-medium text-mid-gray flex gap-1">
            <span>البريد الإلكتروني:</span>
            <span>mennaemara31@gmail.com</span>
          </span>
          <span className="font-medium text-mid-gray flex gap-1">
            <span>رقم الهوية:</span>
            <span>54587645123456</span>
          </span>
        </div>

        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={"parents/123"}>عرض ولي الأمر</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">عدد الأطفال</p>

          <span className="font-medium text-mid-gray">
            {childrenCound} أطفال
          </span>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">أسماء الأطفال</p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {childrenNames.map((child) => (
              <span key={child}>{child}</span>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute p-5 top-4 right-4 rtl:right-auto rtl:left-4"
      >
        <Trash2 className="size-5 text-destructive" />
      </Button>
    </div>
  );
};

export default ParentCard;
