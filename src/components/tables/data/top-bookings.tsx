"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  center?: string;
  branch?: string;
  count: string;
  income: number;
};

export const getColumns = ({
  nurseryName,
  branch
}: {
  nurseryName?: boolean;
  branch?: boolean
}): ColumnDef<Booking>[] => {
  const t = useTranslations("dashboard.tables.top-bookings.columns");

  return [
    {
      accessorKey: "id",
      header: () => (
        <div className="text-[.7rem] font-normal text-center">
          {t("arrangement")}
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    ...(nurseryName
      ? [
          {
            accessorKey: "center",
            header: t("nursery"),
          },
        ]
      : []),
    ...(branch
      ? [
          {
            accessorKey: "branch",
            header: t("branch"),
          },
        ]
      : []),
    {
      accessorKey: "count",
      header: t("count"),
    },
    {
      accessorKey: "income",
      header: t("income"),
      cell: ({ row }) => {
        return (
          <div className="space-x-1">
            <span>{row.getValue("income")}</span>
            <span>{t("currency")}</span>
          </div>
        );
      },
    },
  ];
};
