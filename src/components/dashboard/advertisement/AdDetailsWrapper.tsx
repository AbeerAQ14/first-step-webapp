"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";
import { adminService } from "@/services/dashboardApi";
import { toast } from "sonner";

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
  const editMutation = useMutation({
    mutationFn: (data: Partial<AdRequestFormData>) => {
      // Transform the data structure to match the API's expected format
      const transformedData = {
        titleAr: data.title?.ar,
        titleEn: data.title?.en,
        descriptionAr: data.description?.ar,
        descriptionEn: data.description?.en,
        image: data.image[0],
        publish_date: data.start_date?.toISOString().split("T")[0],
        end_date: data.end_date?.toISOString().split("T")[0],
      };
      return adminService.updateAdvertisement(adId, transformedData);
    },
    onSuccess: () => {
      toast.success("تم تحديث الإعلان بنجاح");
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء تحديث الإعلان");
    },
  });

  const editHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: AdRequestFormData,
    dirtyFields: string[]
  ) => {
    e.preventDefault();
    const payload: Partial<AdRequestFormData> = {};
    dirtyFields.forEach((field) => {
      // @ts-ignore
      payload[field] = data[field];
    });
    editMutation.mutate(payload);
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

  const buttons = (
    data: AdRequestFormData,
    isValid: boolean,
    dirtyFields: string[]
  ) => {
    if (mode === "add") {
      return (
        <>
          <Button
            onClick={(e) => editHandler(e, data, dirtyFields)}
            size={"sm"}
            disabled={
              dirtyFields.length === 0 || editMutation.status === "pending"
            }
          >
            {editMutation.status === "pending"
              ? "جاري التحديث..."
              : "تعديل الإعلان"}
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
        {(data, isValid, isSubmitting, dirtyFields) =>
          buttons(data, isValid, dirtyFields)
        }
      </AdRequestForm>
    </div>
  );
};

export default AdDetailsWrapper;
