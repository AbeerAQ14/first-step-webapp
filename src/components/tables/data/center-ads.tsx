"use client";

import { Link } from "@/i18n/navigation";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Advertisement = {
  id: string;
  center: string;
  phone: string;
  email: string;
  acceptedAds: number;
  pendingAds: number;
  rejectedAds: number;
};

const AdsRenderer = ({ value }: { value: number }) => {
  return <div className="text-center">{value}</div>;
};

export const columns: ColumnDef<Advertisement>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-[.7rem] font-normal text-center">----</div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "center",
    header: "Center Or Nursery",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            className="hover:text-secondary-mint-green"
            href={`advertisement/center/${row.getValue("id")}`}
          >
            {row.getValue("center")}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "acceptedAds",
    header: "Accepted Ads",
    cell: ({ row }) => AdsRenderer({ value: row.getValue("acceptedAds") }),
  },
  {
    accessorKey: "pendingAds",
    header: "Pending Ads",
    cell: ({ row }) => AdsRenderer({ value: row.getValue("pendingAds") }),
  },
  {
    accessorKey: "rejectedAds",
    header: "Rejected Ads",
    cell: ({ row }) => AdsRenderer({ value: row.getValue("rejectedAds") }),
  },
];
