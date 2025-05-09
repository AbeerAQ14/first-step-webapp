import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const BranchCard = () => {
  const acceptedAges = {
    "0-3": "من سن 0 إلى 3 سنوات",
    "3-6": "من سن 3 إلى 6  سنوات",
  };

  const services = ["توفير وجبات ", "رعاية رضع", "تعليم الرسم", "دعم نفسي"];

  return (
    <div className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          <Image
            src="/assets/logos/instagram-logo.png"
            width={81.66}
            height={80}
            alt="Nersery Logo"
          />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">اسم الفرع</p>
            <span className="font-medium text-mid-gray">
              العنوان: السعودية ،المدينة، الحي، الشارع، رقم البناية
            </span>
            <span className="font-medium text-mid-gray">الأطفال: 50 طفل</span>
            <span className="font-medium text-mid-gray">
              مجموع الحجوزات: 70 حجز
            </span>
          </div>
        </div>

        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={"branches/123"}>عرض الفرع</Link>
          </Button>
          <Button asChild size={"sm"} variant={"outline"}>
            <Link href={"branches/123/edit"}>تعديل الفرع</Link>
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
          <p className="mb-1 font-medium text-primary text-xl">
            الخدمات المتاحة في الفرع
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
