"use client";

import { BranchFormData } from "@/lib/schemas";
import { Step1BasicInfo } from "../../center/Step1";
import { Step2AgesAndHours } from "../../center/Step2";
import { Step3Communication } from "../../center/Step3";
import { Step4Permits } from "../../center/Step4";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const Branch = ({
  // initialValues,
  mode,
  branchId,
}: {
  // initialValues: BranchFormData;
  mode: "add" | "edit";
  branchId?: string;
}) => {
  const router = useRouter();

  const buttons = (mode: string) => {
    if (mode === "add") {
      return (
        <>
          <Button size={"sm"} type="submit">
            إضافة فرع
          </Button>
          <Button size={"sm"} variant={"outline"} onClick={() => router.back()}>
            إلغاء
          </Button>
        </>
      );
    } else if (mode === "edit") {
      return (
        <>
          <Button size={"sm"} type="submit">
            تعديل الفرع
          </Button>
          <Button size={"sm"} variant={"outline"} onClick={() => router.back()}>
            إلغاء
          </Button>
        </>
      );
    }
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
