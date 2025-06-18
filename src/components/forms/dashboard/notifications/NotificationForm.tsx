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
import { NotificationsFormData } from "@/components/forms/dashboard/notifications/CenterNotificationsForm";
import DatePicker from "@/components/general/DatePicker";

const NotificationForm = () => {
  const t = useTranslations("dashboard.center.notifications.form");

  const notificationTypes = [
    { value: "Arrived", label: t("type.options.arrived") },
    { value: "Left", label: t("type.options.left") },
    { value: "Meal Time", label: t("type.options.meal") },
    { value: "Nap Time", label: t("type.options.nap") },
    { value: "Activity Time", label: t("type.options.activity") },
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
            <FormLabel>{t("day.label")}</FormLabel>
            <FormControl>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                disabled={{
                  before: new Date(),
                }}
              />
            </FormControl>
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
