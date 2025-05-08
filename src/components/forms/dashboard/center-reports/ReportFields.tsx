"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReportsFormData } from "./ReportsForm";

const ReportFields = () => {
  const { control } = useFormContext<ReportsFormData>();

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-9">
      <FormField
        control={control}
        name="activities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الأنشطة اليومية</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="مثال: تدريب بيانو ولعب كورة"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="behavior"
        render={({ field }) => (
          <FormItem>
            <FormLabel>سلوك الطفل خلال اليوم</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="كان مشاغب مع أصدقائه"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="meals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الوجبات</FormLabel>
            <FormControl>
              <Input type="text" placeholder="مثال: وجبة الغداء" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="napTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>القيلولة اليومية</FormLabel>
            <FormControl>
              <Input type="text" placeholder="قيلولة نصف ساعة" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>ملاحظات إضافية</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ملاحظات" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ReportFields;
