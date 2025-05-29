"use client";

import {
  Booking,
  useCenterBookingsColumns,
} from "@/components/tables/data/center-bookings";
import { DataTable } from "@/components/tables/DataTable";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";

const transformEnrollmentsData = (data: any): Booking[] => {
  return data.data
    .map((parent: any) => {
      // Filter children that have enrollments
      const childrenWithEnrollments = parent.children.filter(
        (child: any) => child.enrollments.length > 0
      );

      // Create bookings for each child's enrollments
      return childrenWithEnrollments.flatMap((child: any) =>
        child.enrollments.map((enrollment: any) => ({
          id: enrollment.enrollment_id,
          parentName: parent.parent_name,
          childs: [
            {
              id: child.child_id.toString(),
              name: child.child_name,
              reservationStatus: enrollment.status,
            },
          ],
          branch: enrollment.branch_name,
          startDate: enrollment.enrollment_date,
          endDate: enrollment.enrollment_date, // You might want to calculate this based on enrollment_type
          amount: parseFloat(enrollment.price_amount),
        }))
      );
    })
    .flat();
};

const Bookings = () => {
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});
  const t = useTranslations("dashboard.center-bookings");
  const columns = useCenterBookingsColumns(
    selectedChildMap,
    setSelectedChildMap
  );

  const { data: enrollmentsData, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: centerService.getEnrollments,
  });

  const bookingsData = enrollmentsData
    ? transformEnrollmentsData(enrollmentsData)
    : [];

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          {t("title")}
        </p>

        <DataTable
          columns={columns}
          data={bookingsData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Bookings;
