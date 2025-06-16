"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";

const AdminAds = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminAdvertisements"],
    queryFn: adminService.getAdvertisements,
  });

  // Add Advertisement button at the top
  const addButton = (
    <div className="mb-4 flex justify-end">
      <Button asChild size="sm">
        <Link href="/dashboard/admin/advertisement/add">إضافة إعلان جديد</Link>
      </Button>
    </div>
  );

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;
  if (!data?.data?.length)
    return (
      <>
        {addButton}
        <div>لا توجد إعلانات</div>
      </>
    );

  const buttons = (
    formData: AdRequestFormData,
    isValid: boolean,
    adId: number
  ) => (
    <>
      <Button asChild size={"sm"}>
        <Link href={`advertisement/${adId}/edit`}>تعديل الإعلان</Link>
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          // Implement delete logic here
          console.log(formData, isValid);
        }}
        size={"sm"}
        variant={"outline"}
        className="!border-destructive text-destructive"
      >
        حذف الإعلان
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-y-6">
      {addButton}
      {data.data.map((item: any) => (
        <AdRequestForm
          key={item.id}
          initialData={{
            title: { ar: item.title.ar, en: item.title.en },
            description: { ar: item.description.ar, en: item.description.en },
            image: item.image,
            start_date: new Date(item.publish_date),
            end_date: new Date(item.end_date),
          }}
          mode="show"
        >
          {(formData, isValid) => buttons(formData, isValid, item.id)}
        </AdRequestForm>
      ))}
    </div>
  );
};

export default AdminAds;
