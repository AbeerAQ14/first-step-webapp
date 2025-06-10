"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { createSignInSchema, SignInFormData } from "@/lib/schemas";
import { initializeGoogleAuth, triggerGoogleSignIn } from "@/lib/google-auth";

const SignInForm = ({
  onSubmit,
  isLoading,
  formRef,
}: {
  onSubmit: (data: SignInFormData) => void;
  isLoading: boolean;
  formRef: React.RefObject<UseFormReturn<SignInFormData> | null>;
}) => {
  const t = useTranslations("auth.sign-in");
  const tBtns = useTranslations("auth.buttons");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const locale = useLocale();
  const signInSchema = createSignInSchema(locale as "ar" | "en");

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [form, formRef]);

  useEffect(() => {
    // Initialize Google Sign-In
    initializeGoogleAuth();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await triggerGoogleSignIn();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
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
                {t("form.email.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("form.email.placeholder")}
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
                {t("form.password.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("form.password.placeholder")}
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
                  {t("form.forgot-password.label")}
                </span>
                <Link className="text-info" href="/forgot-password">
                  {t("form.forgot-password.button")}
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-action">{form.formState.errors.root.message}</p>
        )}

        <div className="mt-12 flex flex-col items-center gap-y-4">
          <Button
            size={"long"}
            type="submit"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {(isLoading || form.formState.isSubmitting) && (
              <span className="animate-spin mr-2.5">
                <LoaderCircle />
              </span>
            )}
            {tBtns("sign-in")}
          </Button>
          <Button
            variant={"outline"}
            size={"long"}
            type="button"
            className="text-mid-gray !border-light-gray w-full"
            disabled={
              isLoading || form.formState.isSubmitting || isGoogleLoading
            }
            onClick={handleGoogleSignIn}
          >
            {isGoogleLoading && (
              <span className="animate-spin mr-2.5">
                <LoaderCircle />
              </span>
            )}
            <span>{tBtns("sign-in-google")}</span>
            <Image
              src="/assets/icons/google_icon.svg"
              alt="Google Logo"
              width={36}
              height={36}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
