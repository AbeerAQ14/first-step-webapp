import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";

export default async function DashboardEditBranch({
  params,
}: {
  params: Promise<{ branchId: string; locale: "ar" | "en" }>;
}) {
  const { locale } = await params;
  const { branchId } = await params;

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          {locale === "ar" ? "تعديل فرع" : "Edit Branch"}
        </h1>
      </div>

      <BranchWrapper editBranchId={branchId} mode="edit" />
    </div>
  );
}
