"use client";

import { Button } from "@/components/ui/button";
import AdRequestForm from "./AdRequestForm";
import { useRouter } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const CenterAdRequest = () => {
  const router = useRouter();
  const t = useTranslations("dashboard.center.ad-or-blog-request.ad.form");

  return (
    <div>
      <AdRequestForm>
        {(data, isValid, isSubmitting) => (
          <>
            <Button size={"sm"} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("sending")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="!border-light-gray text-mid-gray"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              {t("cancel")}
            </Button>
          </>
        )}
      </AdRequestForm>
    </div>
  );
};

export default CenterAdRequest;
