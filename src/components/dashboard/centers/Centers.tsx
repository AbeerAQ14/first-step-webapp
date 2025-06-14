"use client";

import CenterCard from "./CenterCard";
import { useCenters } from "@/hooks/useBranches";

const Centers = () => {
  const {
    data: centers,
    isLoading,
    error,
    refetch
  } = useCenters()

  console.log(error)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>حدث خطأ أثناء تحميل الحضانات</div>;

  return (
    <div className="flex flex-col gap-4">
      {centers.map((center: any) => (
        <CenterCard key={center.id} center={center} />
      ))}
    </div>
  );
};

export default Centers;
