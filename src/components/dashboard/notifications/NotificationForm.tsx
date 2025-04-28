"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/lib/utils";
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

const notificationSchema = z.object({
  type: z.string({
    message: getErrorMessage("general-field-required", "ar"),
  }),
  day: z.string({
    message: getErrorMessage("invalid-date", "ar"),
  }),
  time: z
    .string({
      message: getErrorMessage("invalid-time", "ar"),
    })
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
});

type FormData = z.infer<typeof notificationSchema>;

const NotificationForm = () => {
  const { control } = useForm({
    resolver: zodResolver(notificationSchema),
  });
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

  const methods = useForm<FormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      type: "",
      day: "",
      time: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-9"
      >
        <FormField
          name="type"
          control={control}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormLabel>اختر الإشعار</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="إشعار النوم" />
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
          name="day"
          control={control}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    placeholder="13 : 25"
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
      </form>
    </FormProvider>
  );
};

export default NotificationForm;
