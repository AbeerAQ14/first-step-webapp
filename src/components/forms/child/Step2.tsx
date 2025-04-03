"use client";

import { Control, useFieldArray, useFormContext } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import type { ChronicDisease } from "@/types";
import type { SignUpParentFormData } from "@/lib/schemas";

export default function Step2ChronicDiseases() {
  const { control, watch } = useFormContext<SignUpParentFormData>();
  const hasDiseases = watch("chronicDiseases.hasDiseases");
  const hasAllergies = watch("allergies.hasAllergies");

  const {
    fields: diseases,
    append: appendDisease,
    remove: removeDisease,
  } = useFieldArray({
    control,
    name: "chronicDiseases.diseases",
  });

  const addDisease = () => {
    appendDisease({ name: "", medication: "", procedures: "" });
  };

  return (
    <div className="space-y-10">
      <DiseasesForm
        control={control}
        hasDiseases={hasDiseases}
        diseases={diseases}
        addDisease={addDisease}
        removeDisease={removeDisease}
      />

      <AllergiesForm control={control} hasAllergies={hasAllergies} />
    </div>
  );
}

interface DiseasesFormProps {
  control: Control<SignUpParentFormData>;
  hasDiseases: "yes" | "no";
  diseases: ChronicDisease[];
  addDisease: () => void;
  removeDisease: () => void;
}

const DiseasesForm = ({
  control,
  hasDiseases,
  diseases,
  addDisease,
  removeDisease,
}: DiseasesFormProps) => {
  return (
    <div>
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

      {hasDiseases === "yes" &&
        diseases.map((_, index) => (
          <div
            key={index}
            className="mt-10 mb-3.5 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={control}
              name={`chronicDiseases.diseases.${index}.name`}
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
              name={`chronicDiseases.diseases.${index}.medication`}
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
              name={`chronicDiseases.diseases.${index}.procedures`}
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
        ))}

      <div className="flex justify-center items-center gap-2">
        {hasDiseases && (
          <Button
            type="button"
            size={"lg"}
            variant="outline"
            onClick={addDisease}
            className="font-bold"
          >
            <Plus className="size-6" size={24} />
            إضافة مرض مزمن
          </Button>
        )}

        {diseases.length > 1 && (
          <Button
            type="button"
            size={"sm"}
            variant="outline"
            onClick={removeDisease}
            className="font-bold aspect-square"
          >
            <Minus className="size-6" size={24} />
          </Button>
        )}
      </div>
    </div>
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
