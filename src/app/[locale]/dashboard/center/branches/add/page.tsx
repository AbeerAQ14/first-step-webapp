import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";

export default async function DashboardAddBranch() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          إضافة فرع
        </h1>
      </div>

      <BranchWrapper mode="add" />
    </div>
  );
}
