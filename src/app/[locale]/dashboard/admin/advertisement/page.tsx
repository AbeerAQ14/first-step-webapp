"use client";

import { useState } from "react";
import { Tabs } from "@/components/general/Tabs";
import AdminAds from "@/components/dashboard/advertisement/AdminAds";
import CentersAdvertisements from "@/components/dashboard/advertisement/CentersAdvertisements";

export default function Advertisement() {
  const [activeTab, setActiveTab] = useState<"firstStep" | "centers">(
    "firstStep"
  );

  return (
    <div className="flex flex-col gap-y-6">
      <Tabs
        options={[
          { value: "firstStep", label: "إعلانات First step" },
          { value: "centers", label: "إعلانات الحضانات والمراكز" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "firstStep" ? <AdminAds /> : <CentersAdvertisements />}
    </div>
  );
}
