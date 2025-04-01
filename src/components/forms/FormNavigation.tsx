"use client";

import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between gap-x-9">
      {currentStep > 1 ? (
        <Button
          type="button"
          size={"lg"}
          variant="outline"
          onClick={onPrevious}
          className="!border-light-gray text-mid-gray"
        >
          السابق
        </Button>
      ) : null}

      {currentStep < totalSteps ? (
        <Button type="button" size={"lg"} onClick={onNext}>
          التالي
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          إنشاء حساب
        </Button>
      )}
    </div>
  );
}
