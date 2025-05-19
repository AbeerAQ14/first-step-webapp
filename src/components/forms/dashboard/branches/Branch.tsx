"use client";

import { Loader2 } from "lucide-react";
import { Step1BasicInfo } from "../../center/Step1";
import { Step2AgesAndHours } from "../../center/Step2";
import { Step3Communication } from "../../center/Step3";
import { Step4Permits } from "../../center/Step4";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const Branch = ({
  // initialValues,
  mode,
  isSubmitting,
  disabled,
}: {
  // initialValues: BranchFormData;
  mode: "add" | "edit";
  isSubmitting: boolean;
  disabled?: boolean;
}) => {
  const router = useRouter();

  const buttons = (mode: string) => {
    const label = mode === "add" ? "إضافة فرع" : "تعديل الفرع";

    return (
      <>
        <Button
          size="sm"
          type="submit"
          disabled={isSubmitting || mode === "edit" ? disabled : false}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {label}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Step1BasicInfo isBranch />
      <Step2AgesAndHours />
      <Step3Communication />
      <Step4Permits />

      <div className="flex justify-center gap-5 lg:gap-x-10">
        {buttons(mode)}
      </div>
    </div>
  );
};

export default Branch;
