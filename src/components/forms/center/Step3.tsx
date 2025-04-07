"use client";

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

const MealPeriods = [
  "الفترة الأولى",
  "الفترة الثانية",
  "الفترة الثالثة",
  "الفترة الرابعة",
];

export function Step3Communication() {
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
    { id: "voice", label: "تواصل صوتي" },
    { id: "text", label: "تواصل نصي" },
    { id: "video", label: "تواصل فيديو" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="form-label">
          هل يوفر المركز تواصل فوري مع أولياء الأمور في حالات الطوارئ؟
        </p>
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

      <div className="space-y-4">
        <p className="form-label">طرق تواصل الأطفال مع أولياء الأمور</p>
        <CheckboxGroup
          control={control}
          items={communicationMethods}
          name="communicationMethods"
        />
      </div>

      <div className="space-y-4">
        <p className="form-label">هل يوفر المركز خدمة تقديم الطعام؟</p>

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

      {/* Meal sections */}
      {hasMeals === "yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 md:gap-y-10">
          {meals.map((meal, index) => (
            <div key={meal.id} className="space-y-2 text-center">
              <p className="font-medium text-xl text-mid-gray">
                {MealPeriods[index]}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={control}
                  name={`meals.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="اسم الوجبة" {...field} />
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
                        <Input placeholder="المكونات" {...field} />
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
                        <Input placeholder="المشروب" {...field} />
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
            إضافة وجبة
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
