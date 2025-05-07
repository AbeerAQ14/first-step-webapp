"use client";

import { getColumns, Parent } from "@/components/tables/data/parents";
import { DataTable } from "@/components/tables/DataTable";
import React, { useState } from "react";

// const parentsData: Parent[] = [
//   {
//     id: 1,
//     parentName: "أحمد محمد",
//     phone: "2222222222",
//     childName: "سارة أحمد",
//     branch: "الفرع الرئيسي",
//     reservationStatus: "confirmed",
//   },
//   {
//     id: 2,
//     parentName: "فاطمة علي",
//     phone: "2222222222",
//     childName: "محمد علي",
//     branch: "فرع الخالدية",
//     reservationStatus: "waitingForPayment",
//   },
//   {
//     id: 3,
//     parentName: "خالد عبدالله",
//     phone: "2222222222",
//     childName: "نورة خالد",
//     branch: "فرع النزهة",
//     reservationStatus: "confirmed",
//   },
//   {
//     id: 4,
//     parentName: "نورة سعيد",
//     phone: "2222222222",
//     childName: "سلطان سعيد",
//     branch: "فرع العليا",
//     reservationStatus: "waitingForConfirmation",
//   },
//   {
//     id: 5,
//     parentName: "عبدالرحمن يوسف",
//     phone: "2222222222",
//     childName: "لينا عبدالرحمن",
//     branch: "فرع الروضة",
//     reservationStatus: "confirmed",
//   },
//   {
//     id: 6,
//     parentName: "منيرة فهد",
//     phone: "2222222222",
//     childName: "فهد منصور",
//     branch: "فرع الملز",
//     reservationStatus: "waitingForPayment",
//   },
//   {
//     id: 7,
//     parentName: "عمر حسن",
//     phone: "2222222222",
//     childName: "ريم عمر",
//     branch: "فرع السلامة",
//     reservationStatus: "confirmed",
//   },
//   {
//     id: 8,
//     parentName: "سلمان محمد",
//     phone: "2222222222",
//     childName: "دانة سلمان",
//     branch: "فرع الحمراء",
//     reservationStatus: "rejected",
//   },
//   {
//     id: 9,
//     parentName: "هند عبدالعزيز",
//     phone: "2222222222",
//     childName: "عبدالله هند",
//     branch: "فرع الياسمين",
//     reservationStatus: "rejected",
//   },
//   {
//     id: 10,
//     parentName: "بدر سالم",
//     phone: "2222222222",
//     childName: "غادة بدر",
//     branch: "فرع الشفا",
//     reservationStatus: "waitingForPayment",
//   },
//   {
//     id: 11,
//     parentName: "عائشة راشد",
//     phone: "2222222222",
//     childName: "راشد عامر",
//     branch: "فرع المروج",
//     reservationStatus: "confirmed",
//   },
//   {
//     id: 12,
//     parentName: "طارق حامد",
//     phone: "2222222222",
//     childName: "حامد طارق",
//     branch: "فرع العزيزية",
//     reservationStatus: "rejected",
//   },
//   {
//     id: 13,
//     parentName: "منال خالد",
//     phone: "2222222222",
//     childName: "رنا منال",
//     branch: "فرع الربوة",
//     reservationStatus: "waitingForPayment",
//   },
// ];

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

// Function to get filtered parents based on selection
const useFilteredParents = (
  selectedParents: Parent[],
  selectedChildMap: Record<number, string>
): Parent[] => {
  return React.useMemo(() => {
    // If no parents are selected, return all parents with all children
    if (selectedParents.length === 0) {
      return selectedParents;
    }

    // Return selected parents with only the selected children (or all children if none selected for that parent)
    return selectedParents.map((parent) => {
      const selectedChildId = selectedChildMap[parent.id];

      // If no child is selected for this parent, return parent with all children
      if (!selectedChildId) {
        return parent;
      }

      // Return parent with only the selected child
      return {
        ...parent,
        childs: parent.childs.filter((child) => child.id === selectedChildId),
      };
    });
  }, [selectedParents, selectedChildMap]);
};

const Parents = () => {
  const [selected, setSelected] = useState<Parent[]>([]);
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});

  const selectedWithOnlySelectedChild = useFilteredParents(
    selected,
    selectedChildMap
  );

  const columns = getColumns(selectedChildMap, setSelectedChildMap);

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
