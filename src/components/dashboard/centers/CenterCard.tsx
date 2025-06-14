"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CenterCardType } from "@/hooks/useBranches";

const CenterCard = ({ center }: {center:CenterCardType}) => {

  return (
    <div className="relative bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          <Image
            className="size-20 object-center object-cover rounded-full bg-primary-blue/20"
            src={center.logo || "/assets/logos/instagram-logo.png"}
            width={81.66}
            height={80}
            alt="Nursery Logo"
          />
          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">
              {center.name}
            </p>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>العنوان:</span>
              <span>
                {center.address || "-"}
              </span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>عدد الأطفال:</span>
              <span>{center.childrenCount ?? "-"}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>مجموع الحجوزات:</span>
              <span>{center.bookingsCount ?? "-"}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={`centers/${center.id}`}>عرض الحضانة</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الأعمار المقبولة
          </p>
          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {center.acceptedAges.length > 0 ? (
              Array.isArray(center.acceptedAges) &&
              center.acceptedAges.map((age) => <span key={age}>{age}</span>)
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        <div>
          <p className="mb-1 font-medium text-primary text-xl">الفروع</p>
          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {center.branches.length > 0 ? (
              center.branches.map((branch) => (
                <span key={branch.id}>
                  {branch.name || branch.nursery_name_branch}
                </span>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>

      {/* <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute p-5 top-4 right-4 rtl:right-auto rtl:left-4"
      >
        <Trash2 className="size-5 text-destructive" />
      </Button> */}
    </div>
  );
};

export default CenterCard;
