import ChildShow from "@/components/forms/dashboard/children/ChildShow";

const initialValues = {
  name: "عمرو",
  phone: "رقم الجوال",
  email: "البريد الإلكتروني",
  relation: "صلة القرابة",
  password: "",
  confirmPassword: "",
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

export default async function DashboardAddChild({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = await params;

  return (
    <div>
      <ChildShow initialValues={initialValues} mode="show" />
    </div>
  );
}
