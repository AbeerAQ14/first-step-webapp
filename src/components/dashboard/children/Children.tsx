"use client";

import ChildCard from "./ChildCard";
import { useQuery } from "@tanstack/react-query";
import { parentService } from "@/services/dashboardApi";
import { Child } from "@/types";
import ChildrenSkeleton from "./ChildrenSkeleton";

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
    queryFn: parentService.getParentChildren,
  });

  if (isLoading) {
    return <ChildrenSkeleton />;
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
