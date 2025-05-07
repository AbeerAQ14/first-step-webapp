"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ReservationStatus } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Parent = {
  id: number;
  parentName: string;
  phone: string;
  childs: { id: string; name: string; reservationStatus: ReservationStatus }[];
  branch: string;
  // reservationStatus: ReservationStatus;
};

// Function to get the status text in Arabic
function getStatusText(status: ReservationStatus): string {
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
function getStatusColorClass(status: ReservationStatus): string {
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

export const getColumns = (
  selectedChildMap: Record<number, string>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >
): ColumnDef<Parent>[] => [
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
    accessorKey: "childs",
    header: "Child",
    cell: ({ row }) => {
      const parentId = row.original.id;
      const childs = row.original.childs;

      return (
        <select
          className="text-xs px-2 py-1 rounded bg-info text-white"
          value={selectedChildMap[parentId] ?? "all"}
          onChange={(e) =>
            setSelectedChildMap((prev) => ({
              ...prev,
              [parentId]: e.target.value,
            }))
          }
        >
          <option value="all">كل الأطفال</option>
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
    header: "Branch",
  },
  {
    id: "reservationStatus",
    header: "Reservation Status",
    cell: ({ row }) => {
      const parent = row.original;
      const selectedChildId = selectedChildMap[parent.id];
      const selectedChild = parent.childs.find(
        (child) => child.id === selectedChildId
      );

      const status = selectedChild?.reservationStatus;
      const colorClasses = getStatusColorClass(status ?? "confirmed");
      const text = status ? getStatusText(status) : "اختر الطفل";

      return (
        <div
          className={`text-xs w-fit px-2 py-1 rounded-[4px] select-none ${colorClasses}`}
        >
          {text || "اختر طفلًا"}
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
