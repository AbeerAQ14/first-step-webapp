"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchFormData, createBranchSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from "../PhoneInput";
import CheckboxGroup from "../CheckboxGroup";
import { Button } from "@/components/ui/button";
import { Clock, Eye, EyeOff } from "lucide-react";

const Branch = () => {
  const router = useRouter();
  const locale = useLocale();
  const branchSchema = createBranchSchema(locale as "ar" | "en");
  const t = useTranslations("auth.center-signup.1.form");
  const tStep2 = useTranslations("auth.center-signup.2.form");
  const [showPassword, setShowPassword] = useState(false);

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

  const days = [
    { value: "sunday", label: tStep2("days.sunday") },
    { value: "monday", label: tStep2("days.monday") },
    { value: "tuesday", label: tStep2("days.tuesday") },
    { value: "wednesday", label: tStep2("days.wednesday") },
    { value: "thursday", label: tStep2("days.thursday") },
    { value: "friday", label: tStep2("days.friday") },
    { value: "saturday", label: tStep2("days.saturday") },
  ];

  const methods = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      // step1
      name: "",
      email: "",
      phone: "",
      neighborhood: "",
      nursery_name: "",
      address: "",
      city: "",
      location: "",
      services: [],
      additional_service: "",
      // step4
      work_days_from: "",
      work_days_to: "",
      work_hours_from: "",
      work_hours_to: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: BranchFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8"
      >
        <div className="w-full max-w-[39.75rem] flex flex-col gap-y-10">
          <div className="space-y-4">
            <FormField
              name="name"
              control={methods.control}
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
              name="nursery_name"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("nursery-name.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("nursery-name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={methods.control}
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
              name="phone"
              control={methods.control}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              name="city"
              control={methods.control}
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
              name="neighborhood"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("neighborhood.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("neighborhood.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              control={methods.control}
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
              name="location"
              control={methods.control}
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
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-y-4">
              <p className="form-label">{t("services.label")}</p>

              <CheckboxGroup
                className="lg:w-3xl"
                items={services}
                name="services"
                control={methods.control}
              />
            </div>

            <FormField
              name="additional_service"
              control={methods.control}
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

          <div className="space-y-4">
            <FormField
              name="work_days_from"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>{tStep2("from-day.label")}</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={tStep2("from-day.placeholder")}
                        />
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
              name="work_days_to"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>{tStep2("to-day.label")}</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={tStep2("to-day.placeholder")}
                        />
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
              name="work_hours_from"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tStep2("from-hour.label")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                      <Input
                        {...field}
                        type="time"
                        placeholder={tStep2("from-hour.placeholder")}
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

            <FormField
              name="work_hours_to"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tStep2("to-hour.label")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                      <Input
                        {...field}
                        type="time"
                        placeholder={tStep2("from-hour.placeholder")}
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

        <div className="flex justify-center gap-5 lg:gap-x-10">
          <Button size={"sm"}>إضافة فرع</Button>
          <Button size={"sm"} variant={"outline"} onClick={() => router.back()}>
            إلغاء
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Branch;
