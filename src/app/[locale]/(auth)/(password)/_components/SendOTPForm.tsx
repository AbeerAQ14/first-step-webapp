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
    any, // or a specific response type
    { errors?: { otp?: string[] }; message?: string },
    OTPVerificationFormData
  >({
    mutationFn: async (data) => {
      if (!email) throw { message: "Email not found." };
      return await authService.checkOTP(email, data.otp);
    },
    onSuccess: () => {
      router.push(`/reset-password?email=${email}`);
    },
    onError: (error) => {
      if (error?.errors?.otp?.[0]) {
        form.setError("otp", {
          type: "server",
          message: error.errors.otp[0],
        });
      } else {
        form.setError("root", {
          type: "server",
          message: error.message || "خطأ غير متوقع",
        });
      }
    },
  });

  const onSubmit = async (data: OTPVerificationFormData) => {
    console.log(data);

    mutation.mutate(data);
  };

  const { timeLeft, otpExpired } = useOTPTimer({
    duration: 10,
    onExpire: () => {
      console.log("OTP expired");
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

        <div className="mt-9 flex flex-col items-center gap-y-4">
          <Button
            size={"long"}
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {tBtns("send-code")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendOTPForm;
