"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("auth.buttons");

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
          {t("previous")}
        </Button>
      ) : null}

      {currentStep < totalSteps ? (
        <Button type="button" size={"lg"} onClick={onNext}>
          {t("next")}
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          {t("sign-up")}
        </Button>
      )}
    </div>
  );
}
