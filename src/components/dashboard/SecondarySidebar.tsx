"use client";

import { useLocale } from "next-intl";
import { Sidebar } from "@/components/ui/sidebar";

const SecondarySidebar = () => {
  const locale = useLocale();

  return (
    <Sidebar
      className="h-screen py-10"
      side={locale === "ar" ? "left" : "right"}
      collapsible="none"
    ></Sidebar>
  );
};

export default SecondarySidebar;
