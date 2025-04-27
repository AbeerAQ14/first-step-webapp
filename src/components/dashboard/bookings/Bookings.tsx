"use client";

import { Booking, columns } from "@/components/tables/data/bookings";
import { DataTable } from "@/components/tables/DataTable";

const bookingsData: Booking[] = [
  {
    id: 1,
    parentName: "أحمد محمد",
    childName: "فاطمة أحمد",
    branch: "فرع الرياض",
    startDate: "10/05/2025",
    endDate: "12/05/2025",
    amount: 750.0,
    reservationStatus: "confirmed",
  },
  {
    id: 2,
    parentName: "علي حسن",
    childName: "يوسف علي",
    branch: "فرع جدة",
    startDate: "15/05/2025",
    endDate: "17/05/2025",
    amount: 820.5,
    reservationStatus: "waitingForPayment",
  },
  {
    id: 3,
    parentName: "سارة محمود",
    childName: "ملك سارة",
    branch: "فرع مكة",
    startDate: "20/05/2025",
    endDate: "22/05/2025",
    amount: 680.0,
    reservationStatus: "confirmed",
  },
  {
    id: 4,
    parentName: "إبراهيم خليل",
    childName: "آدم إبراهيم",
    branch: "فرع المدينة المنورة",
    startDate: "25/05/2025",
    endDate: "27/05/2025",
    amount: 900.25,
    reservationStatus: "waitingForPayment",
  },
  {
    id: 5,
    parentName: "منى السيد",
    childName: "نور منى",
    branch: "فرع الدمام",
    startDate: "01/06/2025",
    endDate: "03/06/2025",
    amount: 795.0,
    reservationStatus: "waitingForConfirmation",
  },
  {
    id: 6,
    parentName: "خالد عمر",
    childName: "عمر خالد",
    branch: "فرع تبوك",
    startDate: "05/06/2025",
    endDate: "07/06/2025",
    amount: 855.75,
    reservationStatus: "rejected",
  },
  {
    id: 7,
    parentName: "ليلى عبد الله",
    childName: "زينب ليلى",
    branch: "فرع الأحساء",
    startDate: "10/06/2025",
    endDate: "12/06/2025",
    amount: 720.0,
    reservationStatus: "confirmed",
  },
  {
    id: 8,
    parentName: "طارق حسين",
    childName: "علي طارق",
    branch: "فرع القطيف",
    startDate: "15/06/2025",
    endDate: "17/06/2025",
    amount: 880.5,
    reservationStatus: "rejected",
  },
  {
    id: 9,
    parentName: "نهى جمال",
    childName: "ياسمين نهى",
    branch: "فرع خميس مشيط",
    startDate: "20/06/2025",
    endDate: "22/06/2025",
    amount: 700.0,
    reservationStatus: "waitingForPayment",
  },
  {
    id: 10,
    parentName: "محمود إبراهيم",
    childName: "إياد محمود",
    branch: "فرع الطائف",
    startDate: "25/06/2025",
    endDate: "27/06/2025",
    amount: 920.25,
    reservationStatus: "waitingForConfirmation",
  },
  {
    id: 11,
    parentName: "سميرة علي",
    childName: "مريم سميرة",
    branch: "فرع نجران",
    startDate: "01/07/2025",
    endDate: "03/07/2025",
    amount: 815.0,
    reservationStatus: "confirmed",
  },
  {
    id: 12,
    parentName: "يوسف أحمد",
    childName: "حمزة يوسف",
    branch: "فرع حائل",
    startDate: "05/07/2025",
    endDate: "07/07/2025",
    amount: 770.75,
    reservationStatus: "waitingForPayment",
  },
];

const Bookings = () => {
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
