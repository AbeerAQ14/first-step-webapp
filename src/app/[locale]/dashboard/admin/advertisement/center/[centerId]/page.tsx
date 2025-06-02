import CenterAdsListing from "@/components/dashboard/advertisement/CenterAdsListing";

export default async function CenterAdvertisements({
  params,
}: {
  params: Promise<{ centerId: string }>;
}) {
  const { centerId } = await params;

  return (
    <div>
      <CenterAdsListing />
    </div>
  );
}
