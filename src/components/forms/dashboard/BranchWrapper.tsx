"use client";

import React from "react";
import Branch from "./Branch";
import { BranchFormData } from "@/lib/schemas";

const BranchWrapper = ({
  initialValues,
  mode,
  branchId,
}: {
  initialValues: BranchFormData;
  mode: "add" | "edit" | "show";
  branchId?: string;
}) => {
  // onSubmit function for each page (add - edit)
  const onSubmit = (data: BranchFormData) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Branch
        initialValues={initialValues}
        mode={mode}
        onSubmit={onSubmit}
        branchId={branchId}
      />
    </React.Fragment>
  );
};

export default BranchWrapper;
