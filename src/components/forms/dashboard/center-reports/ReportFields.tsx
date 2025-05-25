"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReportsFormData } from "./ReportsForm";
import { useTranslations } from "next-intl";

const ReportFields = () => {
  const { control } = useFormContext<ReportsFormData>();
  const t = useTranslations("dashboard.center-reports.report.form");

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-9">
      <FormField
        control={control}
        name="activities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("activities.label")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t("activities.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="behavior"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("behavior.label")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t("behavior.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="meals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("meals.label")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t("meals.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="napTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("napTime.label")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t("napTime.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t("additionalNotes.label")}</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t("additionalNotes.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ReportFields;
