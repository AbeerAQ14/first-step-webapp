"use client";

import DatePicker from "@/components/general/DatePicker";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { AdRequestFormData, createAdRequestSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ImageIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AdRequestForm = () => {
  const locale = useLocale();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const adRequestSchema = createAdRequestSchema(locale as "ar" | "en");

  const methods = useForm<AdRequestFormData>({
    resolver: zodResolver(adRequestSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      start_date: undefined,
      end_date: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: AdRequestFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid sm:grid-cols-2 items-start gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField
          control={methods.control}
          name="image"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <Label>
                <span className="text-base">صورة الطلب</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        field.onChange(e.target.files);
                      }
                    }}
                  />
                  <label
                    htmlFor="image-upload"
                    className={clsx(
                      "w-full aspect-[1440/680] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                      preview && "p-2"
                    )}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={1440}
                        height={600}
                        className="rounded-md object-cover h-full w-full"
                      />
                    ) : (
                      <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6" />
                        <p className="text-sm">ارفع صورة النشاط</p>
                      </div>
                    )}
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>
                <span className="text-base">العنوان</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input type="text" placeholder="العنوان" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label>
                <span className="text-base">الوصف</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input type="text" placeholder="الوصف" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={methods.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <Label>
                <span className="text-base">بداية يوم</span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={{
                    before: new Date(
                      new Date().setDate(new Date().getDate() + 1)
                    ),
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={methods.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <Label>
                <span className="text-base">نهاية يوم</span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={{
                    before: new Date(
                      new Date().setDate(new Date().getDate() + 1)
                    ),
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2 flex justify-center gap-5 lg:gap-x-10">
          <Button size={"sm"} type="submit">
            إرسال طلب
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="!border-light-gray text-mid-gray"
            onClick={() => router.back()}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdRequestForm;
