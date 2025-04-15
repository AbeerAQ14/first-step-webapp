import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { transformParentDataToExpectedPayload } from "@/lib/utils";
import { ParentRegisterFormDataInput, ParentRegisterPayload } from "@/types";
import SignUp from "./SignUp";
import { SignUpParentFormData } from "@/lib/schemas";

const SignUpWrapper = () => {
  const router = useRouter();
  const locale = useLocale();

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
    onError: (error) => {
      console.error("Submission failed:", error);
      alert(`Submission failed: ${error.message}`);
    },
  });

  useEffect(() => {
    router.prefetch(`/${locale}/sign-in`);
  }, []);

  const submitHandler = (data: SignUpParentFormData) => {
    mutation.mutate(data);
  };

  return (
    <SignUp submitHandler={submitHandler} isLoading={mutation.isPending} />
  );
};

export default SignUpWrapper;
