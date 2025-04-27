"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Ad = {
  id: number;
  type: "free" | "paid";
  startDate: string;
  endDate: string;
  branch: string;
  amount: number;
  reservationStatus:
    | "confirmed"
    | "waitingForPayment"
    | "waitingForConfirmation"
    | "rejected";
};

// Function to get the status text in Arabic
function getStatusText(status: Ad["reservationStatus"]): string {
  switch (status) {
    case "confirmed":
      return "تم الدفع";
    case "waitingForPayment":
      return "في انتظار الدفع";
    case "waitingForConfirmation":
      return "في انتظار التأكيد";
    case "rejected":
      return "مرفوض";
    default:
      return "";
  }
}

// Function to get the type text in Arabic
function getType(type: Ad["type"]): string {
  switch (type) {
    case "free":
      return "مجاني";
    case "paid":
      return "مدفوع";
    default:
      return "";
  }
}

// Function to get the status color class
function getStatusColorClass(status: Ad["reservationStatus"]): string {
  switch (status) {
    case "confirmed":
      return "bg-success text-white";
    case "waitingForPayment":
      return "bg-warning text-white";
    case "waitingForConfirmation":
      return "bg-light-gray text-white";
    case "rejected":
      return "bg-danger text-white";
    default:
      return "";
  }
}

export const columns: ColumnDef<Ad>[] = [
  {
    accessorKey: "AdNumber",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">Ad Number</div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Ad Type",
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
    header: "Ad Start Date",
  },
  {
    accessorKey: "endDate",
    header: "Ad End Date",
  },
  {
    accessorKey: "branch",
    header: "Branch Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="space-x-1">
          <span>{row.getValue("amount")}</span>
          <span>ر.س</span>
        </div>
      );
    },
  },
  {
    accessorKey: "reservationStatus",
    header: "Reservation Status",
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
