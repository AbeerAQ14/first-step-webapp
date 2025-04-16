"use client";

import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "../PhoneInput";
import CheckboxGroup from "../CheckboxGroup";
import type { CenterStep1FormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

export function Step1BasicInfo() {
  const t = useTranslations("auth.center-signup.1.form");
  const { control } = useFormContext<CenterStep1FormData>();

  const centerTypes = [
    { id: "care", label: t("type.options.care") },
    { id: "education", label: t("type.options.education") },
    { id: "support", label: t("type.options.support") },
  ];

  const services = [
    { id: "education", label: t("services.options.education") },
    { id: "kindergarten", label: t("services.options.kindergarten") },
    { id: "after-school", label: t("services.options.after-school") },
    { id: "special-needs", label: t("services.options.special-needs") },
    { id: "therapy", label: t("services.options.therapy") },
    { id: "speech-therapy", label: t("services.options.speech-therapy") },
    {
      id: "occupational-therapy",
      label: t("services.options.occupational-therapy"),
    },
    { id: "care", label: t("services.options.care") },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 md:gap-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("name.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nursery_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("nursery-name.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("nursery-name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("email.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("email.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("phone.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  value={field.value?.replace(/^\+966/, "")}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(
                      `+966${e.target.value.replace(/^(\+966)?/, "")}`
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("city.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("city.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("neighborhood.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("neighborhood.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("address.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("address.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("location.label")}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("location.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={control}
          name="branches"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>{t("branches.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("branches.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <p className="form-label">{t("type.label")}</p>
        <CheckboxGroup
          className="lg:w-3xl"
          items={centerTypes}
          name="nursery_type"
          control={control}
        />
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <p className="form-label">{t("services.label")}</p>

        <CheckboxGroup
          className="lg:w-3xl"
          items={services}
          name="services"
          control={control}
        />
      </div>

      <FormField
        control={control}
        name="additional_service"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex justify-start items-start gap-x-1 flex-col sm:flex-row">
              <span>{t("other.label")}</span>
              <span className="font-normal text-sm md:text-base text-light-gray">
                {t("other.sublabel")}
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder={t("other.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
