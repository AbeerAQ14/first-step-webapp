"use client";

import { useTranslations } from "next-intl";
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
import type { ChildStep2FormData } from "@/lib/schemas";

export default function Step2ChronicDiseases() {
  const { control, watch } = useFormContext<ChildStep2FormData>();
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
  control: Control<ChildStep2FormData>;
  hasDiseases: "yes" | "no";
  diseases: ChronicDisease[];
  addDisease: () => void;
  removeDisease: (index?: number) => void;
}

interface AllergiesFormProps {
  control: Control<ChildStep2FormData>;
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
  const t = useTranslations("auth.add-child.2.form.diseases");

  return (
    <div>
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-primary font-medium text-center text-xl md:text-2xl">
          {t("title")}
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
                      label: t("options.yes"),
                    },
                    {
                      value: "no",
                      label: t("options.no"),
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
                    {t("disease.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("disease.placeholder")}
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
                    {t("medicine.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("medicine.placeholder")}
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
                    {t("procedures.label")}
                    <span className="font-normal text-sm md:text-base text-mid-gray">
                      {t("procedures.sublabel")}
                    </span>
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("procedures.placeholder")}
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
            {t("add")}
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
  const t = useTranslations("auth.add-child.2.form.allergies");

  return (
    <div>
      <div className="flex flex-col items-center gap-y-4">
        <p className="flex justify-center items-center gap-x-1 flex-col lg:flex-row text-center form-label">
          <span>{t("title")}</span>
          <span className="font-normal text-sm md:text-base text-mid-gray">
            {t("subtitle")}
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
                      label: t("options.yes"),
                    },
                    {
                      value: "no",
                      label: t("options.no"),
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
                    {t("allergy.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("allergy.placeholder")}
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
                    {t("causes.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("causes.placeholder")}
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
                    {t("procedures.label")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("procedures.placeholder")}
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
            {t("add")}
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
