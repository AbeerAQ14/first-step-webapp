"use client";

import { useState } from "react";
import { Tabs } from "@/components/general/Tabs";
import AdminBlogs from "@/components/dashboard/blog/AdminBlogs";
import CentersBlogs from "@/components/dashboard/blog/CentersBlogs";

export default function blogPage() {
  const [activeTab, setActiveTab] = useState<"firstStep" | "centers">(
    "firstStep"
  );

  return (
    <div className="flex flex-col gap-y-6">
      <Tabs
        options={[
          { value: "firstStep", label: "مدونات First step" },
          { value: "centers", label: "مدونات الحضانات والمراكز" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "firstStep" ? <AdminBlogs /> : <CentersBlogs />}
    </div>
  );
}
