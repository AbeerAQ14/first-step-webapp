"use client";

import { Control, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/general/RadioGroup";
import type { SignUpParentFormData } from "@/lib/schemas";

export default function Step2ChronicDiseases() {
  const { control, watch } = useFormContext<SignUpParentFormData>();
  const hasDiseases = watch("chronicDiseases.hasDiseases");
  const hasAllergies = watch("allergies.hasAllergies");

  return (
    <div className="space-y-10">
      <DiseasesForm control={control} hasDiseases={hasDiseases} />

      <AllergiesForm control={control} hasAllergies={hasAllergies} />
    </div>
  );
}

const DiseasesForm = ({
  control,
  hasDiseases,
}: {
  control: Control<SignUpParentFormData>;
  hasDiseases: "yes" | "no";
}) => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-primary font-medium text-center text-xl md:text-2xl">
          هل يعاني طفلك من أمراض مزمنة؟
        </p>

        <FormField
          control={control}
          name="chronicDiseases.hasDiseases"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  className="gap-14.5"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    {
                      value: "yes",
                      label: "نعم",
                    },
                    {
                      value: "no",
                      label: "لا",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {hasDiseases === "yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="chronicDiseases.diseases.0.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  اسم المرض<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثال: مرض السكري"
                    {...field}
                    value={field.value?.toString() || ""}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="chronicDiseases.diseases.0.medication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  اسم الدواء<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثال: انسولين"
                    {...field}
                    value={field.value?.toString() || ""}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="chronicDiseases.diseases.0.procedures"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>
                  ما هي الإجراءات الواجب اتخاذها في حالة حدوث نوبة مفاجئة؟
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="اكتب هنا..."
                    {...field}
                    value={field.value?.toString() || ""}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </>
  );
};

const AllergiesForm = ({
  control,
  hasAllergies,
}: {
  control: Control<SignUpParentFormData>;
  hasAllergies: "yes" | "no";
}) => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-primary font-medium text-center text-xl md:text-2xl">
          هل يعاني طفلك من أي نوع من الحساسية؟
        </p>

        <FormField
          control={control}
          name="allergies.hasAllergies"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  className="gap-14.5"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    {
                      value: "yes",
                      label: "نعم",
                    },
                    {
                      value: "no",
                      label: "لا",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {hasAllergies === "yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="allergies.allergyTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  نوع الحساسية<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثال: حساسية صدرية"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="allergies.allergyFoods"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ما هي المواد أو الأطعمة المسببة للحساسية؟
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="مثال: المكسرات" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="allergies.allergyProcedures"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>
                  ما هي الإجراءات الواجب اتخاذها في حالة حدوث رد فعل تحسسي؟
                  <span className="text-red-500">*</span>
                </FormLabel>
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
        </div>
      )}
    </>
  );
};
