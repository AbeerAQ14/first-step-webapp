"use client";

import { useState } from "react";
import { Tabs } from "@/components/general/Tabs";
import Children from "../children/Children";
import Parents from "./Parents";

const ParentsWrapper = () => {
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
};

export default ParentsWrapper;
