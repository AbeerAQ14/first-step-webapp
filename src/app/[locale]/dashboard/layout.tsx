"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import MainSidebar from "@/components/dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const role = user.role;
      const locale = params.locale;

      const parentDashboard = `/${locale}/dashboard/parent`;
      const adminDashboard = `/${locale}/dashboard/admin`;
      const centerDashboard = `/${locale}/dashboard/center`;

      if (role === "parent" && !pathname.startsWith(parentDashboard)) {
        router.push(parentDashboard);
      } else if (
        (role === "center" || role === "branch_admin") &&
        !pathname.startsWith(centerDashboard)
      ) {
        router.push(centerDashboard);
      } else if (role === "admin" && !pathname.startsWith(adminDashboard)) {
        router.push(adminDashboard);
      }
    }
  }, [user, pathname, router, params.locale]);

  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="grow">
        <SidebarTrigger
          className="md:hidden fixed top-4 left-4 rtl:left-auto 
          rtl:right-4 z-50 bg-white/80 backdrop-blur-sm shadow-sm 
          hover:bg-white/90 transition-colors rounded-lg size-10"
        />
        <Header />
        <div className="px-4 md:px-10 py-10">{children}</div>
      </main>
      <div className="hidden xl:block">
        <SecondarySidebar />
      </div>
    </SidebarProvider>
  );
}
