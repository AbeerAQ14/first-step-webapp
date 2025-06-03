"use client";

import ChildCard from "./ChildCard";
import { useQuery } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";
import { Child } from "@/types";

const Children = ({
  noEdit,
  baseUrl,
  absoluteBaseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
  absoluteBaseUrl?: string;
}) => {
  const { data: children = [], isLoading } = useQuery<Child[]>({
    queryKey: ["parent-children"],
    queryFn: centerService.getParentChildren,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {children.map((child) => (
        <ChildCard
          key={child.id}
          child={child}
          noEdit={noEdit}
          baseUrl={baseUrl}
          absoluteBaseUrl={absoluteBaseUrl}
        />
      ))}
    </div>
  );
};

export default Children;
