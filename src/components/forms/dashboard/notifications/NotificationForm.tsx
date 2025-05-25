"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { NotificationsFormData } from "@/components/forms/dashboard/notifications/NotificationsForm";

const NotificationForm = () => {
  const t = useTranslations("dashboard.center.notifications.form");
  const daysT = useTranslations("auth.center-signup.2.form.days");

  const days = [
    { value: "sunday", label: daysT("sunday") },
    { value: "monday", label: daysT("monday") },
    { value: "tuesday", label: daysT("tuesday") },
    { value: "wednesday", label: daysT("wednesday") },
    { value: "thursday", label: daysT("thursday") },
    { value: "friday", label: daysT("friday") },
    { value: "saturday", label: daysT("saturday") },
  ];

  const notificationTypes = [
    { value: "sleep", label: t("type.options.sleep") },
    { value: "breakfast", label: t("type.options.breakfast") },
  ];

  const { control } = useFormContext<NotificationsFormData>();

  return (
    <div className="grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-9">
      <FormField
        name="type"
        control={control}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange}>
              <FormLabel>{t("type.label")}</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("type.placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {notificationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="day"
        control={control}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange}>
              <FormLabel>{t("day.label")}</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("day.placeholder")} />
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

      <FormField
        name="time"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("time.label")}</FormLabel>
            <FormControl>
              <div className="relative">
                <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                <Input
                  {...field}
                  type="time"
                  placeholder={t("time.placeholder")}
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
  );
};

export default NotificationForm;
