import AdDetailsWrapper from "@/components/dashboard/advertisement/AdDetailsWrapper";
import { AdRequestFormData } from "@/lib/schemas";

export default async function AdvertisementDetails({
  params,
}: {
  params: Promise<{ adId: string }>;
}) {
  const { adId } = await params;

  const initialValues: AdRequestFormData & { id: string } = {
    id: "1",
    title: "تجربة ١",
    description: "هذا وصف لتجربة ١",
    image:
      "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    start_date: new Date(),
    end_date: new Date(),
  };

  return (
    <div>
      <AdDetailsWrapper adId={adId} initialValues={initialValues} mode="show" />
    </div>
  );
}
