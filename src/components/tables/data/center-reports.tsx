"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/navigation";
import { ReservationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Report = {
  id: number;
  parentName: string;
  phone: string;
  childs: { id: string; name: string; reservationStatus: ReservationStatus }[];
  reportDate: string;
};

export const getColumns = (
  selectedChildMap: Record<number, string>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >
): ColumnDef<Report>[] => [
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
    accessorKey: "reportDate",
    header: "Report Date",
  },
  {
    accessorKey: "control",
    header: "Control",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link href={`daily-reports/${"123"}`}>
              <Eye className="size-4 text-mid-gray" />
            </Link>
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Download className="size-4 text-mid-gray" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Trash2 className="size-4 text-mid-gray" />
          </Button>
        </div>
      );
    },
  },
];
