"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckboxGroup from "../CheckboxGroup";
import { Clock } from "lucide-react";
import type { CenterStep2FormData } from "@/lib/schemas";

export function Step2AgesAndHours() {
  const t = useTranslations("auth.center-signup.2.form");
  const { control } = useFormContext<CenterStep2FormData>();

  const ageGroups = [
    { id: "0-3", label: t("ages.options.0-3") },
    { id: "3-6", label: t("ages.options.3-6") },
    { id: "special-needs", label: t("ages.options.special-needs") },
  ];

  const days = [
    { value: "sunday", label: t("days.sunday") },
    { value: "monday", label: t("days.monday") },
    { value: "tuesday", label: t("days.tuesday") },
    { value: "wednesday", label: t("days.wednesday") },
    { value: "thursday", label: t("days.thursday") },
    { value: "friday", label: t("days.friday") },
    { value: "saturday", label: t("days.saturday") },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="form-label">{t("ages.label")}</p>
        <CheckboxGroup
          control={control}
          items={ageGroups}
          name="ageGroups"
          className=""
        />
      </div>

      <FormField
        control={control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("addition.label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("addition.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField
            control={control}
            name="workDays.from"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>{t("from-day.label")}</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("from-day.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={control}
            name="workDays.to"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>{t("to-day.label")}</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("to-day.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={control}
            name="workHours.from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("from-hour.label")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                    <Input
                      {...field}
                      type="time"
                      placeholder={t("from-hour.placeholder")}
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden
      [&::-webkit-inner-spin-button]:hidden
      [&::-ms-clear]:hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={control}
            name="workHours.to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("to-hour.label")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                    <Input
                      {...field}
                      type="time"
                      placeholder={t("from-hour.placeholder")}
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden
      [&::-webkit-inner-spin-button]:hidden
      [&::-ms-clear]:hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
