"use client";
import { use, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const role = user.role;

      const parentDashboard = `/${locale}/dashboard/parent`;
      const adminDashboard = `/${locale}/dashboard/admin`;
      const centerDashboard = `/${locale}/dashboard/center`;

      if (role === "parent" && !pathname.startsWith(parentDashboard)) {
        toast.error("You are not authorized to view this page.");
        router.push(parentDashboard);
      } else if (
        (role === "center" || role === "branch_admin") &&
        !pathname.startsWith(centerDashboard)
      ) {
        toast.error("You are not authorized to view this page.");
        router.push(centerDashboard);
      } else if (role === "admin" && !pathname.startsWith(adminDashboard)) {
        toast.error("You are not authorized to view this page.");
        router.push(adminDashboard);
      }
    }
  }, [user, pathname, router, locale]);

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
