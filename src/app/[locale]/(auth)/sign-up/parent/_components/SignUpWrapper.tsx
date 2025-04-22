"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { UseFormReturn } from "react-hook-form";
import { transformParentDataToExpectedPayload } from "@/lib/utils";
import { ParentRegisterFormDataInput, ParentRegisterPayload } from "@/types";
import SignUp from "./SignUp";
import { SignUpParentFormData } from "@/lib/schemas";
import LoadingOverlay from "@/components/forms/LoadingOverlay";

const SignUpWrapper = () => {
  const router = useRouter();
  const locale = useLocale();

  const formRef = useRef<UseFormReturn<SignUpParentFormData> | null>(null);

  // --- Data Fetching & Mutation ---
  const mutation = useMutation<
    any, // Type of successful response from submitFormData
    Error, // Type of error thrown by submitFormData
    ParentRegisterFormDataInput // Type of variable passed to mutate function (original form data)
  >({
    mutationFn: async (originalData: ParentRegisterFormDataInput) => {
      const payload: ParentRegisterPayload =
        transformParentDataToExpectedPayload(originalData);

      return await authService.registerParent(payload);
    },
    onSuccess: (data) => {
      console.log("Submission successful:", data);

      router.push(`/${locale}/sign-in`);
    },
    onError: (error: any) => {
      console.error("Submission failed:", error);

      if (formRef.current && error.errors) {
        const allMessages: string[] = [];

        Object.entries(error.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            allMessages.push(...messages);
          } else if (typeof messages === "string") {
            allMessages.push(messages);
          }
        });

        if (allMessages.length > 0) {
          formRef.current?.setError("root", {
            type: "server",
            message: allMessages.join("/n"), // Or use "\n" if you're rendering them as a list
          });
        }
      }

      // Show a fallback message if there's no detailed error list
      if (formRef.current && error.message && !error.errors) {
        formRef.current?.setError("root", {
          type: "server",
          message: error.message || "An unexpected error occurred.",
        });
      }
    },
  });

  useEffect(() => {
    router.prefetch(`/${locale}/sign-in`);
  }, []);

  const submitHandler = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div>
      {mutation.isSuccess && (
        <LoadingOverlay
          content={`Welcome aboard! Let\u2019s get you signed in.`}
        />
      )}

      <SignUp
        formRef={formRef}
        submitHandler={submitHandler}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default SignUpWrapper;
