import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AddChildFormData } from "@/lib/schemas";

const ChildCard = ({
  noEdit,
  baseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  const childInfo: AddChildFormData = {
    childName: "حلا",
    birthDate: new Date("2020-12-06"),
    fatherName: "محمد",
    motherName: "هاجر",
    gender: "female",
    chronicDiseases: {
      hasDiseases: "yes",
      diseases: [
        {
          name: "الربو",
          medication: "Ventolin",
          procedures: "استخدام البخاخ عند الحاجة",
        },
        {
          name: "حساسية الطعام",
          medication: "مضادات الهيستامين",
          procedures: "تجنب الفول السوداني",
        },
      ],
    },
    childDescription: "الطفل في 3 كلمات",
    favoriteThings: "أشياء يحبها الطفل",
    recommendations: "توصيات تتعلق بالطفل",
    allergies: {
      hasAllergies: "yes",
      allergies: [
        {
          allergyTypes: "الربو",
          allergyFoods: "Ventolin",
          allergyProcedures: "استخدام البخاخ عند الحاجة",
        },
      ],
    },
    authorizedPersons: [
      {
        name: "محمد أحمد",
        idNumber: "1234567890",
      },
      {
        name: "سارة علي",
        idNumber: "0987654321",
      },
    ],
    comments: "يرجى التأكد من هوية الشخص قبل تسليم الطفل",
  };

  return (
    <div className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          {childInfo.gender === "male" ? (
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
            <p className="font-bold text-primary text-xl">
              {childInfo.childName}
            </p>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>تاريخ الميلاد:</span>
              <span>{childInfo.birthDate.toLocaleDateString()}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>الجنس:</span>
              <span>{childInfo.gender}</span>
            </span>
            <span className="font-medium text-mid-gray flex gap-1">
              <span>اسم ولي الأمر:</span>
              <span>{childInfo.fatherName}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild size={"sm"}>
            <Link href={`${baseUrl || "children"}/123`}>عرض ملف الطفل</Link>
          </Button>
          {!noEdit && (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link href={`${baseUrl || "children"}/123/edit`}>
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
            {childInfo.chronicDiseases.diseases &&
            childInfo.chronicDiseases.diseases?.length > 0 ? (
              childInfo.chronicDiseases.diseases?.map((disease) => (
                <span key={disease.name}>{disease.name}</span>
              ))
            ) : (
              <span>لا يوجد</span>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">الحساسية</p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {childInfo.allergies.allergies &&
            childInfo.allergies.allergies.length > 0 ? (
              childInfo.allergies.allergies?.map((allergy) => (
                <span key={allergy.allergyTypes}>{allergy.allergyTypes}</span>
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
            {childInfo.authorizedPersons?.map((person) => (
              <span key={person.name}>
                {person.name} - {person.idNumber}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
