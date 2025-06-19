"use client";

import { adminService } from "@/services/dashboardApi";
import ChildCard from "./ChildCard";
import { useQuery } from "@tanstack/react-query";
import { parentService } from "@/services/dashboardApi";
import { Child as ChildType } from "@/types";
import ChildrenSkeleton from "./ChildrenSkeleton";
import { useHasRole } from "@/store/authStore";

interface Child {
  id: number;
  child_name: string;
  birthday_date: string;
  gender: string;
  user: {
    name: string;
  };
  disease_details: Array<{
    disease_name: string;
    medicament: string;
    emergency: string;
  }>;
  allergies: Array<{
    id: number;
    name: string;
    allergy_causes: string[];
    allergy_emergency: string;
  }>;
  authorized_people: Array<{
    id: number;
    name: string;
    cin: string;
  }>;
}

const Children = ({
  noEdit,
  baseUrl,
  absoluteBaseUrl,
  childrenData,
}: {
  noEdit?: boolean;
  baseUrl?: string;
  absoluteBaseUrl?: string;
  childrenData?: { userName: string; children: Child[] };
}) => {
  const isAdmin = useHasRole("admin");

  // Use the appropriate query based on the user's role
  const { data: childrenDataResult = [], isLoading: isLoadingChildren } =
    useQuery<Child[]>({
      queryKey: [isAdmin ? "children" : "parent-children"],
      queryFn: isAdmin
        ? adminService.getChildren
        : parentService.getParentChildren,
      enabled: !childrenData,
    });

  if (isLoadingChildren) {
    return <ChildrenSkeleton />;
  }

  const childrenToRender = childrenData?.children || childrenDataResult;

  if (!childrenToRender && isLoadingChildren) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {childrenToRender?.map((child) => (
        <ChildCard
          key={child.id}
          id={child.id}
          name={child.child_name}
          birthday={child.birthday_date}
          gender={child.gender}
          userName={childrenData?.userName || child.user?.name}
          disease_details={
            Array.isArray(child.disease_details) ? child.disease_details : []
          }
          allergies={child.allergies || []}
          authorized_people={child.authorized_people || []}
          noEdit={noEdit}
          baseUrl={baseUrl}
          absoluteBaseUrl={absoluteBaseUrl}
        />
      ))}
    </div>
  );
};

export default Children;
