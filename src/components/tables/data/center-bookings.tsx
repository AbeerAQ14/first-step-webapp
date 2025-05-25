"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ReservationStatus, useReservationStatus } from "./shared/status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  parentName: string;
  childs: { id: string; name: string; reservationStatus: ReservationStatus }[];
  branch: string;
  startDate: string;
  endDate: string;
  amount: number;
};

export function useCenterBookingsColumns(
  selectedChildMap: Record<number, string>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >
) {
  const t = useTranslations("dashboard.tables.center-bookings");
  const { getStatusText, getStatusColorClass } = useReservationStatus();
  const sharedT = useTranslations("dashboard.tables.shared.status");

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
    },
    {
      accessorKey: "endDate",
      header: () => t("headers.endDate"),
    },
    {
      accessorKey: "childs",
      header: () => t("headers.child"),
      cell: ({ row }) => {
        const parentId = row.original.id;
        const childs = row.original.childs;

        const selectedValue = selectedChildMap[parentId] ?? childs[0]?.id ?? "";

        return (
          <select
            className="text-xs px-2 py-1 rounded bg-info text-white"
            value={selectedValue}
            onChange={(e) =>
              setSelectedChildMap((prev) => ({
                ...prev,
                [parentId]: e.target.value,
              }))
            }
          >
            {childs.map((child) => (
              <option key={child.id} value={child.id}>
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
    },
    {
      accessorKey: "amount",
      header: () => t("headers.amount"),
      cell: ({ row }) => {
        return (
          <div className="space-x-1 rtl:space-x-reverse">
            <span>{row.getValue("amount")}</span>
            <span>{t("currency")}</span>
          </div>
        );
      },
    },
    {
      id: "reservationStatus",
      header: () => t("headers.reservationStatus"),
      cell: ({ row }) => {
        const parent = row.original;
        const selectedChildId =
          selectedChildMap[parent.id] ?? parent.childs[0]?.id;
        const selectedChild = parent.childs.find(
          (child) => child.id === selectedChildId
        );

        const status = selectedChild?.reservationStatus;
        const colorClasses = status ? getStatusColorClass(status) : "";
        const text = status ? getStatusText(status) : sharedT("selectChild");

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
