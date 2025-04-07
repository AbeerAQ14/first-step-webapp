"use client";

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
  const { control } = useFormContext<CenterStep2FormData>();

  const ageGroups = [
    { id: "0-3", label: "من 0 إلى 3 سنوات" },
    { id: "3-6", label: "من 3 إلى 6 سنوات" },
    { id: "special-needs", label: "أطفال ذوي احتياجات خاصة" },
  ];

  const days = [
    { value: "sunday", label: "الأحد" },
    { value: "monday", label: "الإثنين" },
    { value: "tuesday", label: "الثلاثاء" },
    { value: "wednesday", label: "الأربعاء" },
    { value: "thursday", label: "الخميس" },
    { value: "friday", label: "الجمعة" },
    { value: "saturday", label: "السبت" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="form-label">الأعمار المقبولة</p>
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
            <FormLabel>هل يوجد شيء تريد إضافته؟</FormLabel>
            <FormControl>
              <Input placeholder="اكتب هنا..." {...field} />
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
                  <FormLabel>يبدأ العمل من يوم</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="الأحد" />
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
                  <FormLabel>إلى يوم</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="الخميس" />
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
                <FormLabel>من الساعة</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                    <Input
                      {...field}
                      type="time"
                      placeholder="..:.. ص"
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
                <FormLabel>إلى الساعة</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray size-5" />
                    <Input
                      {...field}
                      type="time"
                      placeholder="..:.. ص"
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
