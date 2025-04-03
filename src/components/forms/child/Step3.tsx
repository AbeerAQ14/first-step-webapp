"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SignUpParentFormData } from "@/lib/schemas";

export default function Step3Recommendations() {
  const { control } = useFormContext<SignUpParentFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="childDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              صف لنا طفلك في 3 كلمات<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="مثال: ذكي/ نشيط/ قليل التركيز" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="favoriteThings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              أشياء يحبها طفلك<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="مثال: لعب التنس/ دميته الصفراء/ مشاهدة الكرتون"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="recommendations"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>هل لديك أي توصيات تتعلق بطفلك؟</FormLabel>
            <FormControl>
              <Textarea
                placeholder="مثال: يرجى تشجيع طفلي على الأنشطة"
                {...field}
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
