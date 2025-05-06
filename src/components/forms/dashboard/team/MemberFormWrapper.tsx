"use client";

import MemberForm from "./MemberForm";
import { TeamMemberFormData } from "@/lib/schemas";

export interface InitialData {
  name: string;
  branch: string;
  job: string;
  image?: File | string;
}

const MemberFormWrapper = ({
  memberId,
  initialData,
  mode,
}: {
  memberId: string;
  initialData: InitialData;
  mode: "add" | "edit";
}) => {
  // an onSubmit for add
  const onAddSubmit = (data: TeamMemberFormData) => {
    console.log("add", data);
  };

  // an onSubmit for add
  const onEditSubmit = (data: TeamMemberFormData) => {
    console.log("edit", data);
  };

  // an onSubmit for add
  const onDeleteSubmit = () => {
    console.log("delete", memberId);
  };

  return (
    <MemberForm
      initialData={initialData}
      mode={mode}
      onSubmit={mode === "add" ? onAddSubmit : onEditSubmit}
      onDelete={onDeleteSubmit}
    />
  );
};

export default MemberFormWrapper;
