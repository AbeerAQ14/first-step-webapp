"use client";

import React from "react";
import Child from "./Child";

const ChildWrapper = ({
  initialValues,
  mode,
  branchId,
}: {
  initialValues: any;
  mode: "add" | "edit" | "show";
  branchId?: string;
}) => {
  // onSubmit function for each page (add - edit)
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Child
        initialValues={initialValues}
        mode={mode}
        onSubmit={onSubmit}
        childId={branchId}
      />
    </React.Fragment>
  );
};

export default ChildWrapper;