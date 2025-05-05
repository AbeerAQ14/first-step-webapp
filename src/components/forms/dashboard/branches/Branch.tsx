"use client";

import { Link, useRouter } from "@/i18n/navigation";
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
import PhoneInput from "../../PhoneInput";
import CheckboxGroup from "../../CheckboxGroup";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const Branch = ({
  initialValues,
  mode,
  onSubmit,
  branchId,
}: {
  initialValues: BranchFormData;
  mode: "add" | "edit" | "show";
  onSubmit: (data: BranchFormData) => void;
  branchId?: string;
}) => {
  const router = useRouter();
  const locale = useLocale();
  const branchSchema = createBranchSchema(locale as "ar" | "en");
  const t = useTranslations("auth.center-signup.1.form");
  const tStep2 = useTranslations("auth.center-signup.2.form");

  const isReadOnly = mode === "show";

  const buttons = (mode: string) => {
    if (mode === "add") {
      return (
        <>
          <Button size={"sm"} type="submit">
            إضافة فرع
          </Button>
          <Button size={"sm"} variant={"outline"} onClick={() => router.back()}>
            إلغاء
          </Button>
        </>
      );
    } else if (mode === "edit") {
      return (
        <>
          <Button size={"sm"} type="submit">
            تعديل الفرع
          </Button>
          <Button size={"sm"} variant={"outline"} onClick={() => router.back()}>
            إلغاء
          </Button>
        </>
      );
    } else
      return (
        <>
          <Button asChild size={"sm"}>
            <Link href={`${branchId}/edit`}>تعديل الفرع</Link>
          </Button>
          {/* <Button
            size={"sm"}
            variant={"outline"}
            className="!border-destructive text-destructive"
          >
            حذف الفرع
          </Button> */}
        </>
      );
  };

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
      name: initialValues.name,
      email: initialValues.email,
      phone: initialValues.phone,
      neighborhood: initialValues.neighborhood,
      nursery_name: initialValues.nursery_name,
      address: initialValues.address,
      city: initialValues.city,
      location: initialValues.location,
      services: initialValues.services,
      additional_service: initialValues.additional_service,
      // step4
      work_days_from: initialValues.work_days_from,
      work_days_to: initialValues.work_days_to,
      work_hours_from: initialValues.work_hours_from,
      work_hours_to: initialValues.work_hours_to,
    },
    mode: "onChange",
  });

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
                    <Input
                      placeholder={t("name.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                      disabled={isReadOnly}
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
                    <Input
                      placeholder={t("email.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                      readOnly={isReadOnly}
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
                    <Input
                      placeholder={t("city.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                      disabled={isReadOnly}
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
                    <Input
                      placeholder={t("address.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                    <Input
                      placeholder={t("location.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                readOnly={isReadOnly}
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
                    <Input
                      placeholder={t("other.placeholder")}
                      {...field}
                      disabled={isReadOnly}
                    />
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
          {buttons(mode)}
        </div>
      </form>
    </FormProvider>
  );
};

export default Branch;
