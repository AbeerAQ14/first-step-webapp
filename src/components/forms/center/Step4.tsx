"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "../FileUploader";
import type { CenterStep4FormData } from "@/lib/schemas";

export function Step4Permits() {
  const t = useTranslations("auth.center-signup.4.form");
  const { control } = useFormContext<CenterStep4FormData>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="businessLicense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("business-license")}</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onChange={field.onChange}
                  accept=".pdf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="commercialRegistration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("commercial-registration")}</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onChange={field.onChange}
                  accept=".pdf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <p className="text-center text-sm lg:text-base text-info">
        {t("description")}
      </p>

      <FormField
        control={control}
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("comments.label")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("comments.placeholder")}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
