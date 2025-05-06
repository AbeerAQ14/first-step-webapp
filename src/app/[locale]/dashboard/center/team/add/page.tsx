import MemberFormWrapper from "@/components/forms/dashboard/team/MemberFormWrapper";

export default async function AddTeamMember() {
  return (
    <div className="p-10 flex flex-col gap-y-6">
      <p className="heading-4 font-medium text-primary text-center">
        إضافة فرد للفريق
      </p>

      <MemberFormWrapper
        initialData={{
          name: "",
          branch: "",
          job: "",
          image: undefined,
        }}
        mode="add"
      />
    </div>
  );
}
