"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Child = {
  id: number;
  childName: string;
  dateOfBirth: string;
  parentName: string;
  branch: string;
  reservationStatus:
    | "confirmed"
    | "waitingForPayment"
    | "waitingForConfirmation"
    | "rejected";
};

// Function to get the status text in Arabic
function getStatusText(status: Child["reservationStatus"]): string {
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
function getStatusColorClass(status: Child["reservationStatus"]): string {
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

export const columns: ColumnDef<Child>[] = [
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
    accessorKey: "childName",
    header: "Child Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date Of Birth",
  },
  {
    accessorKey: "parentName",
    header: "Parent Name",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "reservationStatus",
    header: "Reservation Status",
    cell: ({ row }) => {
      const value = row.getValue(
        "reservationStatus"
      ) as Child["reservationStatus"];
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
  {
    accessorKey: "control",
    header: "Control",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Button variant={"ghost"} size={"icon"}>
            <Eye className="size-4 text-mid-gray" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="size-4 text-mid-gray" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Trash2 className="size-4 text-mid-gray" />
          </Button>
        </div>
      );
    },
  },
];
