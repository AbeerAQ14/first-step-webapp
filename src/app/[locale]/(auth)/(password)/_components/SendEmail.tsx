"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import SendEmailForm from "./SendEmailForm";
import { ForgotPasswordFormData } from "@/lib/schemas";

const SendEmail = () => {
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    router.push("/otp-verification");
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
          <h1 className="heading-3 text-center text-primary">
            إعادة تعيين كلمة السر
          </h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <SendEmailForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
