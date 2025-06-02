import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";

export default async function DashboardAddBranch({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-bold text-primary max-w-[39.75rem] mx-auto">
          {locale === "ar" ? "إضافة فرع" : "Add Branch"}
        </h1>
      </div>

      <BranchWrapper mode="add" />
    </div>
  );
}
