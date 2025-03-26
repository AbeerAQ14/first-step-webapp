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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Define schema using Zod
const contactSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" }),
});

// Define type based on schema
type ContactFormData = z.infer<typeof contactSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        البريد الإلكتروني
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        كلمة السر
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 stroke-neutral-500 hover:stroke-neutral-600 duration-300"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="size-6 stroke-inherit" />
                            ) : (
                              <Eye className="size-6 stroke-inherit" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-sm flex items-center gap-x-1">
                        <span className="text-light-gray">
                          هل نسيت كلمة السر؟
                        </span>
                        <Link className="text-info" href="/reset-password">
                          إعادة تعيين كلمة السر
                        </Link>
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="mt-12 flex flex-col items-center gap-y-4">
                  <Button
                    size={"long"}
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    سجل دخولك
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"long"}
                    type="button"
                    className="text-mid-gray !border-light-gray"
                    disabled={form.formState.isSubmitting}
                  >
                    <span>سجل دخولك عن طريق جوجل</span>
                    <Image
                      src="/google_icon.svg"
                      alt="Google Logo"
                      width={36}
                      height={36}
                    />
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-12 flex flex-col gap-y-4">
            <p className="text-mid-gray text-center">ليس لديك حساب؟</p>

            <div className="w-full flex flex-col gap-y-4 sm:flex-row justify-center gap-x-16">
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold text-mid-gray !border-light-gray"
                disabled={form.formState.isSubmitting}
              >
                إنشاء حساب مركز
              </Button>
              <Button
                variant={"outline"}
                size={"lg"}
                type="button"
                className="w-full sm:w-fit font-bold"
                disabled={form.formState.isSubmitting}
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
