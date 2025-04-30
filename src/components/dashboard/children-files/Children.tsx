"use client";

import { Child, columns } from "@/components/tables/data/children";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const childrenData: Child[] = [
  {
    id: 1,
    childName: "محمد أحمد",
    dateOfBirth: "12/5/2020",
    parentName: "أحمد عبدالله",
    branch: "فرع الرياض",
    reservationStatus: "confirmed",
  },
  {
    id: 2,
    childName: "فاطمة خالد",
    dateOfBirth: "3/8/2019",
    parentName: "خالد محمد",
    branch: "فرع جدة",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 3,
    childName: "عمر سعيد",
    dateOfBirth: "24/11/2021",
    parentName: "سعيد العمري",
    branch: "فرع الدمام",
    reservationStatus: "confirmed",
  },
  {
    id: 4,
    childName: "ليلى عبدالرحمن",
    dateOfBirth: "17/2/2019",
    parentName: "عبدالرحمن السعيد",
    branch: "فرع الرياض",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 5,
    childName: "يوسف علي",
    dateOfBirth: "9/6/2022",
    parentName: "علي يوسف",
    branch: "فرع المدينة",
    reservationStatus: "confirmed",
  },
  {
    id: 6,
    childName: "نورة ناصر",
    dateOfBirth: "30/4/2020",
    parentName: "ناصر الشمري",
    branch: "فرع جدة",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 7,
    childName: "سلطان فهد",
    dateOfBirth: "22/9/2021",
    parentName: "فهد السلطان",
    branch: "فرع الدمام",
    reservationStatus: "confirmed",
  },
  {
    id: 8,
    childName: "سارة خالد",
    dateOfBirth: "14/3/2022",
    parentName: "خالد العنزي",
    branch: "فرع الرياض",
    reservationStatus: "waitingForConfirmation",
  },
  {
    id: 9,
    childName: "ريان عبدالله",
    dateOfBirth: "5/10/2019",
    parentName: "عبدالله الريان",
    branch: "فرع جدة",
    reservationStatus: "rejected",
  },
  {
    id: 10,
    childName: "منيرة سعد",
    dateOfBirth: "28/7/2021",
    parentName: "سعد المنصور",
    branch: "فرع المدينة",
    reservationStatus: "waitingForPayment",
  },
  {
    id: 11,
    childName: "طلال محمد",
    dateOfBirth: "19/1/2020",
    parentName: "محمد الطلال",
    branch: "فرع الدمام",
    reservationStatus: "confirmed",
  },
  {
    id: 12,
    childName: "جواهر عبدالعزيز",
    dateOfBirth: "11/12/2022",
    parentName: "عبدالعزيز الجوهر",
    branch: "فرع الرياض",
    reservationStatus: "waitingForPayment",
  },
];

const Children = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="block relative w-full grow sm:w-auto max-w-[30.3125rem]">
          <Input
            type="text"
            className="rounded-full px-4 pl-16 rtl:pl-4 rtl:pr-16 placeholder:text-mid-gray"
            placeholder="البحث باسم الحضانة / اسم طفل / ولي امر"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-8 rtl:left-auto rtl:right-8 top-1/2 -translate-y-1/2 size-6 text-gray" />
        </div>

        <Button size={"sm"} variant={"outline"}>
          دعوة ولي أمر
        </Button>
      </div>

      <div className="mt-6 lg:p-4 space-y-1">
        <p className="heading-4 font-medium text-primary text-center">
          الأطفال
        </p>

        <DataTable
          columns={columns}
          data={childrenData}
          globalFilterValue={searchQuery}
          setGlobalFilterValue={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default Children;
