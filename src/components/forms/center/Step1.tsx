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

export function Step1BasicInfo() {
  const { control } = useFormContext<CenterStep1FormData>();

  const centerTypes = [
    { id: "care", label: "رعاية" },
    { id: "education", label: "تعليمي" },
    { id: "support", label: "الدعم والتأهيل" },
  ];

  const services = [
    { id: "education", label: "تعليمي" },
    { id: "support1", label: "الدعم والتأهيل" },
    { id: "support2", label: "الدعم والتأهيل" },
    { id: "support3", label: "الدعم والتأهيل" },
    { id: "support4", label: "الدعم والتأهيل" },
    { id: "support5", label: "الدعم والتأهيل" },
    { id: "support6", label: "الدعم والتأهيل" },
    { id: "care", label: "رعاية" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 md:gap-y-4">
        <FormField
          control={control}
          name="centerNameArabic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                اسم المركز باللغة العربية
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: حضانة واو" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="centerNameEnglish"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                اسم المركز باللغة الإنجليزية
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: Wow" {...field} />
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
                البريد الإلكتروني
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: mennaemarauxl@gmail.com" {...field} />
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
                رقم الجوال
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
                المدينة
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: الرياض" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                الحي
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: حي النهضة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                الشارع
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: شارع مكة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="locationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                رابط الموقع الجغرافي
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="مثال: لينك جوجل مابس" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="branches"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>أسماء الفروع</FormLabel>
              <FormControl>
                <Input
                  placeholder="مثال: فرع جدة، فرع الرياض، فرع المدينة..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <p className="form-label">نوع المركز</p>
        <CheckboxGroup
          className="lg:w-3xl"
          items={centerTypes}
          name="centerType"
          control={control}
        />
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <p className="form-label">الخدمات المتوفرة</p>

        <CheckboxGroup
          className="lg:w-3xl"
          items={services}
          name="services"
          control={control}
        />
      </div>

      <FormField
        control={control}
        name="additionalServices"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex justify-start items-start gap-x-1 flex-col sm:flex-row">
              <span>هل هناك خدمة لم يتم إضافتها؟</span>
              <span className="font-normal text-sm md:text-base text-light-gray">
                (مثل: التدريب على دورات المرأة)
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="اكتب هنا..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
