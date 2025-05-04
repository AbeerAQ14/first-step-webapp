import ChildShow from "@/components/forms/dashboard/ChildShow";

// const initialValues = {
//   name: "",
//   phone: "",
//   email: "",
//   relation: "",
//   password: "",
//   confirmPassword: "",
//   childName: "",
//   birthDate: new Date(),
//   fatherName: "",
//   motherName: "",
//   gender: undefined,
//   chronicDiseases: {
//     hasDiseases: "yes",
//     diseases: [{ name: "", medication: "", procedures: "" }],
//   },
//   childDescription: "",
//   favoriteThings: "",
//   recommendations: "",
//   allergies: {
//     hasAllergies: "yes",
//     allergies: [{ allergyTypes: "", allergyFoods: "", allergyProcedures: "" }],
//   },
//   authorizedPersons: [
//     {
//       name: "",
//       idNumber: "",
//     },
//   ],
//   comments: "",
// };

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

export default async function DashboardAddChild() {
  return (
    <div>
      <ChildShow initialValues={initialValues} mode="show" />
    </div>
  );
}
