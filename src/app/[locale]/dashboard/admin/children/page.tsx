import ChildrenCards from "@/components/dashboard/children/Children";

export default async function Children() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-center">
        <h1 className="sr-only heading-4 font-medium text-primary">الأطفال</h1>
      </div>

      <ChildrenCards noEdit />
    </div>
  );
}
