"use client";

import useOTPTimer from "@/hooks/useOTPTimer";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  createOTPVerificationSchema,
  OTPVerificationFormData,
} from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { useRouter } from "@/i18n/navigation";
import { LoaderCircle } from "lucide-react";
import { ApiError } from "@/lib/error-handling";

const SendOTPForm = ({ email }: { email: string }) => {
  const t = useTranslations("auth.otp.form");
  const tBtns = useTranslations("auth.buttons");
  const router = useRouter();
  const locale = useLocale();
  const formSchema = createOTPVerificationSchema(locale as "ar" | "en");
  const form = useForm<OTPVerificationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const mutation = useMutation<
    any, // Success response type (update this based on your API response)
    ApiError,
    OTPVerificationFormData
  >({
    mutationFn: async (data) => {
      if (!email) {
        throw {
          message: "Email not found.",
          errors: {},
          status: 400,
        };
      }
      return await authService.checkOTP(email, data.otp);
    },
    onSuccess: () => {
      router.push(`/reset-password?email=${email}`);
    },
    onError: (error) => {
      // Clear any existing errors
      form.clearErrors();

      // Handle field-specific validation errors
      if (error.errors && Object.keys(error.errors).length > 0) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (field === "otp") {
            form.setError("otp", {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          }
        });
      }

      // Always show the main error message
      form.setError("root", {
        type: "server",
        message: error.message,
      });
    },
  });

  const onSubmit = async (data: OTPVerificationFormData) => {
    // Clear any existing errors before submitting
    form.clearErrors();
    mutation.mutate(data);
  };

  const { timeLeft, otpExpired } = useOTPTimer({
    duration: 60,
    onExpire: () => {
      form.setError("root", {
        type: "expired",
        message: t("timer-expired"),
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem dir="ltr" className="flex flex-col items-center">
              <FormLabel className="font-medium text-mid-gray">
                {t("description")}
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="font-medium text-mid-gray text-base">
                {otpExpired
                  ? `${t("timer-expired")} ${t("request-code")}`
                  : `${t("timer")} ${timeLeft}`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-action text-center">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="mt-9 flex flex-col items-center gap-y-4">
          <Button
            size={"long"}
            type="submit"
            disabled={mutation.isPending || mutation.isSuccess || otpExpired}
          >
            {(mutation.isPending || form.formState.isSubmitting) && (
              <span className="animate-spin mr-2.5">
                <LoaderCircle />
              </span>
            )}
            {tBtns("send-code")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendOTPForm;
