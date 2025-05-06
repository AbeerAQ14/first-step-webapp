import BlogRequestForm from "@/components/forms/dashboard/adblog-request/BlogRequest";

export default function CenterAdRequest() {
  return (
    <div className="p-10 flex flex-col gap-y-4">
      <div className="space-y-2">
        <p className="heading-4 font-medium text-primary">طلب مدونة</p>
        <p className="text-info">اكتب مدونتك بشكل مجاني تمامًا </p>
      </div>

      <BlogRequestForm />
    </div>
  );
}
