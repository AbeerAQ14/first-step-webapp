import ChildWrapper from "@/components/forms/dashboard/children/ChildWrapper";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  relation: "",
  password: "",
  confirmPassword: "",
  childName: "",
  birthDate: undefined,
  fatherName: "",
  motherName: "",
  gender: undefined,
  chronicDiseases: {
    hasDiseases: "yes",
    diseases: [{ name: "", medication: "", procedures: "" }],
  },
  childDescription: "",
  favoriteThings: "",
  recommendations: "",
  allergies: {
    hasAllergies: "yes",
    allergies: [{ allergyTypes: "", allergyFoods: "", allergyProcedures: "" }],
  },
  authorizedPersons: [
    {
      name: "",
      idNumber: "",
    },
  ],
  comments: "",
};

export default async function AddChild() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          إضافة فرع
        </h1>
      </div>

      <ChildWrapper initialValues={initialValues} mode="add" />
    </div>
  );
}
