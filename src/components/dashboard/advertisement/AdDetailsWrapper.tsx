"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";

const AdDetailsWrapper = ({
  adId,
  initialValues,
}: {
  adId: string;
  initialValues: AdRequestFormData;
}) => {
  return (
    <div>
      <AdRequestForm initialData={initialValues} mode="show">
        {(data, isValid) => (
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
        )}
      </AdRequestForm>
    </div>
  );
};

export default AdDetailsWrapper;
