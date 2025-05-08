"use client";

import { Booking, getColumns } from "@/components/tables/data/bookings";
import { DataTable } from "@/components/tables/DataTable";
import { useState } from "react";

const bookingsData: Booking[] = [
  {
    id: 1,
    parentName: "أحمد محمد",
    childs: [
      { id: "c1", name: "سارة أحمد", reservationStatus: "confirmed" },
      { id: "c2", name: "سعد أحمد", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع الرياض",
    startDate: "10/05/2025",
    endDate: "12/05/2025",
    amount: 750.0,
  },
  {
    id: 2,
    parentName: "علي حسن",
    childs: [
      {
        id: "c3",
        name: "جنى حسن",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    branch: "فرع جدة",
    startDate: "15/05/2025",
    endDate: "17/05/2025",
    amount: 820.5,
  },
  {
    id: 3,
    parentName: "سارة محمود",
    childs: [
      { id: "c4", name: "رنا محمود", reservationStatus: "confirmed" },
      { id: "c5", name: "فهد محمود", reservationStatus: "rejected" },
    ],
    branch: "فرع مكة",
    startDate: "20/05/2025",
    endDate: "22/05/2025",
    amount: 680.0,
  },
  {
    id: 4,
    parentName: "إبراهيم خليل",
    childs: [
      { id: "c6", name: "ليلى خليل", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع المدينة المنورة",
    startDate: "25/05/2025",
    endDate: "27/05/2025",
    amount: 900.25,
  },
  {
    id: 5,
    parentName: "منى السيد",
    childs: [{ id: "c7", name: "حسن منى", reservationStatus: "confirmed" }],
    branch: "فرع الدمام",
    startDate: "01/06/2025",
    endDate: "03/06/2025",
    amount: 795.0,
  },
  {
    id: 6,
    parentName: "خالد عمر",
    childs: [
      { id: "c8", name: "خالد خالد", reservationStatus: "confirmed" },
      {
        id: "c9",
        name: "نورة خالد",
        reservationStatus: "waitingForConfirmation",
      },
    ],
    branch: "فرع تبوك",
    startDate: "05/06/2025",
    endDate: "07/06/2025",
    amount: 855.75,
  },
  {
    id: 7,
    parentName: "ليلى عبد الله",
    childs: [
      { id: "c10", name: "ريم عبد الله", reservationStatus: "rejected" },
    ],
    branch: "فرع الأحساء",
    startDate: "10/06/2025",
    endDate: "12/06/2025",
    amount: 720.0,
  },
  {
    id: 8,
    parentName: "طارق حسين",
    childs: [
      { id: "c11", name: "زياد طارق", reservationStatus: "confirmed" },
      { id: "c12", name: "فرح طارق", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع القطيف",
    startDate: "15/06/2025",
    endDate: "17/06/2025",
    amount: 880.5,
  },
  {
    id: 9,
    parentName: "نهى جمال",
    childs: [
      { id: "c13", name: "عبدالله جمال", reservationStatus: "confirmed" },
    ],
    branch: "فرع خميس مشيط",
    startDate: "20/06/2025",
    endDate: "22/06/2025",
    amount: 700.0,
  },
  {
    id: 10,
    parentName: "محمود إبراهيم",
    childs: [
      {
        id: "c14",
        name: "أمل محمود",
        reservationStatus: "waitingForConfirmation",
      },
      { id: "c15", name: "راشد محمود", reservationStatus: "confirmed" },
    ],
    branch: "فرع الطائف",
    startDate: "25/06/2025",
    endDate: "27/06/2025",
    amount: 920.25,
  },
  {
    id: 11,
    parentName: "سميرة علي",
    childs: [
      { id: "c16", name: "مازن علي", reservationStatus: "waitingForPayment" },
    ],
    branch: "فرع نجران",
    startDate: "01/07/2025",
    endDate: "03/07/2025",
    amount: 815.0,
  },
  {
    id: 12,
    parentName: "يوسف أحمد",
    childs: [{ id: "c17", name: "نجوى يوسف", reservationStatus: "confirmed" }],
    branch: "فرع حائل",
    startDate: "05/07/2025",
    endDate: "07/07/2025",
    amount: 770.75,
  },
];

const Bookings = () => {
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});

  const columns = getColumns(selectedChildMap, setSelectedChildMap);

  return (
    <div>
      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          الحجوزات
        </p>

        <DataTable columns={columns} data={bookingsData} />
      </div>
    </div>
  );
};

export default Bookings;
