"use client";
import { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/dashboard/Header";
import MainSidebar from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import { useAuthStore } from "@/store/authStore";
import {
  useSecondarySidebarOpen,
  useSetSecondarySidebarOpen,
} from "@/store/sidebarStore";

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

  // Sidebar open state (for main sidebar only)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Secondary sidebar state from global store
  const secondarySidebarOpen = useSecondarySidebarOpen();
  const setSecondarySidebarOpen = useSetSecondarySidebarOpen();

  useEffect(() => {
    console.log("DashboardLayout useEffect - user:", user);
    if (!user) {
      toast.error("You are not authorized to view this page.");
      router.push(`/${locale}`); // Redirect to home page
      return;
    }
    const role = user.role;
    console.log("DashboardLayout useEffect - role:", role);
    const allowedRoles = ["admin", "center", "branch_admin", "parent"];
    const parentDashboard = `/${locale}/dashboard/parent`;
    const adminDashboard = `/${locale}/dashboard/admin`;
    const centerDashboard = `/${locale}/dashboard/center`;

    // Prevent users with no role from accessing the dashboard
    if (!role || !allowedRoles.includes(role)) {
      toast.error("You are not authorized to view this page.");
      router.push(`/${locale}`); // Redirect to home page
      return;
    }

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
  }, [user, pathname, router, locale]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <MainSidebar />
      <main className="grow">
        <Header
          onToggleFullscreen={() => {
            if (sidebarOpen || secondarySidebarOpen) {
              setSidebarOpen(false);
              setSecondarySidebarOpen(false);
            } else {
              setSidebarOpen(true);
              setSecondarySidebarOpen(true);
            }
          }}
          sidebarOpen={sidebarOpen}
          secondarySidebarOpen={secondarySidebarOpen}
        />
        <div className="px-4 md:px-10 py-10">{children}</div>
      </main>
      {/* SecondarySidebar only on xl screens, toggleable */}
      <div className="hidden xl:block">
        <SidebarProvider
          open={secondarySidebarOpen}
          onOpenChange={setSecondarySidebarOpen}
        >
          <SecondarySidebar />
        </SidebarProvider>
      </div>
    </SidebarProvider>
  );
}
