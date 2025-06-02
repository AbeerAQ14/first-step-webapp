"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
  id: number;
  childName: string;
  nurseryName: string;
  reportDate: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "childNumber",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">----</div>
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
    accessorKey: "nurseryName",
    header: "Nursery",
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
