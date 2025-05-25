"use client";

import DatePicker from "@/components/general/DatePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdRequestFormData, createAdRequestSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ImageIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AdRequestForm = ({
  initialData,
  mode,
  children,
}: {
  initialData?: AdRequestFormData;
  mode?: "add" | "show";
  children: (data: AdRequestFormData, isValid: boolean) => React.ReactNode;
}) => {
  const locale = useLocale();
  const t = useTranslations("dashboard.center.ad-or-blog-request.ad.form");
  const [preview, setPreview] = useState<string | null>(
    (typeof initialData?.image === "string" && initialData?.image) || null
  );
  const adRequestSchema = createAdRequestSchema(locale as "ar" | "en");

  const methods = useForm<AdRequestFormData>({
    resolver: zodResolver(adRequestSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || undefined,
      start_date: initialData?.start_date || undefined,
      end_date: initialData?.end_date || undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: AdRequestFormData) => {
    console.log(data);
  };

  const formData = methods.watch();
  const isValid = methods.formState.isValid;

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
              <Label className={`${mode === "show" ? "hidden" : ""}`}>
                <span className="text-base">{t("image.label")}</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div>
                  <input
                    disabled={mode === "show"}
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
                      "w-full aspect-[720/340] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                      preview && "p-2"
                    )}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={720}
                        height={340}
                        className="rounded-md object-cover h-full w-full"
                      />
                    ) : (
                      <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6" />
                        <p className="text-sm">{t("image.placeholder")}</p>
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
                <span className="text-base">{t("title.label")}</span>
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
              </Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("title.placeholder")}
                  {...field}
                  disabled={mode === "show"}
                />
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
                <span className="text-base">{t("description.label")}</span>
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
              </Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("description.placeholder")}
                  {...field}
                  disabled={mode === "show"}
                />
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
                <span className="text-base">{t("start_date.label")}</span>{" "}
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
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
                  inputDisabled={mode === "show"}
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
                <span className="text-base">{t("end_date.label")}</span>{" "}
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
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
                  inputDisabled={mode === "show"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2 flex gap-2 justify-end">
          {children(formData, isValid)}
        </div>
      </form>
    </FormProvider>
  );
};

export default AdRequestForm;
