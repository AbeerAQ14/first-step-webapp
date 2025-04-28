"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Parent = {
  id: number;
  parentName: string;
  phone: string;
  childName: string;
  branch: string;
  reservationStatus:
    | "confirmed"
    | "waitingForPayment"
    | "waitingForConfirmation"
    | "rejected";
};

// Function to get the status text in Arabic
function getStatusText(status: Parent["reservationStatus"]): string {
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
function getStatusColorClass(status: Parent["reservationStatus"]): string {
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

export const columns: ColumnDef<Parent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "parentName",
    header: "Parent Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
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
    accessorKey: "reservationStatus",
    header: "Reservation Status",
    cell: ({ row }) => {
      const value = row.getValue(
        "reservationStatus"
      ) as Parent["reservationStatus"];
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
