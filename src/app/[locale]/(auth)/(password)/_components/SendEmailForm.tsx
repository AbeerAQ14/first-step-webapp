"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createForgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { useRouter } from "@/i18n/navigation";
import { LoaderCircle } from "lucide-react";

const SendEmailForm = ({}: {}) => {
  const t = useTranslations("auth.forgot-password.form");
  const tBtns = useTranslations("auth.buttons");
  const locale = useLocale();
  const formSchema = createForgotPasswordSchema(locale as "ar" | "en");
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  // --- Data Fetching & Mutation ---
  const mutation = useMutation<
    any, // Type of successful response from submitFormData
    { errors?: { email?: string[] }; message?: string }, // Custom error type
    string // Type of variable passed to mutate function (original form data)
  >({
    mutationFn: async (data: string) => {
      return await authService.forgotPassword(data);
    },
    onSuccess: () => {
      router.push(`/otp-verification`);
    },
    onError: (error) => {
      // Field-specific error (email)
      if (error?.errors?.email && error.errors.email.length > 0) {
        form.setError("email", {
          type: "server",
          message: error.errors.email[0],
        });
      }

      // Fallback/general error
      if (!error?.errors?.email) {
        form.setError("root", {
          type: "server",
          message: error.message || "خطأ غير متوقع",
        });
      }
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    mutation.mutate(data.email);
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
                {t("email.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
            disabled={
              mutation.isPending ||
              mutation.isSuccess ||
              form.formState.isSubmitting
            }
          >
            {mutation.isSuccess && (
              <span className="animate-spin mr-2.5">
                <LoaderCircle />
              </span>
            )}
            {tBtns("send-code")}
          </Button>
          <Button
            variant={"outline"}
            size={"long"}
            type="button"
            className="text-mid-gray !border-light-gray"
            disabled={
              mutation.isPending ||
              mutation.isSuccess ||
              form.formState.isSubmitting
            }
          >
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

export default SendEmailForm;
