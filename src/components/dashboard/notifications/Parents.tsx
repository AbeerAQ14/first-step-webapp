"use client";

import { Parent, useParentsColumns } from "@/components/tables/data/parents";
import { DataTable } from "@/components/tables/DataTable";
import { useTranslations } from "next-intl";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";
import { ReservationStatus } from "@/types";

interface ApiChild {
  id: number;
  child_name: string;
}

interface ApiParent {
  id: number;
  name: string;
  children: ApiChild[];
  enrollments: Array<{
    parent_phone: string;
    status: string;
    center_branch_id: number;
  }>;
}

// Map enrollment status to ReservationStatus
const mapEnrollmentStatus = (status: string): ReservationStatus => {
  switch (status) {
    case "accepted":
      return "confirmed";
    case "pending":
      return "waitingForConfirmation";
    case "rejected":
      return "rejected";
    default:
      return "waitingForConfirmation";
  }
};

const Parents = ({
  selected,
  setSelected,
  selectedChildMap,
  setSelectedChildMap,
}: {
  selected: Parent[];
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  selectedChildMap: Record<number, string>;
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
}) => {
  const t = useTranslations("dashboard.tables.parents");
  const columns = useParentsColumns(selectedChildMap, setSelectedChildMap);

  const { data: parentsData, isLoading } = useQuery<ApiParent[]>({
    queryKey: ["parents"],
    queryFn: centerService.getParents,
  });

  // Transform the data to match the required format
  const transformedData: Parent[] = React.useMemo(() => {
    if (!parentsData) return [];

    return parentsData.map((parent: ApiParent) => ({
      id: parent.id,
      parentName: parent.name,
      phone: parent.enrollments?.[0]?.parent_phone || "",
      childs: parent.children.map((child: ApiChild) => ({
        id: child.id.toString(),
        name: child.child_name,
        reservationStatus: mapEnrollmentStatus(
          parent.enrollments?.[0]?.status || "pending"
        ),
        branch: parent.enrollments?.[0]?.center_branch_id?.toString() || "",
      })),
    }));
  }, [parentsData]);

  return (
    <div>
      <div className="lg:p-4 space-y-1">
        <p className="heading-4 text-primary text-center">{t("title")}</p>

        <DataTable
          setSelected={setSelected}
          columns={columns}
          data={transformedData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Parents;
