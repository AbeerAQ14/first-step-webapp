import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BranchCardType } from "@/hooks/useBranches";

const BranchCard = ({
  branch,
  noEdit,
  baseUrl,
}: {
  branch: BranchCardType;
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  return (
    <div className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          <Image
            src={branch.imageUrl || "/assets/logos/instagram-logo.png"}
            width={81.66}
            height={80}
            alt="Branch Logo"
          />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">{branch.name}</p>

            <span className="font-medium text-mid-gray">
              <span>العنوان: </span>
              <span>{branch.address}</span>
            </span>

            <span className="font-medium text-mid-gray">
              <span>الأطفال: </span>
              <span>{branch.childrenCount} طفل</span>
            </span>

            <span className="font-medium text-mid-gray">
              <span>مجموع الحجوزات: </span>
              <span>{branch.bookingsCount} حجز</span>
            </span>
          </div>
        </div>

        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={`${baseUrl || "branches"}/${branch.id}`}>
              عرض الفرع
            </Link>
          </Button>
          {!noEdit && (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link href={`${baseUrl || "branches"}/${branch.id}/edit`}>
                تعديل الفرع
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الأعمار المقبولة
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {branch.acceptedAges.map((age) => (
              <span key={age}>{age}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الخدمات المتاحة في الفرع
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {branch.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
