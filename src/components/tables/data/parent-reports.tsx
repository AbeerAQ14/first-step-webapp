"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
  id: number;
  childName: string;
  nurseryName: string;
  reportDate: string;
  pdf_url: string;
};

interface ParentReportsColumnsProps {
  onDelete?: (id: number) => void;
}

export const useParentReportsColumns = ({
  onDelete,
}: ParentReportsColumnsProps = {}) => {
  const columns: ColumnDef<Report>[] = [
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
        const report = row.original;

        const handleDelete = () => {
          if (onDelete) {
            onDelete(report.id);
          }
        };

        return (
          <div className="flex items-center gap-1">
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`daily-reports/${report.id}`}>
                <Eye className="size-4 text-mid-gray" />
              </Link>
            </Button>
            <Button asChild variant={"ghost"} size={"icon"}>
              <a
                href={report.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-4 text-mid-gray" />
              </a>
            </Button>
            <Button variant={"ghost"} size={"icon"} onClick={handleDelete}>
              <Trash2 className="size-4 text-mid-gray" />
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
};
