import Centers from "@/components/dashboard/centers/Centers";

export default async function CentersPage() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-center">
        <h1 className="heading-4 font-bold text-primary">الحضانات</h1>
      </div>

      <Centers />
    </div>
  );
}
