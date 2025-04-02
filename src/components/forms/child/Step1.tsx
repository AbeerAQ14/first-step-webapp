"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/general/DatePicker";
import type { SignUpParentFormData } from "@/lib/schemas";

export default function Step1ChildInfo() {
  const { control } = useFormContext<SignUpParentFormData>();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="childName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                اسم الطفل
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                تاريخ الميلاد<span className="text-red-500">*</span>
              </FormLabel>
              <DatePicker value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                اسم الأب<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="motherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                اسم الأم<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <p className="text-center text-primary font-bold mb-4">جنس الطفل</p>
        <div className="flex justify-center gap-8">
          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <>
                <div className="group flex flex-col items-center">
                  <label
                    className={`cursor-pointer p-4 px-5.5 border rounded-2xl hover:border-secondary-mint-green duration-300 ${
                      field.value === "male"
                        ? "border-secondary-mint-green"
                        : "border-light-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only peer"
                      value="male"
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                    />
                    <div className="group relative transition-all duration-300 peer-checked:saturate-100 group-hover:saturate-100 saturate-0">
                      <Image
                        src="/boy.png"
                        alt="ولد"
                        width={91.32}
                        height={120}
                        className="group-hover:scale-110 duration-300"
                      />
                    </div>
                    <p className="text-xl font-medium text-center mt-2 text-mid-gray peer-checked:text-primary hover:text-primary duration-300">
                      ولد
                    </p>
                  </label>
                </div>

                <div className="group flex flex-col items-center">
                  <label
                    className={`cursor-pointer p-4 px-6.5 border rounded-2xl hover:border-secondary-burgundy duration-300 ${
                      field.value === "female"
                        ? "border-secondary-burgundy"
                        : "border-light-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only peer"
                      value="female"
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                    />
                    <div className="group relative transition-all duration-300 peer-checked:saturate-100 group-hover:saturate-100 saturate-0">
                      <Image
                        src="/girl.png"
                        alt="Girl"
                        width={84.74}
                        height={120}
                        className="group-hover:scale-110 duration-300"
                      />
                    </div>
                    <p className="text-xl font-medium text-center mt-2 text-mid-gray peer-checked:text-primary hover:text-primary duration-300">
                      بنت
                    </p>
                  </label>
                </div>
                <FormMessage />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
