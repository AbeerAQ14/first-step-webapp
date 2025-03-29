"use client";

import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";

export const signInSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" }),
});

export type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const onSubmit = async (data: SignInFormData) => {
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
            مرحبًا مرة أخرى، سجل دخولك
          </h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <SignInForm onSubmit={onSubmit} />
          </div>

          <div className="mt-12 flex flex-col gap-y-4">
            <p className="text-mid-gray text-center">ليس لديك حساب؟</p>

            <div className="w-full flex flex-col gap-y-4 sm:flex-row justify-center gap-x-16">
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold text-mid-gray !border-light-gray"
                // disabled={form.formState.isSubmitting}
              >
                إنشاء حساب مركز
              </Button>
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold"
                // disabled={form.formState.isSubmitting}
              >
                إنشاء حساب ولي أمر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
