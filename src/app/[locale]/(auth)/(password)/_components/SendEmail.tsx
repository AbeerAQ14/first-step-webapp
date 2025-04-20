"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SendEmailForm from "./SendEmailForm";

const SendEmail = () => {
  const t = useTranslations("auth.forgot-password");

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
            <SendEmailForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
