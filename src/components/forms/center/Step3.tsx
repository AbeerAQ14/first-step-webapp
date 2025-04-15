"use client";

import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/general/RadioGroup";
import CheckboxGroup from "../CheckboxGroup";
import { Minus, Plus } from "lucide-react";
import type { CenterStep3FormData } from "@/lib/schemas";
import { getMealTitle } from "@/lib/utils";

export function Step3Communication() {
  const t = useTranslations("auth.center-signup.3.form");
  const { control, watch } = useFormContext<CenterStep3FormData>();
  const hasMeals = watch("foodService");
  const {
    fields: meals,
    append,
    remove,
  } = useFieldArray({
    name: "meals",
  });

  const addMeal = () => {
    append({ name: "", drink: "", ingredients: "" });
  };

  const removeMeal = () => {
    remove(meals.length - 1);
  };

  const communicationMethods = [
    { id: "voice", label: t("communication-methods.options.voice") },
    { id: "text", label: t("communication-methods.options.text") },
    { id: "video", label: t("communication-methods.options.video") },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="form-label">{t("emergency-contact.label")}</p>
        <FormField
          control={control}
          name="emergencyContact"
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
                      label: t("emergency-contact.options.yes"),
                    },
                    {
                      value: "no",
                      label: t("emergency-contact.options.no"),
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <p className="form-label">{t("communication-methods.label")}</p>
        <CheckboxGroup
          control={control}
          items={communicationMethods}
          name="communicationMethods"
        />
      </div>

      <div className="space-y-4">
        <p className="form-label">{t("food-service.label")}</p>

        <FormField
          control={control}
          name="foodService"
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
                      label: t("food-service.options.yes"),
                    },
                    {
                      value: "no",
                      label: t("food-service.options.no"),
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Meal sections */}
      {hasMeals === "yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 md:gap-y-10">
          {meals.map((meal, index) => (
            <div key={meal.id} className="space-y-2 text-center">
              <p className="font-medium text-xl text-mid-gray">
                {getMealTitle(index, "ar")}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={control}
                  name={`meals.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("food-details.name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`meals.${index}.ingredients`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("food-details.ingredients")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`meals.${index}.drink`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("food-details.drink")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2">
        {hasMeals === "yes" && (
          <Button
            type="button"
            size={"lg"}
            variant="outline"
            onClick={addMeal}
            className="font-bold"
          >
            <Plus className="size-6" size={24} />
            {t("food-details.add")}
          </Button>
        )}

        {meals.length > 1 && (
          <Button
            type="button"
            size={"sm"}
            variant="outline"
            onClick={() => removeMeal()}
            className="font-bold aspect-square"
          >
            <Minus className="size-6" size={24} />
          </Button>
        )}
      </div>
    </div>
  );
}
