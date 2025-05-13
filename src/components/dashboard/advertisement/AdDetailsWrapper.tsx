"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";

const AdDetailsWrapper = ({
  adId,
  initialValues,
  mode,
}: {
  adId: string;
  initialValues: AdRequestFormData;
  mode: "add" | "show";
}) => {
  const buttons = (data: AdRequestFormData, isValid: boolean) => {
    if (mode === "add") {
      return (
        <>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log(data, isValid);
            }}
            size={"sm"}
          >
            تعديل الإعلان
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log(data, isValid);
            }}
            size={"sm"}
            variant={"outline"}
            className="!border-destructive text-destructive"
          >
            حذف الإعلان
          </Button>
        </>
      );
    } else if (mode === "show") {
      return (
        <>
          <Button asChild size={"sm"}>
            <Link href={`${adId}/edit`}>تعديل الإعلان</Link>
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log(data, isValid);
            }}
            size={"sm"}
            variant={"outline"}
            className="!border-destructive text-destructive"
          >
            حذف الإعلان
          </Button>
        </>
      );
    }
  };

  return (
    <div>
      <AdRequestForm initialData={initialValues} mode={mode}>
        {(data, isValid) => buttons(data, isValid)}
      </AdRequestForm>
    </div>
  );
};

export default AdDetailsWrapper;
