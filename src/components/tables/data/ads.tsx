"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ReservationStatus, useReservationStatus } from "./shared/status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Ad = {
  id: number;
  type: "free" | "paid";
  startDate: string;
  endDate: string;
  branch: string;
  amount: number;
  reservationStatus: ReservationStatus;
};

export function useAdsColumns() {
  const t = useTranslations("dashboard.tables.ads");
  const { getStatusText, getStatusColorClass } = useReservationStatus();

  // Function to get the type text
  function getType(type: Ad["type"]): string {
    return t(`types.${type}`);
  }

  const columns: ColumnDef<Ad>[] = [
    {
      accessorKey: "AdNumber",
      header: () => (
        <div className="text-[.7rem] font-normal text-center">
          {t("headers.adNumber")}
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "type",
      header: () => t("headers.type"),
      cell: ({ row }) => {
        return (
          <div>
            <span>{getType(row.getValue("type"))}</span>
          </div>
        );
      },
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
      accessorKey: "reservationStatus",
      header: () => t("headers.reservationStatus"),
      cell: ({ row }) => {
        const value = row.getValue(
          "reservationStatus"
        ) as Ad["reservationStatus"];
        const colorClasses = getStatusColorClass(value);
        const text = getStatusText(value);

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
