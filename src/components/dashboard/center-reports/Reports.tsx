"use client";

import React, { useState } from "react";
import {
  Report,
  useCenterReportsColumns,
} from "@/components/tables/data/center-reports";
import { DataTable } from "@/components/tables/DataTable";
import { useTranslations } from "next-intl";

export const reports: Report[] = [
  {
    id: 1,
    parentName: "أحمد محمد",
    phone: "2222222222",
    childs: [
      { id: "1", name: "سارة أحمد", reservationStatus: "confirmed" },
      { id: "14", name: "سعد أحمد", reservationStatus: "waitingForPayment" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 2,
    parentName: "ليلى خالد",
    phone: "2333333333",
    childs: [{ id: "2", name: "ريم خالد", reservationStatus: "rejected" }],
    reportDate: "2025-05-08",
  },
  {
    id: 3,
    parentName: "سعيد عبدالله",
    phone: "2444444444",
    childs: [
      {
        id: "3",
        name: "محمد سعيد",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 4,
    parentName: "منى يوسف",
    phone: "2555555555",
    childs: [{ id: "4", name: "لينا يوسف", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
  {
    id: 5,
    parentName: "ناصر علي",
    phone: "2666666666",
    childs: [
      {
        id: "5",
        name: "خالد ناصر",
        reservationStatus: "waitingForConfirmation",
      },
      { id: "15", name: "سلمى ناصر", reservationStatus: "confirmed" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 6,
    parentName: "هالة سامي",
    phone: "2777777777",
    childs: [
      { id: "6", name: "جنى سامي", reservationStatus: "waitingForPayment" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 7,
    parentName: "عماد جابر",
    phone: "2888888888",
    childs: [{ id: "7", name: "رامي عماد", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
  {
    id: 8,
    parentName: "آمنة سالم",
    phone: "2999999999",
    childs: [{ id: "8", name: "سارة سالم", reservationStatus: "rejected" }],
    reportDate: "2025-05-08",
  },
  {
    id: 9,
    parentName: "خالد حمد",
    phone: "2111111111",
    childs: [{ id: "9", name: "هشام خالد", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
  {
    id: 10,
    parentName: "فاطمة شريف",
    phone: "2121212121",
    childs: [
      { id: "10", name: "زياد شريف", reservationStatus: "waitingForPayment" },
      { id: "16", name: "ياسمين شريف", reservationStatus: "confirmed" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 11,
    parentName: "سامر علي",
    phone: "2233445566",
    childs: [{ id: "11", name: "ليان سامر", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
  {
    id: 12,
    parentName: "دلال حسن",
    phone: "2345678901",
    childs: [
      {
        id: "12",
        name: "هبة حسن",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 13,
    parentName: "بدر ناصر",
    phone: "2456789012",
    childs: [{ id: "13", name: "آدم بدر", reservationStatus: "rejected" }],
    reportDate: "2025-05-08",
  },
  {
    id: 14,
    parentName: "أمل يوسف",
    phone: "2567890123",
    childs: [
      { id: "17", name: "نور أمل", reservationStatus: "confirmed" },
      { id: "18", name: "ندى أمل", reservationStatus: "waitingForPayment" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 15,
    parentName: "حاتم مروان",
    phone: "2678901234",
    childs: [
      { id: "19", name: "عبدالله حاتم", reservationStatus: "confirmed" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 16,
    parentName: "رنا ممدوح",
    phone: "2789012345",
    childs: [
      {
        id: "20",
        name: "شهد ممدوح",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 17,
    parentName: "مروان صالح",
    phone: "2890123456",
    childs: [{ id: "21", name: "سامي مروان", reservationStatus: "rejected" }],
    reportDate: "2025-05-08",
  },
  {
    id: 18,
    parentName: "بشرى عبدالعزيز",
    phone: "2901234567",
    childs: [
      { id: "22", name: "بتول عبدالعزيز", reservationStatus: "confirmed" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 19,
    parentName: "زياد حاتم",
    phone: "3012345678",
    childs: [
      { id: "23", name: "أيمن زياد", reservationStatus: "waitingForPayment" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 20,
    parentName: "ميساء نبيل",
    phone: "3123456789",
    childs: [{ id: "24", name: "سهى نبيل", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
  {
    id: 21,
    parentName: "يحيى عصام",
    phone: "3234567890",
    childs: [
      {
        id: "25",
        name: "أنس يحيى",
        reservationStatus: "waitingForConfirmation",
      },
      { id: "26", name: "فرح يحيى", reservationStatus: "confirmed" },
    ],
    reportDate: "2025-05-08",
  },
  {
    id: 22,
    parentName: "نوران وائل",
    phone: "3345678901",
    childs: [{ id: "27", name: "مها وائل", reservationStatus: "rejected" }],
    reportDate: "2025-05-08",
  },
  {
    id: 23,
    parentName: "غادة أحمد",
    phone: "3456789012",
    childs: [{ id: "28", name: "جود غادة", reservationStatus: "confirmed" }],
    reportDate: "2025-05-08",
  },
];

const Reports = () => {
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});
  const t = useTranslations("dashboard.tables.center-reports");

  const columns = useCenterReportsColumns(
    selectedChildMap,
    setSelectedChildMap
  );

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          {t("title")}
        </p>

        <DataTable columns={columns} data={reports} />
      </div>
    </div>
  );
};

export default Reports;
