"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import {
  AdminBlogRequestFormData,
  createAdminBlogRequestSchema,
} from "@/lib/schemas";
import BlogEditor from "../blog/BlogEditor";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const AdminBlogRequestForm = ({
  initialData,
  mode,
  children,
}: {
  initialData?: AdminBlogRequestFormData;
  mode?: "add" | "show";
  children: (
    data: AdminBlogRequestFormData,
    isValid: boolean,
    isSubmitting: boolean,
    dirtyFields: string[]
  ) => React.ReactNode;
}) => {
  const locale = useLocale();
  const t = useTranslations("dashboard.center.ad-or-blog-request.blog.form");
  const [preview1, setPreview1] = useState<string | null>(
    (typeof initialData?.mainImage === "string" && initialData?.mainImage) ||
      null
  );
  const [preview2, setPreview2] = useState<string | null>(
    (typeof initialData?.cardImage === "string" && initialData?.cardImage) ||
      null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const blogRequestSchema = createAdminBlogRequestSchema(locale as "ar" | "en");

  const methods = useForm<AdminBlogRequestFormData>({
    resolver: zodResolver(blogRequestSchema),
    defaultValues: {
      title: {
        ar: initialData?.title?.ar ?? "",
        en: initialData?.title?.en ?? "",
      },
      description: {
        ar: initialData?.description?.ar ?? "",
        en: initialData?.description?.en ?? "",
      },
      content: {
        ar: initialData?.content?.ar ?? "",
        en: initialData?.content?.en ?? "",
      },
      mainImage: initialData?.mainImage || undefined,
      cardImage: initialData?.cardImage || undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AdminBlogRequestFormData) => {
    try {
      setIsSubmitting(true);
      // await centerService.requestBlog({
      //   title: data.title,
      //   description: data.description,
      //   content: data.content,
      //   cover: data.mainImage?.[0] as File,
      //   blog_image: data.cardImage?.[0] as File,
      // });

      toast(t("success.title"), {
        description: t("success.description"),
      });

      // Reset form and previews
      methods.reset();
      setPreview1(null);
      setPreview2(null);

      // Navigate back
      router.back();
    } catch (error) {
      toast(t("error.title"), {
        description: t("error.description"),
      });
      console.error("Error submitting blog request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid sm:grid-cols-4 items-start gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField
          control={methods.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem className="sm:col-span-3">
              <Label className={`${mode === "show" ? "hidden" : ""}`}>
                <span className="text-base">{t("mainImage.label")}</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div>
                  <input
                    disabled={mode === "show"}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload1"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview1(URL.createObjectURL(file));
                        field.onChange(e.target.files);
                      }
                    }}
                  />
                  <label
                    htmlFor="image-upload1"
                    className={clsx(
                      "w-full aspect-[1440/680] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                      preview1 && "p-2"
                    )}
                  >
                    {preview1 ? (
                      <Image
                        src={preview1}
                        alt="Preview"
                        width={1440}
                        height={600}
                        className="rounded-md object-cover h-full w-full"
                      />
                    ) : (
                      <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6" />
                        <p className="text-sm">{t("mainImage.placeholder")}</p>
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
          name="cardImage"
          render={({ field }) => (
            <FormItem className="">
              <Label className={`${mode === "show" ? "hidden" : ""}`}>
                <span className="text-base">{t("cardImage.label")}</span>
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <div>
                  <input
                    disabled={mode === "show"}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview2(URL.createObjectURL(file));
                        field.onChange(e.target.files);
                      }
                    }}
                  />
                  <label
                    htmlFor="image-upload2"
                    className={clsx(
                      "w-full aspect-[264/160] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                      preview2 && "p-2"
                    )}
                  >
                    {preview2 ? (
                      <Image
                        src={preview2}
                        alt="Preview"
                        width={264}
                        height={160}
                        className="rounded-md object-cover h-full w-full"
                      />
                    ) : (
                      <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6" />
                        <p className="text-sm">{t("cardImage.placeholder")}</p>
                      </div>
                    )}
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title AR */}
        <FormField
          control={methods.control}
          name="title.ar"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <Label>
                <span className="text-base">{t("title.label")} (عربي)</span>
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
                  readOnly={mode === "show"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title EN */}
        <FormField
          control={methods.control}
          name="title.en"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <Label>
                <span className="text-base">{t("title.label")} (EN)</span>
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
                  readOnly={mode === "show"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description AR */}
        <FormField
          control={methods.control}
          name="description.ar"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <Label>
                <span className="text-base">
                  {t("description.label")} (عربي)
                </span>
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
                  readOnly={mode === "show"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description EN */}
        <FormField
          control={methods.control}
          name="description.en"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <Label>
                <span className="text-base">{t("description.label")} (EN)</span>
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
                  readOnly={mode === "show"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content AR */}
        <FormField
          control={methods.control}
          name="content.ar"
          render={({ field }) => (
            <FormItem className="sm:col-span-4">
              <Label>
                <span className="text-base">{t("content.label")} (عربي)</span>
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
              </Label>
              <FormControl>
                {mode === "show" ? (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    readOnly={true}
                    className="min-h-[200px]"
                  />
                ) : (
                  <BlogEditor value={field.value} onChange={field.onChange} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content EN */}
        <FormField
          control={methods.control}
          name="content.en"
          render={({ field }) => (
            <FormItem className="sm:col-span-4">
              <Label>
                <span className="text-base">{t("content.label")} (EN)</span>
                <span
                  className={`text-red-500 ${mode === "show" ? "hidden" : ""}`}
                >
                  *
                </span>
              </Label>
              <FormControl>
                {mode === "show" ? (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    readOnly={true}
                    className="min-h-[200px]"
                  />
                ) : (
                  <BlogEditor value={field.value} onChange={field.onChange} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-4 flex gap-2 justify-end">
          {children(
            methods.getValues(),
            methods.formState.isValid,
            methods.formState.isSubmitting,
            Object.keys(methods.formState.dirtyFields)
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminBlogRequestForm;
