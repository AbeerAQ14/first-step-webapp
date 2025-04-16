"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";
import { SignInFormData } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import LoadingOverlay from "@/components/forms/LoadingOverlay";

const SignIn = () => {
  const router = useRouter();
  const locale = useLocale();
  // --- Data Fetching & Mutation ---
  const mutation = useMutation<
    any, // Type of successful response from submitFormData
    Error, // Type of error thrown by submitFormData
    SignInFormData // Type of variable passed to mutate function (original form data)
  >({
    mutationFn: async (originalData: SignInFormData) => {
      const payload: { email: string; password: string } = originalData;
      return await authService.login(payload.email, payload.password);
    },
    onSuccess: (data) => {
      console.log("Submission successful:", data);
      useAuthStore.setState({
        token: data.token,
        user: data.user,
      });

      router.push(`/${locale}`);
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      alert(`Submission failed: ${error.message}`);
    },
  });

  useEffect(() => {
    router.prefetch(`/${locale}`);
  }, []);

  const t = useTranslations("auth");

  const onSubmit = async (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="px-5 sm:px-10 py-20">
      {mutation.isSuccess && <LoadingOverlay content="Signing you in..." />}

      <div className="flex flex-col items-center gap-y-12">
        <Image
          src="/assets/logos/logo.svg"
          alt="First Step Logo"
          width={64.09}
          height={80}
        />

        <div className="flex flex-col w-full max-w-[41.25rem]">
          <h1 className="heading-3 text-center text-primary">
            {t("sign-in.title")}
          </h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <SignInForm onSubmit={onSubmit} isLoading={mutation.isPending} />
          </div>

          <div className="mt-12 flex flex-col gap-y-4">
            <p className="text-mid-gray text-center">
              {t("options.dont-have")}
            </p>

            <div className="w-full flex flex-col gap-y-4 sm:flex-row justify-center gap-x-16">
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold text-mid-gray !border-light-gray"
                // disabled={form.formState.isSubmitting}
              >
                {t("buttons.sign-up-center")}
              </Button>
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold"
                // disabled={form.formState.isSubmitting}
              >
                {t("buttons.sign-up-parent")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
