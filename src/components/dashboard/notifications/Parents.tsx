"use client";

import { Parent, useParentsColumns } from "@/components/tables/data/parents";
import { DataTable } from "@/components/tables/DataTable";
import { useTranslations } from "next-intl";
import React from "react";

const parentsData: Parent[] = [
  {
    id: 1,
    parentName: "أحمد محمد",
    phone: "2222222222",
    childs: [
      { id: "1", name: "سارة أحمد", reservationStatus: "confirmed" },
      { id: "14", name: "سعد أحمد", reservationStatus: "waitingForPayment" },
    ],
    branch: "الفرع الرئيسي",
  },
  {
    id: 2,
    parentName: "فاطمة علي",
    phone: "2222222222",
    childs: [
      { id: "2", name: "محمد علي", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع الخالدية",
  },
  {
    id: 3,
    parentName: "خالد عبدالله",
    phone: "2222222222",
    childs: [
      { id: "3", name: "نورة خالد", reservationStatus: "confirmed" },
      { id: "15", name: "خالد خالد", reservationStatus: "rejected" },
    ],
    branch: "فرع النزهة",
  },
  {
    id: 4,
    parentName: "نورة سعيد",
    phone: "2222222222",
    childs: [
      {
        id: "4",
        name: "سلطان سعيد",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    branch: "فرع العليا",
  },
  {
    id: 5,
    parentName: "عبدالرحمن يوسف",
    phone: "2222222222",
    childs: [
      { id: "5", name: "لينا عبدالرحمن", reservationStatus: "confirmed" },
      { id: "16", name: "ياسر عبدالرحمن", reservationStatus: "confirmed" },
    ],
    branch: "فرع الروضة",
  },
  {
    id: 6,
    parentName: "منيرة فهد",
    phone: "2222222222",
    childs: [
      { id: "6", name: "فهد منصور", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع الملز",
  },
  {
    id: 7,
    parentName: "عمر حسن",
    phone: "2222222222",
    childs: [{ id: "7", name: "ريم عمر", reservationStatus: "confirmed" }],
    branch: "فرع السلامة",
  },
  {
    id: 8,
    parentName: "سلمان محمد",
    phone: "2222222222",
    childs: [{ id: "8", name: "دانة سلمان", reservationStatus: "rejected" }],
    branch: "فرع الحمراء",
  },
  {
    id: 9,
    parentName: "هند عبدالعزيز",
    phone: "2222222222",
    childs: [
      { id: "9", name: "عبدالله هند", reservationStatus: "rejected" },
      {
        id: "17",
        name: "جنى عبدالعزيز",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    branch: "فرع الياسمين",
  },
  {
    id: 10,
    parentName: "بدر سالم",
    phone: "2222222222",
    childs: [
      { id: "10", name: "غادة بدر", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع الشفا",
  },
  {
    id: 11,
    parentName: "عائشة راشد",
    phone: "2222222222",
    childs: [{ id: "11", name: "راشد عامر", reservationStatus: "confirmed" }],
    branch: "فرع المروج",
  },
  {
    id: 12,
    parentName: "طارق حامد",
    phone: "2222222222",
    childs: [{ id: "12", name: "حامد طارق", reservationStatus: "rejected" }],
    branch: "فرع العزيزية",
  },
  {
    id: 13,
    parentName: "منال خالد",
    phone: "2222222222",
    childs: [
      { id: "13", name: "رنا منال", reservationStatus: "waitingForPayment" },
      { id: "18", name: "نورة منال", reservationStatus: "confirmed" },
    ],
    branch: "فرع الربوة",
  },
];

const Parents = ({
  selected,
  setSelected,
  selectedChildMap,
  setSelectedChildMap,
}: {
  selected: Parent[];
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  selectedChildMap: Record<number, string>;
  setSelectedChildMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
}) => {
  const t = useTranslations("dashboard.tables.parents");
  const columns = useParentsColumns(selectedChildMap, setSelectedChildMap);

  return (
    <div>
      <div className="lg:p-4 space-y-1">
        <p className="heading-4 text-primary text-center">{t("title")}</p>

        <DataTable
          setSelected={setSelected}
          columns={columns}
          data={parentsData}
        />
      </div>
    </div>
  );
};

export default Parents;
