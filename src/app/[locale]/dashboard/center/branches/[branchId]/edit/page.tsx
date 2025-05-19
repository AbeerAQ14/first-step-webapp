import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";

export default async function DashboardEditBranch({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;

  const initialValues = {
    name: "خالد العبدالله",
    email: "Khaled.Alabdullah@example.sa",
    phone: "557891234",
    neighborhood: "حي النخيل",
    nursery_name: "روضة أجيال المستقبل",
    address: "شارع الأمير سلطان",
    city: "الرياض",
    location: "https://maps.google.com/?q=24.7136,46.6753",
    services: ["kindergarten", "care"],
    additional_service: "دروس إضافية في اللغة الإنجليزية",
    work_days_from: "sunday",
    work_days_to: "thursday",
    work_hours_from: "07:00",
    work_hours_to: "15:00",
  };

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          تعديل فرع
        </h1>
      </div>

      <BranchWrapper editBranchId={branchId} mode="edit" />
    </div>
  );
}
