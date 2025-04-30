import Branch from "@/components/forms/dashboard/Branch";

export default async function DashboardEditBranch() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          تعديل فرع
        </h1>
      </div>

      <Branch withValues={true} />
    </div>
  );
}
