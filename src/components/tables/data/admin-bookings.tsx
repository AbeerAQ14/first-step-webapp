"use client";

import { ReservationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useReservationStatus } from "./shared/status";

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
    header: "المركز أو الحضانة",
    cell: ({ row }) => {
      const center = row.getValue("center") as string;
      return <div className="text-right">{center || "غير محدد"}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: "تاريخ بدء الحجز",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as string;
      return <div className="text-center">{date || "غير محدد"}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "تاريخ انتهاء الحجز",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as string;
      return <div className="text-center">{date || "غير محدد"}</div>;
    },
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
    header: "الفرع",
    cell: ({ row }) => {
      const branch = row.getValue("branch") as string;
      return <div className="text-right">{branch || "غير محدد"}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "المبلغ",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount")) || 0;
      return (
        <div className="space-x-1 text-left">
          <span>{amount.toFixed(2)}</span>
          <span>ر.س</span>
        </div>
      );
    },
  },
  {
    id: "reservationStatus",
    header: "حالة الحجز",
    cell: ({ row }) => {
      const { getStatusText, getStatusColorClass } = useReservationStatus();

      const parent = row.original;
      const selectedChildId =
        selectedChildMap[parent.id] ?? parent.childs[0]?.id;
      const selectedChild = parent.childs.find(
        (child) => child.id === selectedChildId
      );

      const status = selectedChild?.reservationStatus;
      const colorClasses = getStatusColorClass(
        status || "waitingForConfirmation"
      );
      const text = status ? getStatusText(status) : "اختر الطفل";

      return (
        <div
          className={`text-xs w-fit px-2 py-1 rounded-[4px] select-none ${colorClasses} whitespace-nowrap`}
          dir="rtl"
        >
          {text}
        </div>
      );
    },
  },
];
