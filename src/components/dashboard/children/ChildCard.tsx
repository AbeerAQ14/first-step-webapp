import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Child } from "@/types";

const ChildCard = ({
  child,
  noEdit,
  baseUrl,
  absoluteBaseUrl,
}: {
  child: Child;
  noEdit?: boolean;
  baseUrl?: string;
  absoluteBaseUrl?: string;
}) => {
  const token = localStorage.getItem("auth token");

  return (
    <div className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          {child.gender === "boy" ? (
            <Image
              src="/assets/illustrations/boy.png"
              alt="Boy"
              width={91.32}
              height={120}
            />
          ) : (
            <Image
              src="/assets/illustrations/girl.png"
              alt="Girl"
              width={84.74}
              height={120}
            />
          )}

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">{child.child_name}</p>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>تاريخ الميلاد:</span>
              <span>
                {child.birthday_date
                  ? new Date(child.birthday_date).toLocaleDateString()
                  : "-"}
              </span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>الجنس:</span>
              <span>{child.gender}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>اسم ولي الأمر:</span>
              <span>{child.parent_name}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild size={"sm"}>
            <Link
              href={`${absoluteBaseUrl || baseUrl || "children"}/${child.id}`}
            >
              عرض ملف الطفل
            </Link>
          </Button>
          {!noEdit && (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link
                href={`${absoluteBaseUrl || baseUrl || "children"}/${
                  child.id
                }/edit`}
              >
                تعديل ملف الطفل
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الأمراض المزمنة
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {(() => {
              let diseases = [];
              if (
                typeof child.disease_details === "string" &&
                child.disease_details.trim() !== ""
              ) {
                try {
                  diseases = JSON.parse(child.disease_details);
                } catch {
                  diseases = [];
                }
              } else if (Array.isArray(child.disease_details)) {
                diseases = child.disease_details;
              }
              return diseases.length > 0 ? (
                <span>{diseases[0]?.disease_name}</span>
              ) : (
                <span>لا يوجد</span>
              );
            })()}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">الحساسية</p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {child.allergies?.length > 0 ? (
              child.allergies.map((allergy) => (
                <span key={allergy.id}>{allergy.name}</span>
              ))
            ) : (
              <span>لا يوجد</span>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            الأشخاص المفوضة
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {child.authorized_people?.length > 0 ? (
              child.authorized_people.map((person) => (
                <span key={person.cin}>
                  {person.name} - {person.cin}
                </span>
              ))
            ) : (
              <span>لا يوجد</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
