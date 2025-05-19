"use client";

import { useBranches } from "@/hooks/useBranches";
import BranchCard from "./BranchCard";

const Branches = ({
  noEdit,
  baseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  const { data: branches, isLoading, error } = useBranches();

  if (isLoading) return <div>Loading branches...</div>;
  if (error) return <div>Failed to load branches.</div>;

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
