"use client";

import { ReservationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Booking = {
  id: number;
  parentName: string;
  center: string;
  childs: { id: string; name: string; reservationStatus: ReservationStatus }[];
  branch: string;
  startDate: string;
  endDate: string;
  amount: number;
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
): ColumnDef<Booking>[] => [
  {
    accessorKey: "childNumber",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">---</div>
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
    accessorKey: "center",
    header: "Center Or Nursery",
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
    accessorKey: "childs",
    header: "Child",
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
    id: "reservationStatus",
    header: "Reservation Status",
    cell: ({ row }) => {
      const parent = row.original;
      const selectedChildId =
        selectedChildMap[parent.id] ?? parent.childs[0]?.id;
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
          {text}
        </div>
      );
    },
  },
];
