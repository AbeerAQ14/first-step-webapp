"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Report = {
  id: number;
  parentName: string;
  phone: string;
  childs: { id: string; name: string }[];
  reportDate: string;
};

export function useCenterReportsColumns(
  selectedChildMap: Record<number, string>,
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >,
  reportIdMap: Record<string, number>
) {
  const t = useTranslations("dashboard.tables.center-reports");

  const columns: ColumnDef<Report>[] = [
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
      accessorKey: "reportDate",
      header: () => t("headers.reportDate"),
    },
    {
      accessorKey: "control",
      header: () => t("headers.control"),
      cell: ({ row }) => {
        const parent = row.original;
        const selectedChildId =
          selectedChildMap[parent.id] ?? parent.childs[0]?.id;
        const reportId = reportIdMap[selectedChildId];

        return (
          <div className="flex items-center gap-1">
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`daily-reports/${reportId}`}>
                <Eye className="size-4 text-mid-gray" />
              </Link>
            </Button>
            <Button asChild variant={"ghost"} size={"icon"}>
              <a target="_blank" href={`/api/daily-reports/${reportId}/pdf`}>
                <Download className="size-4 text-mid-gray" />
              </a>
            </Button>
            {/* <Button variant={"ghost"} size={"icon"}>
              <Trash2 className="size-4 text-mid-gray" />
            </Button> */}
          </div>
        );
      },
    },
  ];

  return columns;
}
