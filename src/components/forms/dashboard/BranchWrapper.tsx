"use client";

import React, { useState } from "react";
import Branch from "./Branch";
import { BranchAdminFormData, BranchFormData } from "@/lib/schemas";
import BranchAdminForm from "./BranchAdminForm";

const BranchWrapper = ({
  initialValues,
  mode,
  branchId,
}: {
  initialValues: BranchFormData;
  mode: "add" | "edit" | "show";
  branchId?: string;
}) => {
  const [open, setOpen] = useState(false);

  // onSubmitBranch function for each page (add - edit)
  const onSubmitBranch = (data: BranchFormData) => {
    console.log(data);
    setOpen(true);
  };

  const onSubmitAdmin = (data: BranchAdminFormData) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Branch
        initialValues={initialValues}
        mode={mode}
        onSubmit={onSubmitBranch}
        branchId={branchId}
      />

      <BranchAdminForm open={open} setOpen={setOpen} onSubmit={onSubmitAdmin} />
    </React.Fragment>
  );
};

export default BranchWrapper;
