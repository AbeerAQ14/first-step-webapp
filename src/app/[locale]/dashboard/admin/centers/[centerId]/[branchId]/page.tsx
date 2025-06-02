import BranchShow from "@/components/forms/dashboard/branches/BranchShow";

export default async function DashboardBranchDetails({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;

  return (
    <div>
      <BranchShow branchId={branchId} />
    </div>
  );
}
