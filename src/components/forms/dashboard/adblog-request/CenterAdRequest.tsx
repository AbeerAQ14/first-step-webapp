"use client";

import { Button } from "@/components/ui/button";
import AdRequestForm from "./AdRequestForm";
import { useRouter } from "@/i18n/navigation";

const CenterAdRequest = () => {
  const router = useRouter();

  return (
    <div>
      <AdRequestForm>
        {(data, isValid) => (
          <>
            <Button size={"sm"} type="submit">
              إرسال طلب
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="!border-light-gray text-mid-gray"
              onClick={() => router.back()}
            >
              إلغاء
            </Button>
          </>
        )}
      </AdRequestForm>
    </div>
  );
};

export default CenterAdRequest;
