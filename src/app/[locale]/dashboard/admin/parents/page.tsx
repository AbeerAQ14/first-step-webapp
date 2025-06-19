"use client";

import { useState } from "react";
import { Tabs } from "@/components/general/Tabs";
import Children from "@/components/dashboard/children/Children";
import Parents from "@/components/dashboard/Parents/Parents";

export default function ParentsPage() {
  const [activeTab, setActiveTab] = useState<"parents" | "children">("parents");

  return (
    <div>
      <Tabs
        options={[
          { value: "parents", label: "أولياء الأمور" },
          { value: "children", label: "الأطفال" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "parents" ? (
        <Parents />
      ) : (
        <Children noEdit baseUrl="children" />
      )}
    </div>
  );
}
