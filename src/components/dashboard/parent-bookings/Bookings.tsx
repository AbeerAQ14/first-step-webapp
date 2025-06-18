"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingCardProps {
  status: "تم الدفع" | "في انتظار الدفع" | "مرفوض" | "في انتظار التأكيد";
  bookingDetails: string;
  onShowDetails: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  status,
  bookingDetails,
  onShowDetails,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{bookingDetails}</p>
        <p>Status: {status}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {(status === "تم الدفع" || status === "مرفوض") && (
          <Button onClick={onShowDetails}>Show Details</Button>
        )}
        {status === "في انتظار الدفع" && (
          <>
            <Button>Confirm</Button>
            <Button variant="destructive">Delete</Button>
          </>
        )}
        {status === "في انتظار التأكيد" && (
          <>
            <Button onClick={onShowDetails}>Show Details</Button>
            <Button variant="destructive">Decline Reservation</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const bookingDetailsMock = {
  childName: "إيسام، أمنية",
  className: "حضانه الأمل",
  branch: "الرياض",
  status: "في انتظار الدفع",
  program: "يومي",
  startDay: "السبت 2025/5/20",
  endDay: "الخميس 2025/5/26",
  daysCount: 9,
  paymentMethod: "ميسر",
  amount: 450,
  notes: [
    "تم إرسال إشعار الدفع عبر البريد الإلكتروني.",
    "سيتم إرسال إشعار آخر للدفع.",
    "سيتم إرسال إشعار ثالث للدفع.",
    "سيتم إرسال إشعار رابع للدفع.",
    "سيتم إلغاء الحجز تلقائياً في حال عدم الدفع.",
  ],
};

function BookingDetailsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center w-full">تفاصيل الحجز</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-2">
            <div>اسم الطفل/ الأطفال</div>
            <div className="font-bold">{bookingDetailsMock.childName}</div>
            <div>اسم الحضانة</div>
            <div className="font-bold">{bookingDetailsMock.className}</div>
            <div>الفرع</div>
            <div className="font-bold">{bookingDetailsMock.branch}</div>
            <div>حالة الحجز</div>
            <div className="font-bold text-orange-500">
              {bookingDetailsMock.status}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>البرنامج</div>
            <div className="font-bold">{bookingDetailsMock.program}</div>
            <div>بداية يوم</div>
            <div className="font-bold">{bookingDetailsMock.startDay}</div>
            <div>نهاية يوم</div>
            <div className="font-bold">{bookingDetailsMock.endDay}</div>
            <div>عدد الأيام</div>
            <div className="font-bold">{bookingDetailsMock.daysCount}</div>
            <div>طريقة الدفع</div>
            <div className="font-bold">{bookingDetailsMock.paymentMethod}</div>
          </div>
        </div>
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <div className="font-bold text-blue-800 text-lg">
            {bookingDetailsMock.amount} ﷼
          </div>
          <div className="font-bold text-blue-800">المبلغ</div>
        </div>
        <div className="mt-2">
          <div className="font-bold text-blue-800">ملاحظات</div>
          <ul className="list-decimal pr-5 text-xs mt-1">
            {bookingDetailsMock.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const Bookings = () => {
  const [showDetails, setShowDetails] = useState(false);
  const bookings = [
    { id: 1, status: "تم الدفع", details: "Booking #1 Details" },
    { id: 2, status: "في انتظار الدفع", details: "Booking #2 Details" },
    { id: 3, status: "مرفوض", details: "Booking #3 Details" },
    { id: 4, status: "في انتظار التأكيد", details: "Booking #4 Details" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          status={booking.status as any}
          bookingDetails={booking.details}
          onShowDetails={() => setShowDetails(true)}
        />
      ))}
      <BookingDetailsModal open={showDetails} onOpenChange={setShowDetails} />
    </div>
  );
};
