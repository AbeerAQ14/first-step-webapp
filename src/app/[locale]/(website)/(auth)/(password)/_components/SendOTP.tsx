"use client";

import Image from "next/image";
import SendOTPForm from "./SendOTPForm";
import { useTranslations } from "next-intl";

const SendOTP = ({ email }: { email: string }) => {
  const t = useTranslations("auth.otp");

  return (
    <div className="px-5 sm:px-10 py-20">
      <div className="flex flex-col items-center gap-y-12">
        <Image
          src="/assets/logos/logo.svg"
          alt="First Step Logo"
          width={64.09}
          height={80}
        />

        <div className="flex flex-col w-full max-w-[41.25rem]">
          <h1 className="heading-3 text-center text-primary">{t("title")}</h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <SendOTPForm email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;
