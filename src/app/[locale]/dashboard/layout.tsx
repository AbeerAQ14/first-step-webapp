import React from "react";
import type { Metadata } from "next";
import Header from "@/components/dashboard/Header";
import MainSidebar from "@/components/dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";

export const metadata: Metadata = {
  title: "Dashboard | First Step",
  description: "Generated by create next app",
};

const items = [
  {
    title: "الرئيسية", // Home
    url: "",
  },
  {
    title: "فروعي", // My Branches
    url: "/dashboard/center/branches",
  },
  {
    title: "ملفات الأطفال", // Children Files
    url: "/dashboard/center/children-files",
  },
  {
    title: "الحجوزات", // Appointments
    url: "/dashboard/center/bookings",
  },
  {
    title: "التقارير اليومية", // Daily Reports
    url: "/dashboard/center/daily-reports",
  },
  {
    title: "تعديل الموقع", // Edit Website
    url: "/dashboard/center/site-edit",
  },
  {
    title: "طلب إعلان أو مدونة", // Request Ad or Blog
    url: "/dashboard/center/ad-or-blog-request",
  },
  {
    title: "الإشعارات", // Notifications
    url: "/dashboard/center/notifications",
  },
  {
    title: "فريق العمل", // Team
    url: "/dashboard/center/team",
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="grow">
        <SidebarTrigger className="md:hidden" />
        <Header items={items} />

        <div className="px-4 md:px-10 py-10">{children}</div>
      </main>
      <div className="hidden xl:block">
        <SecondarySidebar />
      </div>
    </SidebarProvider>
  );
}
