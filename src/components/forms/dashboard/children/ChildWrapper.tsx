"use client";

import React from "react";
import Child from "./Child";
import { useMutation, useQuery } from "@tanstack/react-query";

const ChildWrapper = ({
  initialValues,
  mode,
  childId,
}: {
  initialValues: any;
  mode: "add" | "edit" | "show";
  childId?: string;
}) => {
  // Fetch child data if in show/edit mode and childId is provided
  const { data: fetchedChild, isLoading } = useQuery({
    queryKey: ["child", childId],
    queryFn: async () => {
      if (!childId) return null;
      const { parentService } = await import("@/services/dashboardApi");
      return parentService.getChild(childId);
    },
    enabled: !!childId && mode !== "add",
  });

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

  // Use fetched child data as initialValues if available
  const effectiveInitialValues =
    mode !== "add" && fetchedChild ? fetchedChild : initialValues;

  if (isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Child
        initialValues={effectiveInitialValues}
        mode={mode}
        onSubmit={onSubmit}
        childId={childId}
      />
    </React.Fragment>
  );
};

export default ChildWrapper;
