"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Center = {
  id: number;
  centerName: string;
  phone: string;
  email: string;
  branches: {
    id: number;
    name: string;
    phone: string;
    email: string;
  }[];
  selectedBranchId?: number;
};

export function useCentersColumns(
  selectedBranchMap: Record<number, number>,
  setSelectedBranchMap: React.Dispatch<React.SetStateAction<Record<number, number>>>
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
      cell: ({ row }) => {
        const center = row.original;
        const selectedBranchId = selectedBranchMap[center.id];
        const selectedBranch = center.branches.find(
          (branch) => branch.id === selectedBranchId
        );
        return selectedBranch?.phone || center.phone || "";
      },
    },
    {
      accessorKey: "branch",
      header: () => "الفرع",
      cell: ({ row }) => {
        const center = row.original;
        const selectedBranchId = selectedBranchMap[center.id];
        
        return (
          <select
            className="text-xs px-2 py-1 rounded bg-info text-white"
            value={selectedBranchId || "all"}
            onChange={(e) =>
              setSelectedBranchMap((prev) => ({
                ...prev,
                [center.id]: parseInt(e.target.value),
              }))
            }
          >
            <option value="all">كل الفروع</option>
            {center.branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => "الإيميل",
      cell: ({ row }) => {
        const center = row.original;
        const selectedBranchId = selectedBranchMap[center.id];
        const selectedBranch = center.branches.find(
          (branch) => branch.id === selectedBranchId
        );
        return selectedBranch?.email || center.email || "-";
      },
    },
  ];
  return columns;
}
