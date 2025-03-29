"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import * as z from "zod";
import SendOTPForm from "./SendOTPForm";

export const formSchema = z.object({
  otp: z.string().min(4, { message: "يرجى إدخال الكود بشكل صحيح" }),
});

export type FormData = z.infer<typeof formSchema>;

const SendOTP = () => {
  const router = useRouter();

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
            <SendOTPForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;
