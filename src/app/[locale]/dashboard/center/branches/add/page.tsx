import Branch from "@/components/forms/dashboard/Branch";
import BranchWrapper from "@/components/forms/dashboard/BranchWrapper";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  neighborhood: "",
  nursery_name: "",
  address: "",
  city: "",
  location: "",
  services: [],
  additional_service: "",
  work_days_from: "",
  work_days_to: "",
  work_hours_from: "",
  work_hours_to: "",
};

export default async function DashboardAddBranch() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          إضافة فرع
        </h1>
      </div>

      <BranchWrapper initialValues={initialValues} mode="add" />
    </div>
  );
}
