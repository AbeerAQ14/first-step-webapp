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
  const t = useTranslations("auth.center-signup.2.form.days");

  const days = [
    { value: "sunday", label: t("sunday") },
    { value: "monday", label: t("monday") },
    { value: "tuesday", label: t("tuesday") },
    { value: "wednesday", label: t("wednesday") },
    { value: "thursday", label: t("thursday") },
    { value: "friday", label: t("friday") },
    { value: "saturday", label: t("saturday") },
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
              <FormLabel>اختر الإشعار</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="إشعار النوم" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {["إشعار النوم", "إشعار الإفطار"].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
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
              <FormLabel>اليوم</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="السبت" />
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
            <FormLabel>الوقت</FormLabel>
            <FormControl>
              <div className="relative">
                <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                <Input
                  {...field}
                  type="time"
                  placeholder=""
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
