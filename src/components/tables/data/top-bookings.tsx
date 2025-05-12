"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  center: string;
  branch: string;
  count: string;
  income: number;
};

export const getColumns = ({
  nurseryName,
}: {
  nurseryName?: boolean;
}): ColumnDef<Booking>[] => [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">Arrangement</div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  ...(nurseryName
    ? [
        {
          accessorKey: "center",
          header: "Nursery Name",
        },
      ]
    : []),
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "count",
    header: "Booking Count",
  },
  {
    accessorKey: "income",
    header: "Income",
    cell: ({ row }) => {
      return (
        <div className="space-x-1">
          <span>{row.getValue("income")}</span>
          <span>ر.س</span>
        </div>
      );
    },
  },
];
