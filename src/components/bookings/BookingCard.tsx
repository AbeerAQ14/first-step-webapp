"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BookingStatus = "paid" | "pending" | "rejected" | "awaiting";

interface BookingCardProps {
  status: BookingStatus;
  startDate: string;
  endDate: string;
  days: number;
  children: string;
  nursery: string;
  branch: string;
  program: string;
  onViewDetails: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const statusStyles: { [key in BookingStatus]: string } = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  awaiting: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
};

const statusTexts: { [key in BookingStatus]: string } = {
  paid: "مدفوع",
  pending: "في انتظار الدفع",
  awaiting: "في انتظار التأكيد",
  rejected: "مرفوض",
};

const BookingCard: React.FC<BookingCardProps> = ({
  status,
  startDate,
  endDate,
  days,
  children,
  nursery,
  branch,
  program,
  onViewDetails,
  onConfirm,
  onCancel,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-tajawal">
            {nursery} - {branch}
          </CardTitle>
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${statusStyles[status]}`}
          >
            {statusTexts[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-tajawal">
          <div>
            <p>
              <strong>الطفل:</strong> {children}
            </p>
            <p>
              <strong>البرنامج:</strong> {program}
            </p>
          </div>
          <div>
            <p>
              <strong>تاريخ البدء:</strong> {startDate}
            </p>
            <p>
              <strong>تاريخ الانتهاء:</strong> {endDate}
            </p>
            <p>
              <strong>عدد الأيام:</strong> {days}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onViewDetails}>
            عرض التفاصيل
          </Button>
          {onConfirm && <Button onClick={onConfirm}>تأكيد الحجز</Button>}
          {onCancel && (
            <Button variant="destructive" onClick={onCancel}>
              إلغاء الحجز
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
