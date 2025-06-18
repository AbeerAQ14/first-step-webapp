"use client";

import { Center, useCentersColumns } from "@/components/tables/data/centers";
import { DataTable } from "@/components/tables/DataTable";
import React from "react";

interface CentersProps {
  selected: Center[];
  setSelected: React.Dispatch<React.SetStateAction<Center[]>>;
}

const mockCenters: Center[] = [
  {
    id: 1,
    centerName: "اسم الحضانة",
    phone: "2222222222",
    branch: "كل الفروع",
    email: "mennarmara@gmail"
  },
];

const Centers: React.FC<CentersProps> = ({ selected, setSelected }) => {
  const columns = useCentersColumns(selected, setSelected);
  const data = mockCenters;
  return (
    <DataTable
      columns={columns}
      data={data}
      setSelected={setSelected}
    />
  );
};

export default Centers;
