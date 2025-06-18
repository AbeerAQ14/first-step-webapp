"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Center = {
  id: number;
  centerName: string;
  phone: string;
  branch: string;
  email: string;
};

export function useCentersColumns(
  selectedCenters: Center[],
  setSelectedCenters: React.Dispatch<React.SetStateAction<Center[]>>
) {
  const columns: ColumnDef<Center>[] = [
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
      accessorKey: "centerName",
      header: () => "اسم الحضانة أو المركز",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phone",
      header: () => "رقم الجوال",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "branch",
      header: () => "الفرع",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: () => "الإيميل",
      cell: (info) => info.getValue(),
    },
  ];
  return columns;
}
