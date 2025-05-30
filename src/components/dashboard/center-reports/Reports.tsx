"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  Report,
  useCenterReportsColumns,
} from "@/components/tables/data/center-reports";
import { DataTable } from "@/components/tables/DataTable";
import { centerService } from "@/services/dashboardApi";
import { ReservationStatus } from "@/components/tables/data/shared/status";

interface DailyReport {
  id: number;
  activities: string;
  meals: string | null;
  nap_time: string | null;
  behavior: string | null;
  notes: string | null;
  created_at: string;
  child: {
    id: number;
    name: string;
    gender: string;
    birthday: string;
  };
  center: {
    id: number;
    name: string;
    location: string;
    phone: string;
    branch: {
      id: number;
      name: string;
    };
  };
  pdf_url: string;
}

interface Parent {
  id: number;
  name: string;
  email: string;
  address: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  national_number: string;
  branch_id: number | null;
  children: Array<{
    id: number;
    user_id: number;
    child_name: string;
    birthday_date: string;
    gender: string;
    disease: number;
    disease_name: string | null;
    medicament_disease: string | null;
    allergy: number;
    parent_name: string;
    mother_name: string;
    recommendations: string;
    created_at: string;
    updated_at: string;
    center_id: number;
    description_3_words: string;
    things_child_likes: string;
    notes: string;
    Kinship: string;
    center_branch_id: number;
  }>;
  enrollments: Array<{
    id: number;
    center_id: number;
    user_id: number;
    center_branch_id: number;
    reservation_number: string;
    parent_phone: string;
    price_amount: string;
    enrollment_type: string;
    hours_per_day: string | null;
    response_speed: string;
    enrollment_date: string;
    status: string;
    created_at: string;
    updated_at: string;
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

const Reports = () => {
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});
  const t = useTranslations("dashboard.tables.center-reports");

  const { data: parentsData, isLoading: isLoadingParents } = useQuery<Parent[]>(
    {
      queryKey: ["parents"],
      queryFn: centerService.getParents,
    }
  );

  const { data: reportsData, isLoading: isLoadingReports } = useQuery<{
    data: DailyReport[];
  }>({
    queryKey: ["daily-reports"],
    queryFn: centerService.getDailyReports,
  });

  // Create a map of child IDs to their latest report IDs
  const reportIdMap = React.useMemo(() => {
    if (!reportsData?.data) return {};

    const map: Record<string, number> = {};
    reportsData.data.forEach((report) => {
      const childId = report.child.id.toString();
      if (
        !map[childId] ||
        new Date(report.created_at) >
          new Date(
            reportsData.data.find((r) => r.id === map[childId])?.created_at ||
              ""
          )
      ) {
        map[childId] = report.id;
      }
    });
    return map;
  }, [reportsData]);

  const columns = useCenterReportsColumns(
    selectedChildMap,
    setSelectedChildMap,
    reportIdMap
  );

  // Transform the data to match the required format
  const transformedData: Report[] = React.useMemo(() => {
    if (!parentsData || !reportsData?.data) return [];

    // Create a map of child IDs to their reports
    const childReportsMap = new Map<number, DailyReport[]>();
    reportsData.data.forEach((report: DailyReport) => {
      const childId = report.child.id;
      if (!childReportsMap.has(childId)) {
        childReportsMap.set(childId, []);
      }
      childReportsMap.get(childId)?.push(report);
    });

    // Transform parents data to include only children with reports
    const reports: Report[] = [];

    parentsData.forEach((parent: Parent) => {
      // Filter children to only include those with reports
      const childrenWithReports = parent.children.filter((child) =>
        childReportsMap.has(child.id)
      );

      // Skip parents with no children that have reports
      if (childrenWithReports.length === 0) return;

      // Get the most recent report date among all children
      const latestReportDate = childrenWithReports.reduce((latest, child) => {
        const childReports = childReportsMap.get(child.id) || [];
        const childLatestReport = childReports[0];
        if (!childLatestReport) return latest;
        const reportDate = childLatestReport.created_at.split(" ")[0]; // Get only the date part
        return !latest || new Date(reportDate) > new Date(latest)
          ? reportDate
          : latest;
      }, "");

      const childs = childrenWithReports.map((child) => {
        return {
          id: child.id.toString(),
          name: child.child_name,
          reservationStatus: mapEnrollmentStatus(
            parent.enrollments?.[0]?.status || "pending"
          ),
        };
      });

      reports.push({
        id: parent.id,
        parentName: parent.name,
        phone: parent.enrollments?.[0]?.parent_phone || "",
        childs,
        reportDate: latestReportDate || new Date().toISOString().split("T")[0],
        reportId: 0, // This is no longer needed since we're using reportIdMap
      });
    });

    return reports;
  }, [parentsData, reportsData]);

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          {t("title")}
        </p>

        <DataTable
          columns={columns}
          data={transformedData}
          isLoading={isLoadingParents || isLoadingReports}
        />
      </div>
    </div>
  );
};

export default Reports;
