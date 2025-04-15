"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ChildStep3FormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

export default function Step3Recommendations() {
  const t = useTranslations("auth.add-child.3.form");
  const { control } = useFormContext<ChildStep3FormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="childDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("description.label")}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={t("description.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="favoriteThings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("likes.label")}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={t("likes.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="recommendations"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t("recommendations.label")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("recommendations.placeholder")}
                {...field}
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
