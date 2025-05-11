"use client";

import { useState } from "react";
import { Tabs } from "@/components/general/Tabs";
import Children from "../children/Children";

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
        <div></div>
      ) : (
        <Children noEdit baseUrl="parents/children" />
      )}
    </div>
  );
};

export default ParentsWrapper;
