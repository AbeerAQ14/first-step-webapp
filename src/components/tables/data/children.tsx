"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ReservationStatus, useReservationStatus } from "./shared/status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Child = {
  id: number;
  childName: string;
  dateOfBirth: string;
  parentName: string;
  branch: string;
  reservationStatus: ReservationStatus;
};

export function useChildrenColumns() {
  const t = useTranslations("dashboard.tables.children");
  const { getStatusText, getStatusColorClass } = useReservationStatus();

  const columns: ColumnDef<Child>[] = [
    {
      accessorKey: "childNumber",
      header: () => (
        <div className="text-[.7rem] font-normal text-center">
          {t("headers.childNumber")}
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "childName",
      header: () => t("headers.childName"),
    },
    {
      accessorKey: "dateOfBirth",
      header: () => t("headers.dateOfBirth"),
    },
    {
      accessorKey: "parentName",
      header: () => t("headers.parentName"),
    },
    {
      accessorKey: "branch",
      header: () => t("headers.branch"),
    },
    {
      accessorKey: "reservationStatus",
      header: () => t("headers.reservationStatus"),
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
      header: () => t("headers.control"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`children-files/${"123"}`}>
                <Eye className="size-4 text-mid-gray" />
              </Link>
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

  return columns;
}
