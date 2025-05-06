"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { createTeamMemberSchema, TeamMemberFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import type { InitialData } from "./MemberFormWrapper";

const MemberForm = ({
  initialData,
  mode,
  onSubmit,
  onDelete,
}: {
  initialData: InitialData;
  mode: "add" | "edit";
  onSubmit: (data: TeamMemberFormData) => void;
  onDelete?: () => void;
}) => {
  const router = useRouter();
  const locale = useLocale();
  const [preview, setPreview] = useState<string | null>(
    (typeof initialData.image === "string" && initialData.image) || null
  );

  const teamMemberSchema = createTeamMemberSchema(locale as "ar" | "en");

  const methods = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      ...initialData,
    },
    mode: "onChange",
  });

  const buttons = (mode: "add" | "edit") => {
    if (mode === "add") {
      return (
        <>
          <Button size={"sm"} type="submit">
            إضافة فرد
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="!border-light-gray text-mid-gray"
            onClick={() => router.back()}
          >
            إلغاء
          </Button>
        </>
      );
    } else if (mode === "edit") {
      return (
        <>
          <Button
            size={"sm"}
            type="submit"
            disabled={!methods.formState.isDirty}
          >
            حفظ التعديل
          </Button>
          <Button
            size={"sm"}
            variant="destructive"
            onClick={() => {
              onDelete && onDelete();
            }}
          >
            حذف
          </Button>
        </>
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid sm:grid-cols-2 items-start gap-4 gap-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-4">
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>
                  <span className="text-base">اسم الفرد</span>
                  <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input type="text" placeholder="الاسم ثنائي" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <Label>
                  <span className="text-base">الفرع التابع له</span>
                  <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input type="text" placeholder="اسم الفرع" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <Label>
                  <span className="text-base">مهنة الفرد</span>
                  <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input type="text" placeholder="مثال: مدرس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={methods.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-end">
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
                      "min-w-60 md:max-w-60 aspect-[200/240] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                      preview && "p-2"
                    )}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={200}
                        height={240}
                        className="rounded-md object-cover h-full "
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

        <div className="sm:col-span-2 flex justify-center gap-5 lg:gap-x-10">
          {buttons(mode)}
        </div>
      </form>
    </FormProvider>
  );
};

export default MemberForm;
