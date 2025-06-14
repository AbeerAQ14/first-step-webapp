import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface ChildCardProps {
  id: number;
  name: string;
  birthday: string;
  gender: string;
  userName: string;
  disease_details: Array<{
    disease_name: string;
    medicament: string;
    emergency: string;
  }>;
  allergies: Array<{
    id: number;
    name: string;
    allergy_causes: string[];
    allergy_emergency: string;
  }>;
  authorized_people: Array<{
    id: number;
    name: string;
    cin: string;
  }>;
  noEdit?: boolean;
  baseUrl?: string;
  absoluteBaseUrl?: string;
}

const ChildCard = ({
  id,
  name,
  birthday,
  gender,
  userName,
  disease_details,
  allergies,
  authorized_people,
  noEdit,
  baseUrl,
  absoluteBaseUrl,
}: ChildCardProps) => {
  return (
    <div className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          {gender === "boy" ? (
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
            <p className="font-bold text-primary text-xl">{name}</p>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>تاريخ الميلاد:</span>
              <span>{new Date(birthday).toLocaleDateString()}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>الجنس:</span>
              <span>{gender === "boy" ? "ذكر" : "أنثى"}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>اسم ولي الأمر:</span>
              <span>{userName}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild size={"sm"}>
            <Link href={`${absoluteBaseUrl || baseUrl || "children"}/${id}`}>
              عرض ملف الطفل
            </Link>
          </Button>
          {!noEdit && (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link
                href={`${absoluteBaseUrl || baseUrl || "children"}/${id}/edit`}
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
            {disease_details && disease_details.length > 0 ? (
              disease_details.map((disease) => (
                <span key={disease.disease_name}>{disease.disease_name}</span>
              ))
            ) : (
              <span>لا يوجد</span>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">الحساسية</p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {allergies && allergies.length > 0 ? (
              allergies.map((allergy) => (
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
            {authorized_people?.map((person) => (
              <span key={person.id}>
                {person.name} - {person.cin}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
