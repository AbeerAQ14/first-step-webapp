"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import useOTPTimer from "@/hooks/useOTPTimer";

// Define schema using Zod
const formSchema = z.object({
  otp: z.string().min(4, { message: "يرجى إدخال الكود بشكل صحيح" }),
});

// Define type based on schema
type FormData = z.infer<typeof formSchema>;

const SendOTP = () => {
  const router = useRouter();
  const { timeLeft, otpExpired } = useOTPTimer({
    duration: 10,
    onExpire: () => {
      console.log("OTP expired");
    },
  });
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    router.push("/reset-password");
  };

  return (
    <div className="px-5 sm:px-10 py-20">
      <div className="flex flex-col items-center gap-y-12">
        <Image
          src="/logo.svg"
          alt="First Step Logo"
          width={64.09}
          height={80}
        />

        <div className="flex flex-col w-full max-w-[41.25rem]">
          <h1 className="heading-3 text-center text-primary">كود ال OTP</h1>

          <div className="mt-9 flex flex-col gap-y-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;
