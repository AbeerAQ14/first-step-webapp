"use client";

import { Ad, useAdsColumns } from "@/components/tables/data/ads";
import { DataTable } from "@/components/tables/DataTable";
import { useTranslations } from "next-intl";
import { centerService } from "@/services/dashboardApi";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Ads = () => {
  const tableT = useTranslations("dashboard.tables.ads");
  const columns = useAdsColumns();

  const {
    data: ads = [],
    isLoading,
    error,
  } = useQuery<Ad[]>({
    queryKey: ["ads"],
    queryFn: async () => {
      const response = await centerService.getAds();
      return response.map((ad: any) => ({
        id: ad.id,
        type: "paid",
        startDate: ad.publish_date,
        endDate: ad.publish_date, // Since end_date is not provided in the response
        branch: "الفرع الرئيسي", // Since branch name is not provided in the response
        amount: ad.status === "accepted" ? 564.5 : 0, // Amount only if accepted
        reservationStatus:
          ad.status === "accepted"
            ? "confirmed"
            : ad.status === "pending"
            ? "waitingForPayment"
            : "rejected",
      }));
    },
  });

  // Handle errors using useEffect
  useEffect(() => {
    if (error) {
      toast(tableT("error.title"), {
        description: tableT("error.description"),
      });
      console.error("Error fetching ads:", error);
    }
  }, [error, tableT]);

  return (
    <div className="mt-6">
      <DataTable columns={columns} data={ads} isLoading={isLoading} />
    </div>
  );
};

export default Ads;
