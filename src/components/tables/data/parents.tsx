"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { ReservationStatus } from "@/types";
import { useReservationStatus } from "./shared/status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Parent = {
  id: number;
  parentName: string;
  phone: string;
  childs: {
    id: string;
    name: string;
    reservationStatus: ReservationStatus;
    branch: string;
  }[];
};

export function useParentsColumns(
  selectedChildMap: Record<number, string>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >
) {
  const t = useTranslations("dashboard.tables.parents");
  const { getStatusText, getStatusColorClass } = useReservationStatus();

  const columns: ColumnDef<Parent>[] = [
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
      header: () => t("headers.parentName"),
    },
    {
      accessorKey: "phone",
      header: () => t("headers.phone"),
    },
    {
      accessorKey: "childs",
      header: () => t("headers.child"),
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
            <option value="all">{t("allChildren")}</option>
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
      id: "branch",
      header: () => t("headers.branch"),
      cell: ({ row }) => {
        const parent = row.original;
        const selectedChildId = selectedChildMap[parent.id];
        const selectedChild = parent.childs.find(
          (child) => child.id === selectedChildId
        );

        return selectedChild ? selectedChild.branch : t("selectChild");
      },
    },
    {
      id: "reservationStatus",
      header: () => t("headers.reservationStatus"),
      cell: ({ row }) => {
        const parent = row.original;
        const selectedChildId = selectedChildMap[parent.id];
        const selectedChild = parent.childs.find(
          (child) => child.id === selectedChildId
        );

        const status = selectedChild?.reservationStatus;
        const colorClasses = getStatusColorClass(status ?? "selectChild");
        const text = status ? getStatusText(status) : t("selectChild");

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
      header: () => t("headers.control"),
      cell: ({ row }) => {
        const parent = row.original;
        const selectedChildId = selectedChildMap[parent.id];
        const hasSelectedChild = selectedChildId && selectedChildId !== "all";

        return (
          <div className="flex items-center gap-1">
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={!hasSelectedChild}
              asChild={hasSelectedChild ? true : undefined}
            >
              {hasSelectedChild ? (
                <Link href={`children-files/${selectedChildId}`}>
                  <Eye className="size-4 text-mid-gray" />
                </Link>
              ) : (
                <Eye className="size-4 text-mid-gray" />
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
}
