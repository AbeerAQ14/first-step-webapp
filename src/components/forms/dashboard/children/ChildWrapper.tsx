"use client";

import React from "react";
import Child from "./Child";
import { useMutation } from "@tanstack/react-query";

const ChildWrapper = ({
  initialValues,
  mode,
}: {
  initialValues: any;
  mode: "add" | "edit" | "show";
  branchId?: string;
}) => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const { parentService } = await import("@/services/dashboardApi");
      return parentService.addChild(data);
    },
    onSuccess: (response) => {
      console.log("Child added successfully (mutation):", response);
      // Optionally, redirect or show a UI message here
    },
    onError: (error: any) => {
      console.error("Failed to add child (mutation):", error);
      if (error?.response?.data) {
        console.error("API error details:", error.response.data);
      }
      if (error?.response?.data?.errors) {
        console.error("API validation errors:", error.response.data.errors);
      }
      // Optionally, show a UI error message here
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitting form data:", data); // Debug log
    mutation.mutate(data);
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
