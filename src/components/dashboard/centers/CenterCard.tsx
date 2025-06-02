import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Trash2 } from "lucide-react";
import Image from "next/image";

const CenterCard = () => {
  const acceptedAges = {
    "0-3": "من سن 0 إلى 3 سنوات",
    "3-6": "من سن 3 إلى 6  سنوات",
  };

  const services = ["فرع مكة ", "فرع المدينة", "فرع الرياض", "فرع جدة"];

  return (
    <div className="relative bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          <Image
            src="/assets/logos/instagram-logo.png"
            width={81.66}
            height={80}
            alt="Nersery Logo"
          />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">اسم الحضانة</p>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>العنوان:</span>
              <span>السعودية ،المدينة، الحي، الشارع، رقم البناية</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>سعة الحضانة:</span>
              <span>50 طفل</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>مجموع الحجوزات:</span>
              <span>70 حجز</span>
            </span>
          </div>
        </div>

        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={"centers/123"}>عرض الحضانة</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الأعمار المقبولة
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {Object.keys(acceptedAges).map((item) => (
              <span key={item}>
                {acceptedAges[item as keyof typeof acceptedAges]}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">الفروع</p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {services.map((service) => (
              <span key={service}>{service}</span>
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

export default CenterCard;
