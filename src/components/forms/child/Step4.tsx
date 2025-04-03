"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import type { SignUpParentFormData } from "@/lib/schemas";

export default function Step4AuthorizedPersons() {
  const { control } = useFormContext<SignUpParentFormData>();

  const {
    fields: authorizedPersons,
    append,
    remove,
  } = useFieldArray({
    control: control,
    name: "authorizedPersons",
  });

  const addAuthorizedPerson = () => {
    append({ name: "", idNumber: "" });
  };

  const removeAuthorizedPerson = () => {
    remove(authorizedPersons.length - 1);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {authorizedPersons.map((_, index) => (
          <div key={index} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name={`authorizedPersons.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      اسم الشخص المفوض{index > 0 ? ` ${index + 1}` : ""}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="الاسم بالكامل كما في الهوية"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`authorizedPersons.${index}.idNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      رقم هوية الشخص المفوض{index > 0 ? ` ${index + 1}` : ""}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="رقم الهوية" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <FormField
        control={control}
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>هل لديك أي تعليق أو ملاحظة؟</FormLabel>
            <FormControl>
              <Textarea
                placeholder="اكتب هنا..."
                {...field}
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-center items-center gap-2">
        <Button
          type="button"
          size={"lg"}
          variant="outline"
          onClick={addAuthorizedPerson}
          className="font-bold"
        >
          <Plus className="size-6" size={24} />
          إضافة شخص مفوض
        </Button>

        {authorizedPersons.length > 1 && (
          <Button
            type="button"
            size={"sm"}
            variant="outline"
            onClick={removeAuthorizedPerson}
            className="font-bold aspect-square"
          >
            <Minus className="size-6" size={24} />
          </Button>
        )}
      </div>
    </div>
  );
}
