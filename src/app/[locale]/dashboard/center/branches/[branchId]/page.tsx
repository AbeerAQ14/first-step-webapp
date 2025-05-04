import BranchShow from "@/components/forms/dashboard/BranchShow";
import BranchWrapper from "@/components/forms/dashboard/BranchWrapper";

export default async function DashboardBranchDetails({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;

  const initialValues = {
    name: "خالد العبدالله",
    email: "Khaled.Alabdullah@example.sa",
    phone: "557891234",
    neighborhood: "حي النخيل",
    nursery_name: "روضة أجيال المستقبل",
    address: "شارع الأمير سلطان",
    city: "الرياض",
    location: "https://maps.google.com/?q=24.7136,46.6753",
    services: ["kindergarten", "care"],
    additional_service: "دروس إضافية في اللغة الإنجليزية",
    work_days_from: "sunday",
    work_days_to: "thursday",
    work_hours_from: "07:00",
    work_hours_to: "15:00",
  };

  return (
    <div>
      <BranchShow initialValues={initialValues} branchId={branchId} />
    </div>
  );

  // const dataKeys: DataKeys = {
  //   arabiName: "اسم الفرع باللغة العربية",
  //   englishName: "اسم الفرع باللغة الانجليزية",
  //   email: "البريد الإلكتروني",
  //   phone: "رقم الجوال",
  //   city: "المدينة",
  //   neighborhood: "الحي",
  //   address: "الشارع",
  //   location: "رابط الموقع الجغرافي",
  //   accepted_ages: "الأعمار المقبولة",
  //   services: "الخدمات المتاحة في الفرع",
  // };

  // const branchData = {
  //   arabiName: "اسم الفرع النموذجي",
  //   englishName: "Sample Branch Name",
  //   email: "example@email.sa",
  //   phone: "+966123456789",
  //   city: "الرياض",
  //   neighborhood: "حي النموذجية",
  //   address: "شارع المثال, الرياض",
  //   location: "https://maps.google.com/?q=24.7136,46.6753",
  //   accepted_ages: ["من سن 0 إلى 3 سنوات", "من سن 3 إلى 6  سنوات"],
  //   services: ["توفير وجبات ", "رعاية رضع", "تعليم الرسم"],
  // };

  // return (
  //   <div className="flex flex-col items-center gap-y-10">
  //     <div className="p-5 lg:p-10 w-full flex flex-col justify-between gap-y-4">
  //       <h1 className="heading-4 font-bold text-primary">تفاصيل الفرع</h1>

  //       {Object.entries(branchData).map(([key, value]) => {
  //         const title = dataKeys[key as keyof DataKeys] || key;

  //         return (
  //           <div key={key} className="flex items-center justify-between">
  //             <p className="">{title}</p>

  //             {key === "location" ? (
  //               <a href={value as string} target="_blank" className="text-info">
  //                 رابط الموقع الجغرافي
  //               </a>
  //             ) : typeof value === "string" ? (
  //               <p className="text-mid-gray">{value}</p>
  //             ) : (
  //               <div className="flex flex-col items-end">
  //                 {value.map((item) => (
  //                   <p key={item} className="text-mid-gray">
  //                     {item}
  //                   </p>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>

  //     <div className="flex gap-5 lg:gap-x-10">
  //       <Button asChild size={"sm"}>
  //         <Link href={`${branchId}/edit`}>تعديل الفرع</Link>
  //       </Button>
  //       <Button
  //         size={"sm"}
  //         variant={"outline"}
  //         className="!border-destructive text-destructive"
  //       >
  //         حذف الفرع
  //       </Button>
  //     </div>
  //   </div>
  // );
}
