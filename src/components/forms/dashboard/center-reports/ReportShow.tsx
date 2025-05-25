"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReportsFormData } from "./ReportsForm";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

const ReportShow = ({ initialValues }: { initialValues: ReportsFormData }) => {
  const methods = useForm<ReportsFormData>({
    defaultValues: initialValues,
  });

  const t = useTranslations("dashboard.center-reports.report.form");

  return (
    <FormProvider {...methods}>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-9">
        <FormField
          control={methods.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("activities.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("activities.placeholder")}
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="behavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("behavior.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("behavior.placeholder")}
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("meals.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("meals.placeholder")}
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="napTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("napTime.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("napTime.placeholder")}
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("additionalNotes.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("additionalNotes.placeholder")}
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FormProvider>
  );
};

export default ReportShow;
