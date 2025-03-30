"use client";

import useOTPTimer from "@/hooks/useOTPTimer";
import { useForm } from "react-hook-form";
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
import { useLocale } from "next-intl";

const SendOTPForm = ({
  onSubmit,
}: {
  onSubmit: (data: OTPVerificationFormData) => void;
}) => {
  const locale = useLocale();
  const formSchema = createOTPVerificationSchema(locale as "ar" | "en");
  const form = useForm<OTPVerificationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

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
                راجع بريدك الإلكتروني
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
                  ? "OTP Expired. Please request a new one."
                  : `سينتهي صلاحية الكود خلال: ${timeLeft}`}
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
            تأكيد
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendOTPForm;
