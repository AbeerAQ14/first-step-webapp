"use client";

import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";
import { ResetPasswordFormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

const ResetPassword = () => {
  const t = useTranslations("auth.reset-password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log(data);
  };

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
            <ResetPasswordForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
