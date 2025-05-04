"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchFormData, createBranchSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormControl,
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
import { Clock } from "lucide-react";

const BranchShow = ({
  initialValues,
  branchId,
}: {
  initialValues: BranchFormData;
  branchId: string;
}) => {
  const locale = useLocale();
  const branchSchema = createBranchSchema(locale as "ar" | "en");
  const t = useTranslations("auth.center-signup.1.form");
  const tStep2 = useTranslations("auth.center-signup.2.form");

  const isReadOnly = true;

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
      <form className="flex flex-col items-center space-y-8 p-6">
        <div className="w-full flex flex-col gap-y-4">
          <h2 className="heading-4 font-medium text-primary">بيانات الفرع</h2>

          <div className="grid grid-cols-1 lg:p-4 xl:grid-cols-2 gap-y-4 gap-x-10">
            <FormField
              name="name"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <Label>
                    <span className="text-base">{t("name.label")}</span>
                    <span className="text-red-500">*</span>
                  </Label>
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
                  <Label>
                    <span className="text-base">{t("nursery-name.label")}</span>
                    <span className="text-red-500">*</span>
                  </Label>
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
                  <Label>
                    <span className="text-base">{t("email.label")}</span>
                    <span className="text-red-500">*</span>
                  </Label>
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
                  <Label>
                    <span className="text-base">{t("phone.label")}</span>
                    <span className="text-red-500">*</span>
                  </Label>
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
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="heading-4 font-medium text-primary">
              تفاصيل العنوان
            </h2>

            <div className="grid grid-cols-1 lg:p-4 xl:grid-cols-2 gap-y-4 gap-x-10">
              <FormField
                name="city"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      <span className="text-base">{t("city.label")}</span>
                      <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                      <span className="text-base">
                        {t("neighborhood.label")}
                      </span>
                      <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                      <span className="text-base">{t("address.label")}</span>
                      <span className="text-red-500">*</span>
                    </Label>
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
                    <Label>
                      <span className="text-base">{t("location.label")}</span>
                      <span className="text-red-500">*</span>
                    </Label>
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
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <h2 className="heading-4 font-medium text-primary">
              {t("services.label")}
            </h2>

            <div className="flex flex-col items-start gap-y-4 lg:p-4">
              <CheckboxGroup
                className="lg:w-3xl justify-start"
                items={services}
                name="services"
                control={methods.control}
                readOnly={isReadOnly}
              />
            </div>

            {/* <FormField
              name="additional_service"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <Label className="flex justify-start items-start gap-x-1 flex-col sm:flex-row">
                    <span >{t("other.label")}</span>
                    <span className="font-normal text-sm md:text-base text-light-gray">
                      {t("other.sublabel")}
                    </span>
                  </Label>
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
            /> */}
          </div>

          {/* <div className="space-y-4">
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
                    <Label>{tStep2("from-day.label")}</Label>
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
                    <Label>{tStep2("to-day.label")}</Label>
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
                  <Label>{tStep2("from-hour.label")}</Label>
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
                  <Label>{tStep2("to-hour.label")}</Label>
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
          </div> */}
        </div>

        <div className="flex justify-center gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={`${branchId}/edit`}>تعديل الفرع</Link>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BranchShow;
