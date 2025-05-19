"use client";

import { useBranches } from "@/hooks/useBranches";
import BranchCard from "./BranchCard";
import BranchCardSkeleton from "./BranchCardSkeleton";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Branches = ({
  noEdit,
  baseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  const { data: branches, isLoading, error, refetch } = useBranches();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <BranchCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-red-100 text-red-600 rounded-full p-4 mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-medium text-foreground mb-2">
          لم نتمكن من تحميل الفروع
        </h2>
        <p className="text-mid-gray max-w-md mb-6">
          حدث خطأ غير متوقع أثناء تحميل البيانات. تحقق من اتصالك بالإنترنت، أو
          حاول مرة أخرى لاحقًا.
        </p>
        <Button size={"sm"} onClick={() => refetch()}>
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {branches?.map((branch: any) => (
        <BranchCard
          key={branch.id}
          noEdit={noEdit}
          baseUrl={baseUrl}
          branch={branch}
        />
      ))}
    </div>
  );
};

export default Branches;
