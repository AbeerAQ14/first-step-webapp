"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { UseFormReturn } from "react-hook-form";
import { transformParentDataToExpectedPayload } from "@/lib/utils";
import { ParentRegisterFormDataInput, ParentRegisterPayload } from "@/types";
import SignUp from "./SignUp";
import { SignUpParentFormData } from "@/lib/schemas";
import LoadingOverlay from "@/components/forms/LoadingOverlay";
import { ApiError } from "@/lib/error-handling";

const SignUpWrapper = () => {
  const router = useRouter();
  const locale = useLocale();
  const formRef = useRef<UseFormReturn<SignUpParentFormData> | null>(null);
  const t = useTranslations("auth.parent-signup");

  const onError = (error: ApiError) => {
    if (!formRef.current) return;

    // Clear any existing errors first
    formRef.current.clearErrors();

    // Handle field-specific validation errors
    if (error.errors && Object.keys(error.errors).length > 0) {
      Object.entries(error.errors).forEach(([field, messages]) => {
        // Map API field names to form field names if needed
        let formField = field;

        // Handle nested fields like children.0.kinship
        if (field.includes(".")) {
          const parts = field.split(".");
          if (parts[0] === "children" && !isNaN(Number(parts[1]))) {
            // Keep the array index for children fields
            formField = field;
          }
        }

        // Set the error on the form field
        formRef.current?.setError(formField as keyof SignUpParentFormData, {
          type: "server",
          message: Array.isArray(messages) ? messages[0] : messages,
        });
      });
    } else if (error.message) {
      // If there's a general error message, show it at the root level
      formRef.current.setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  // --- Data Fetching & Mutation ---
  const mutation = useMutation<
    any, // Success response type (update this based on your API response)
    ApiError,
    ParentRegisterFormDataInput
  >({
    mutationFn: async (originalData: ParentRegisterFormDataInput) => {
      const payload: ParentRegisterPayload =
        transformParentDataToExpectedPayload(originalData);
      return await authService.registerParent(payload);
    },
    onSuccess: (data) => {
      router.push(`/${locale}/sign-in`);
    },
    onError,
  });

  useEffect(() => {
    router.prefetch(`/${locale}/sign-in`);
  }, [locale, router]);

  const submitHandler = (data: any) => {
    // Clear any existing errors before submitting
    if (formRef.current) {
      formRef.current.clearErrors();
    }
    mutation.mutate(data);
  };

  return (
    <div>
      {mutation.isSuccess && (
        <LoadingOverlay content="Welcome aboard! Let's get you signed in." />
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
