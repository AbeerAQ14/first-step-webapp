"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/forms/PhoneInput";
import ChildrenCards from "@/components/dashboard/children/Children";
import { Label } from "@/components/ui/label";

interface ParentData {
  parent: {
    name: string;
    phone: string;
    email: string;
    national_number: string;
    children: any;
  };
}

export default function DashboardChildrenPage({
  params,
}: {
  params: Promise<{ parentId: string }>;
}) {
  const { parentId } = use(params);

  const { data, isLoading, error } = useQuery<ParentData>({
    queryKey: ["parent", parentId],
    queryFn: () => adminService.getParent(parentId),
    enabled: !!parentId,
  });

  return (
    <div>
      {/* Parent Info Readonly Form */}
      <div className="mb-8">
        <h2 className="heading-4 font-medium text-primary mb-6">
          بيانات ولي الأمر
        </h2>
        {isLoading ? (
          <div className="text-center py-8">جاري التحميل...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            حدث خطأ أثناء جلب البيانات
          </div>
        ) : parent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 md:gap-y-4">
            <div>
              <Label className="mb-2">
                <span className="text-base">الاسم</span>
              </Label>
              <Input
                type="text"
                value={data?.parent.name}
                readOnly
                placeholder="الاسم بالكامل كما في الهوية"
              />
            </div>
            <div>
              <Label className="mb-2">
                <span className="text-base">رقم الجوال</span>
              </Label>
              <PhoneInput
                value={data?.parent.phone?.replace(/^\+966/, "") || ""}
                onChange={() => {}}
                locale="ar"
                readOnly
              />
            </div>
            <div>
              <Label className="mb-2">
                <span className="text-base">البريد الإلكتروني</span>
              </Label>
              <Input
                type="email"
                value={data?.parent.email}
                readOnly
                placeholder="مثال: mennaemarauxi@gmail.com"
              />
            </div>
            <div>
              <Label className="mb-2">
                <span className="text-base">رقم الهوية</span>
              </Label>
              <Input
                type="text"
                value={data?.parent.national_number}
                readOnly
                placeholder="رقم الهوية"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mb-3.5 flex items-center">
        <h1 className="sr-only heading-4 font-medium text-primary">
          بيانات الأطفال
        </h1>
      </div>

      <ChildrenCards
        noEdit
        absoluteBaseUrl="/dashboard/admin/children"
        childrenData={{
          userName: data?.parent.name || "",
          children: data?.parent.children,
        }}
      />
    </div>
  );
}
