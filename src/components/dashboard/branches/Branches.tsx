"use client";

import { useBranches } from "@/hooks/useBranches";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboard.center.branches");
  const { data: branches, isLoading, error, refetch } = useBranches(baseUrl);

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
          {t("error.title")}
        </h2>
        <p className="text-mid-gray max-w-md mb-6">{t("error.description")}</p>
        <Button size={"sm"} onClick={() => refetch()}>
          {t("error.retry")}
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
