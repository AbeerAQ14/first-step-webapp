"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ReservationStatus, useReservationStatus } from "./shared/status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  parentName: string;
  childs: {
    id: string;
    name: string;
    enrollmentId: string;
    status: string;
    branch: string;
    startDate: string;
    endDate: string;
    amount: number;
  }[];
  branch: string;
  startDate: string;
  endDate: string;
  amount: number;
};

export interface SelectedChild {
  enrollmentId: string;
  status: ReservationStatus;
  branch: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export function useCenterBookingsColumns(
  selectedChildMap: Record<number, SelectedChild>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, SelectedChild>>
  >
) {
  const t = useTranslations("dashboard.tables.center-bookings");
  const { getStatusText, getStatusColorClass } = useReservationStatus();

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "childNumber",
      header: () => (
        <div className="text-[.7rem] font-normal text-center">
          {t("headers.childNumber")}
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "parentName",
      header: () => t("headers.parentName"),
    },
    {
      accessorKey: "startDate",
      header: () => t("headers.startDate"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const selectedChild = selectedChildMap[parentId];
        return selectedChild?.startDate ?? row.original.startDate;
      },
    },
    {
      accessorKey: "endDate",
      header: () => t("headers.endDate"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const selectedChild = selectedChildMap[parentId];
        return selectedChild?.endDate ?? row.original.endDate;
      },
    },
    {
      accessorKey: "childs",
      header: () => t("headers.child"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const childs = row.original.childs;

        const selectedChild = selectedChildMap[parentId] ?? {
          enrollmentId: childs[0]?.enrollmentId ?? "",
          status: childs[0]?.status ?? "",
          branch: childs[0]?.branch ?? "",
          startDate: childs[0]?.startDate ?? "",
          endDate: childs[0]?.endDate ?? "",
          amount: childs[0]?.amount ?? 0,
        };

        return (
          <select
            className="text-xs px-2 py-1 rounded bg-info text-white"
            value={selectedChild.enrollmentId}
            onChange={(e) => {
              const childId = e.target.value;
              const child = childs.find((c) => c.enrollmentId === childId);
              if (child) {
                setSelectedChildMap((prev) => ({
                  ...prev,
                  [parentId]: {
                    enrollmentId: child.enrollmentId,
                    status: child.status as ReservationStatus,
                    branch: child.branch,
                    startDate: child.startDate,
                    endDate: child.endDate,
                    amount: child.amount,
                  },
                }));
              }
            }}
          >
            {childs.map((child) => (
              <option key={child.enrollmentId} value={child.enrollmentId}>
                {child.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      accessorKey: "branch",
      header: () => t("headers.branch"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const selectedChild = selectedChildMap[parentId];
        return selectedChild?.branch ?? row.original.branch;
      },
    },
    {
      accessorKey: "amount",
      header: () => t("headers.amount"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const selectedChild = selectedChildMap[parentId];
        const amount = selectedChild?.amount ?? row.original.amount;
        return (
          <div className="space-x-1 rtl:space-x-reverse">
            <span>{amount}</span>
            <span>{t("currency")}</span>
          </div>
        );
      },
    },
    {
      id: "reservationStatus",
      header: () => t("headers.reservationStatus"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const childs = row.original.childs;
        const selectedChild = selectedChildMap[parentId] ?? {
          status: childs[0]?.status ?? "",
        };

        const status = selectedChild.status as ReservationStatus;
        const colorClasses = getStatusColorClass(status);
        const text = getStatusText(status);

        return (
          <div
            className={`text-xs w-fit px-2 py-1 rounded-[4px] select-none ${colorClasses}`}
          >
            {text}
          </div>
        );
      },
    },
  ];

  return columns;
}
