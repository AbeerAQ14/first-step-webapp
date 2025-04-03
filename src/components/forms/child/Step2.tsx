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
import type { Allergy, ChronicDisease } from "@/types";
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

  const {
    fields: allergies,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control,
    name: "allergies.allergies",
  });

  const addDisease = () => {
    appendDisease({ name: "", medication: "", procedures: "" });
  };

  const addAllergy = () => {
    appendAllergy({
      allergyTypes: "",
      allergyFoods: "",
      allergyProcedures: "",
    });
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

      <AllergiesForm
        control={control}
        hasAllergies={hasAllergies}
        allergies={allergies}
        addAllergy={addAllergy}
        removeAllergy={removeAllergy}
      />
    </div>
  );
}

interface DiseasesFormProps {
  control: Control<SignUpParentFormData>;
  hasDiseases: "yes" | "no";
  diseases: ChronicDisease[];
  addDisease: () => void;
  removeDisease: (index?: number) => void;
}

interface AllergiesFormProps {
  control: Control<SignUpParentFormData>;
  hasAllergies: "yes" | "no";
  allergies: Allergy[];
  addAllergy: () => void;
  removeAllergy: (index?: number) => void;
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
        {hasDiseases === "yes" && (
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
            onClick={() => removeDisease(diseases.length - 1)}
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
  allergies,
  addAllergy,
  removeAllergy,
}: AllergiesFormProps) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-y-4">
        <p className="flex justify-center items-center gap-x-1 flex-col lg:flex-row text-primary font-medium text-center text-xl md:text-2xl">
          <span>هل يعاني طفلك من أي نوع من الحساسية؟</span>
          <span className="font-normal text-sm md:text-base text-mid-gray">
            (مثل حساسية الطعام , الأدوية , او أي مواد اخري)
          </span>
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

      {hasAllergies === "yes" &&
        allergies.map((_, index) => (
          <div
            key={index}
            className="mt-10 mb-3.5 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={control}
              name={`allergies.allergies.${index}.allergyTypes`}
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
              name={`allergies.allergies.${index}.allergyFoods`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ما هي المواد أو الأطعمة المسببة للحساسية؟
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: المكسرات"
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
              name={`allergies.allergies.${index}.allergyProcedures`}
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
        ))}

      <div className="flex justify-center items-center gap-2">
        {hasAllergies === "yes" && (
          <Button
            type="button"
            size={"lg"}
            variant="outline"
            onClick={addAllergy}
            className="font-bold"
          >
            <Plus className="size-6" size={24} />
            إضافة نوع حساسية
          </Button>
        )}

        {allergies.length > 1 && (
          <Button
            type="button"
            size={"sm"}
            variant="outline"
            onClick={() => removeAllergy(allergies.length - 1)}
            className="font-bold aspect-square"
          >
            <Minus className="size-6" size={24} />
          </Button>
        )}
      </div>
    </div>
  );
};
