import MemberFormWrapper from "@/components/forms/dashboard/team/MemberFormWrapper";
import { useTranslations } from "next-intl";

export default function AddTeamMember() {
  const t = useTranslations("dashboard.center.team");

  return (
    <div className="p-10 flex flex-col gap-y-6">
      <p className="heading-4 font-medium text-primary text-center">
        {t("add.title")}
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
