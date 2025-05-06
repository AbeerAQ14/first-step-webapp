import MemberFormWrapper from "@/components/forms/dashboard/team/MemberFormWrapper";

export default async function AddTeamMember({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  return (
    <div className="p-10 flex flex-col gap-y-6">
      <p className="heading-4 font-medium text-primary text-center">
        تعديل معلومات الفرد
      </p>

      <MemberFormWrapper
        memberId={memberId}
        initialData={{
          name: "نجلاء حسين",
          branch: "الرياض",
          job: "مشرفة نظافة",
          image:
            "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        mode="edit"
      />
    </div>
  );
}
