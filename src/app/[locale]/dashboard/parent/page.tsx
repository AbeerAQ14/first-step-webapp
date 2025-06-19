"use client";

import { redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ParentDashboardHome() {
  const locale = useLocale();
  redirect({ href: "/dashboard/parent/children", locale });

  return <div></div>;
}
