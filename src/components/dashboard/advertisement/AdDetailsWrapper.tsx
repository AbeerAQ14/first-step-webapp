"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";

type AdType = "accepted" | "pending" | "rejected";

// just show and edit
const AdDetailsWrapper = ({
  adId,
  initialValues,
  mode,
  adType,
}: {
  adId: string;
  initialValues: AdRequestFormData;
  mode: "add" | "show";
  adType?: AdType;
}) => {
  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Edited Ad");
  };

  const rejectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Rejected Ad");
  };

  const acceptHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Accepted Ad");
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Deleted Ad");
  };

  const adTypeButtons = (
    adType: AdType,
    data: AdRequestFormData,
    isValid: boolean
  ) => {
    switch (adType) {
      case "accepted":
        return (
          <>
            <Button asChild size={"sm"}>
              <Link href={`${adId}/edit`}>تعديل الإعلان</Link>
            </Button>
            <Button
              onClick={deleteHandler}
              size={"sm"}
              variant={"outline"}
              className="!border-destructive text-destructive"
            >
              حذف الإعلان
            </Button>
          </>
        );
      case "pending":
        return (
          <>
            <Button onClick={acceptHandler} size={"sm"}>
              قبول الإعلان
            </Button>
            <Button
              onClick={rejectHandler}
              size={"sm"}
              variant={"outline"}
              className="!border-destructive text-destructive"
            >
              رفض الإعلان
            </Button>
          </>
        );
      case "rejected":
        return (
          <>
            <Button onClick={acceptHandler} size={"sm"}>
              قبول الإعلان
            </Button>
            <Button
              asChild
              size={"sm"}
              variant={"outline"}
              className="!border-light-gray text-mid-gray"
            >
              <Link href={`${adId}/edit`}>تعديل الإعلان</Link>
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const buttons = (data: AdRequestFormData, isValid: boolean) => {
    if (mode === "add") {
      return (
        <>
          <Button onClick={editHandler} size={"sm"}>
            تعديل الإعلان
          </Button>
          <Button
            onClick={deleteHandler}
            size={"sm"}
            variant={"outline"}
            className="!border-destructive text-destructive"
          >
            حذف الإعلان
          </Button>
        </>
      );
    } else if (mode === "show") {
      return adTypeButtons(adType || "accepted", data, isValid);
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
