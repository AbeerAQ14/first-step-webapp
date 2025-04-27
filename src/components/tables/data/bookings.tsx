"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  parentName: string;
  childName: string;
  branch: string;
  startDate: string;
  endDate: string;
  amount: number;
  reservationStatus:
    | "confirmed"
    | "waitingForPayment"
    | "waitingForConfirmation"
    | "rejected";
};

// Function to get the status text in Arabic
function getStatusText(status: Booking["reservationStatus"]): string {
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

// Function to get the status color class
function getStatusColorClass(status: Booking["reservationStatus"]): string {
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

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "childNumber",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">Child Number</div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "parentName",
    header: "Parent Name",
  },
  {
    accessorKey: "startDate",
    header: "Booking Start Date",
  },
  {
    accessorKey: "endDate",
    header: "Booking End Date",
  },
  {
    accessorKey: "childName",
    header: "Child",
    cell: ({ row }) => {
      return (
        <div
          className={`text-xs w-fit px-2 py-1 rounded-[4px] select-none bg-info text-white`}
        >
          {row.getValue("childName")}
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
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
      ) as Booking["reservationStatus"];
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
