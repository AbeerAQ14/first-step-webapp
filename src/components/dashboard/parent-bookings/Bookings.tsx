"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STATUS_STYLES: Record<string, string> = {
  "تم الدفع": "bg-success text-white border-green-400",
  "في انتظار الدفع": "bg-warning text-white ",
  مرفوض: "bg-danger text-white border-red-400",
  "في انتظار التأكيد": "bg-light-gray text-white ",
};

const bookings = [
  {
    id: 1,
    status: "تم الدفع",
    childName: "إيسام، أمنية",
    className: "حضانه الأمل",
    branch: "الرياض",
    program: "يومي",
    startDay: "السبت 2025/5/20",
    endDay: "الخميس 2025/5/26",
    daysCount: 9,
    paymentMethod: "ميسر",
    amount: 450,
    notes: [
      "تم إرسال إشعار الدفع عبر البريد الإلكتروني.",
      "سيتم إرسال إشعار آخر للدفع.",
      "سيتم إلغاء الحجز تلقائياً في حال عدم الدفع.",
    ],
  },
  {
    id: 2,
    status: "في انتظار الدفع",
    childName: "سارة محمد",
    className: "حضانة المستقبل",
    branch: "جدة",
    program: "أسبوعي",
    startDay: "الأحد 2025/6/1",
    endDay: "الخميس 2025/6/5",
    daysCount: 5,
    paymentMethod: "بطاقة",
    amount: 300,
    notes: ["سيتم إرسال إشعار آخر للدفع."],
  },
  {
    id: 3,
    status: "مرفوض",
    childName: "ليان خالد",
    className: "حضانة الزهور",
    branch: "الدمام",
    program: "شهري",
    startDay: "الإثنين 2025/7/1",
    endDay: "الخميس 2025/7/31",
    daysCount: 30,
    paymentMethod: "نقدي",
    amount: 1200,
    notes: ["تم رفض الحجز بسبب عدم توفر أماكن."],
  },
  {
    id: 4,
    status: "في انتظار التأكيد",
    childName: "محمد علي",
    className: "حضانة الأمل",
    branch: "الرياض",
    program: "بالساعة",
    startDay: "الثلاثاء 2025/8/10",
    endDay: "الثلاثاء 2025/8/10",
    daysCount: 1,
    paymentMethod: "ميسر",
    amount: 50,
    notes: [],
  },
];

const rightFields = [
  { key: "status", label: "حالة الحجز", isStatus: true },
  { key: "startDay", label: "بداية يوم" },
  { key: "endDay", label: "نهاية يوم" },
  { key: "daysCount", label: "عدد الأيام" },
];

const leftFields = [
  { key: "childName", label: "الطفل/الأطفال" },
  { key: "className", label: "الحضانة" },
  { key: "branch", label: "الفرع" },
  { key: "program", label: "البرنامج" },
  { key: "paymentMethod", label: "طريقة الدفع" },
];

const actionsByStatus: Record<
  string,
  { label: string; variant?: "destructive"; onClick?: (b: any) => void }[][]
> = {
  "تم الدفع": [[{ label: "عرض تفاصيل الحجز" }]],
  "في انتظار الدفع": [
    [
      { label: "أكد الحجز الان" },
      { label: "الغاء الحجز", variant: "destructive" },
    ],
  ],
  مرفوض: [[{ label: "عرض تفاصيل الحجز" }]],
  "في انتظار التأكيد": [
    [
      { label: "عرض تفاصيل الحجز" },
      { label: "الغاء الحجز", variant: "destructive" },
    ],
  ],
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-bold border ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700 border-gray-400"
      }`}
    >
      {status}
    </span>
  );
}

function BookingCard({
  booking,
  onShowDetails,
}: {
  booking: (typeof bookings)[0];
  onShowDetails: () => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="py-6">
        <div className="grid grid-cols-2 gap-6 text-sm mb-4 place-items-center">
          {/* Right column */}
          <div className="flex flex-col gap-2 text-right">
            {rightFields.map((field) => (
              <div key={field.key}>
                <span className="text-primary-blue font-bold">
                  {field.label}:{" "}
                </span>
                {field.isStatus ? (
                  <StatusBadge status={booking.status} />
                ) : (
                  <span className="font-bold text-mid-gray">
                    {booking[field.key as keyof typeof booking]}
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* Left column */}
          <div className="flex flex-col gap-2 text-right">
            {leftFields.map((field) => (
              <div key={field.key}>
                <span className="text-primary-blue font-bold">
                  {field.label}:{" "}
                </span>
                <span className="font-bold text-mid-gray">
                  {booking[field.key as keyof typeof booking]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {actionsByStatus[booking.status]?.[0].map((action, idx) => (
            <Button
              key={action.label}
              variant={action.variant}
              className={`border ${
                action.label === "الغاء الحجز"
                  ? "bg-transparent text-red-500 border-red-500 hover:bg-red-50"
                  : "border-0"
              }`}
              onClick={
                action.label === "عرض التفاصيل" ? onShowDetails : undefined
              }
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const Bookings = () => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onShowDetails={() => setShowDetails(true)}
        />
      ))}
    </div>
  );
};
