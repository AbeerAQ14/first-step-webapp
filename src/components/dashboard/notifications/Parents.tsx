"use client";

import { columns, Parent } from "@/components/tables/data/parents";
import { DataTable } from "@/components/tables/DataTable";
import { useEffect, useState } from "react";

const parentsData: Parent[] = [
  {
    id: 1,
    parentName: "أحمد محمد",
    phone: "2222222222",
    childName: "سارة أحمد",
    branch: "الفرع الرئيسي",
    reservationStatus: "confirmed",
  },
  {
    id: 2,
    parentName: "فاطمة علي",
    phone: "2222222222",
    childName: "محمد علي",
    branch: "فرع الخالدية",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 3,
    parentName: "خالد عبدالله",
    phone: "2222222222",
    childName: "نورة خالد",
    branch: "فرع النزهة",
    reservationStatus: "confirmed",
  },
  {
    id: 4,
    parentName: "نورة سعيد",
    phone: "2222222222",
    childName: "سلطان سعيد",
    branch: "فرع العليا",
    reservationStatus: "waitingForConfirmation",
  },
  {
    id: 5,
    parentName: "عبدالرحمن يوسف",
    phone: "2222222222",
    childName: "لينا عبدالرحمن",
    branch: "فرع الروضة",
    reservationStatus: "confirmed",
  },
  {
    id: 6,
    parentName: "منيرة فهد",
    phone: "2222222222",
    childName: "فهد منصور",
    branch: "فرع الملز",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 7,
    parentName: "عمر حسن",
    phone: "2222222222",
    childName: "ريم عمر",
    branch: "فرع السلامة",
    reservationStatus: "confirmed",
  },
  {
    id: 8,
    parentName: "سلمان محمد",
    phone: "2222222222",
    childName: "دانة سلمان",
    branch: "فرع الحمراء",
    reservationStatus: "rejected",
  },
  {
    id: 9,
    parentName: "هند عبدالعزيز",
    phone: "2222222222",
    childName: "عبدالله هند",
    branch: "فرع الياسمين",
    reservationStatus: "rejected",
  },
  {
    id: 10,
    parentName: "بدر سالم",
    phone: "2222222222",
    childName: "غادة بدر",
    branch: "فرع الشفا",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 11,
    parentName: "عائشة راشد",
    phone: "2222222222",
    childName: "راشد عامر",
    branch: "فرع المروج",
    reservationStatus: "confirmed",
  },
  {
    id: 12,
    parentName: "طارق حامد",
    phone: "2222222222",
    childName: "حامد طارق",
    branch: "فرع العزيزية",
    reservationStatus: "rejected",
  },
  {
    id: 13,
    parentName: "منال خالد",
    phone: "2222222222",
    childName: "رنا منال",
    branch: "فرع الربوة",
    reservationStatus: "waitingForPayment",
  },
];

const Parents = () => {
  const [selected, setSelected] = useState<Parent[]>([]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div>
      <div className="lg:p-4 space-y-1">
        <p className="heading-4 text-primary text-center">أولياء الأمور</p>

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
