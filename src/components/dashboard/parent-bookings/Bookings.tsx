"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { parentService } from "@/services/parent";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_STYLES: Record<string, string> = {
  accepted: "bg-success text-white border-green-400",
  pending: "bg-warning text-white",
  rejected: "bg-danger text-white border-red-400",
  waiting_confirmation: "bg-light-gray text-white",
};

// Map API status to display status
const STATUS_MAP: Record<string, string> = {
  accepted: "تم الدفع",
  pending: "في انتظار الدفع",
  rejected: "مرفوض",
  waiting_confirmation: "في انتظار التأكيد",
};

interface ApiResponse {
  data: Array<{
    id: number;
    status: string;
    price_amount: string;
    enrollment_date: string;
    enrollment_type: string;
    children: Array<{
      child_name: string;
      branch: {
        name: string;
        nursery_name: string;
      };
    }>;
  }>;
}

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
      {STATUS_MAP[status] || status}
    </span>
  );
}

function BookingCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="py-6">
        <div className="grid grid-cols-2 gap-6 text-sm mb-4 place-items-center">
          <div className="flex flex-col gap-2 text-right w-full">
            {rightFields.map((field) => (
              <div key={field.key} className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-right w-full">
            {leftFields.map((field) => (
              <div key={field.key} className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

function BookingCard({
  booking,
  onShowDetails,
}: {
  booking: any;
  onShowDetails: () => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="py-6 px-6">
        <div
          className="grid grid-cols-2 gap-x-20 gap-y-4 text-sm mb-4 justify-center"
          dir="rtl"
        >
          {/* Right column */}
          <div className="flex flex-col gap-2 items-start" dir="rtl">
            {rightFields.map((field, idx) => (
              <div
                key={field.key + "-" + idx}
                className="flex flex-row items-center gap-x-2 w-full text-right justify-start"
                dir="rtl"
              >
                <span className="text-primary-blue font-bold whitespace-nowrap text-right">
                  {field.label}:
                </span>
                <span className="font-bold text-mid-gray text-right">
                  {field.isStatus ? (
                    <StatusBadge status={booking.status} />
                  ) : (
                    booking[field.key]
                  )}
                </span>
              </div>
            ))}
          </div>
          {/* Left column */}
          <div className="flex flex-col gap-2 items-start" dir="rtl">
            {leftFields.map((field, idx) => (
              <div
                key={field.key + "-" + idx}
                className="flex flex-row items-center gap-x-2 w-full text-right justify-start"
                dir="rtl"
              >
                <span className="text-primary-blue font-bold whitespace-nowrap text-right">
                  {field.label}:
                </span>
                <span className="font-bold text-mid-gray text-right">
                  {booking[field.key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {actionsByStatus[STATUS_MAP[booking.status]]?.[0].map(
            (action, idx) => (
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
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export const Bookings = () => {
  const [showDetails, setShowDetails] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["enrollments"],
    queryFn: parentService.getEnrollments,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        حدث خطأ أثناء تحميل البيانات
      </div>
    );
  }

  const bookings =
    data?.data.map((booking) => ({
      id: booking.id,
      status: booking.status,
      childName: booking.children.map((child) => child.child_name).join("، "),
      className: booking.children[0]?.branch?.nursery_name || "",
      branch: booking.children[0]?.branch?.name || "",
      program: booking.enrollment_type,
      startDay: new Date(booking.enrollment_date).toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      endDay: new Date(booking.enrollment_date).toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      daysCount: 1,
      paymentMethod: "ميسر",
      amount: parseFloat(booking.price_amount),
      notes: [],
    })) || [];

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
