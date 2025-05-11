import Branches from "@/components/dashboard/branches/Branches";

export default async function CenterBranches({
  params,
}: {
  params: Promise<{ centerId: string }>;
}) {
  const { centerId } = await params;

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="heading-4 font-medium text-primary">الفروع</h1>
      </div>

      <Branches noEdit baseUrl={centerId} />
    </div>
  );
}
