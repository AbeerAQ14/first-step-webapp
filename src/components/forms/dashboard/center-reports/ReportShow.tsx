"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReportsFormData } from "./ReportsForm";
import { useForm, FormProvider } from "react-hook-form";

const ReportShow = ({ initialValues }: { initialValues: ReportsFormData }) => {
  const methods = useForm<ReportsFormData>({
    defaultValues: initialValues,
  });

  return (
    <FormProvider {...methods}>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-9">
        <FormField
          control={methods.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الأنشطة اليومية</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="مثال: تدريب بيانو ولعب كورة"
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="behavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سلوك الطفل خلال اليوم</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="كان مشاغب مع أصدقائه"
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="meals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الوجبات</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="مثال: وجبة الغداء"
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="napTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>القيلولة اليومية</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="قيلولة نصف ساعة"
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>ملاحظات إضافية</FormLabel>
              <FormControl>
                <Input type="text" placeholder="ملاحظات" {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FormProvider>
  );
};

export default ReportShow;
