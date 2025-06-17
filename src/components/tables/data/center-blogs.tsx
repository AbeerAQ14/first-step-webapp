"use client";

import { Link } from "@/i18n/navigation";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Blog = {
  id: string;
  center: string;
  phone: string;
  email: string;
  acceptedBlogs: number;
  pendingBlogs: number;
  rejectedBlogs: number;
};

const BlogsRenderer = ({ value }: { value: number }) => {
  return <div className="text-center">{value}</div>;
};

export const columns: ColumnDef<Blog>[] = [
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
            href={`blog/center/${row.getValue("id")}`}
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
    accessorKey: "acceptedBlogs",
    header: "Accepted Blogs",
    cell: ({ row }) => BlogsRenderer({ value: row.getValue("acceptedBlogs") }),
  },
  {
    accessorKey: "pendingBlogs",
    header: "Pending Blogs",
    cell: ({ row }) => BlogsRenderer({ value: row.getValue("pendingBlogs") }),
  },
  {
    accessorKey: "rejectedBlogs",
    header: "Rejected Blogs",
    cell: ({ row }) => BlogsRenderer({ value: row.getValue("rejectedBlogs") }),
  },
];
