"use client";

import Image from "next/image";
import * as z from "zod";
import ResetPasswordForm from "./ResetPasswordForm";

export const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const onSubmit = async (data: FormData) => {
    console.log(data);
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
            إنشاء كلمة سر جديدة
          </h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <ResetPasswordForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
