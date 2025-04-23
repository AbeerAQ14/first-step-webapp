"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { dashboardIcons } from "@/components/general/icons";

const items = [
  {
    title: "الرئيسية", // Home
    url: "/dashboard/center",
    icon: dashboardIcons.home,
  },
  {
    title: "فروعي", // My Branches
    url: "/dashboard/center/branches",
    icon: dashboardIcons.branches,
  },
  {
    title: "ملفات الأطفال", // Children Files
    url: "/dashboard/center/children-files",
    icon: dashboardIcons.files,
  },
  {
    title: "الحجوزات", // Appointments
    url: "/dashboard/center/bookings",
    icon: dashboardIcons.bookings,
  },
  {
    title: "التقارير اليومية", // Daily Reports
    url: "/dashboard/center/daily-reports",
    icon: dashboardIcons.reports,
  },
  {
    title: "تعديل الموقع", // Edit Website
    url: "/dashboard/center/site-edit",
    icon: dashboardIcons.site,
  },
  {
    title: "طلب إعلان أو مدونة", // Request Ad or Blog
    url: "/dashboard/center/ad-or-blog-request",
    icon: dashboardIcons.request,
  },
  {
    title: "الإشعارات", // Notifications
    url: "/dashboard/center/notifications",
    icon: dashboardIcons.notifications,
  },
  {
    title: "فريق العمل", // Team
    url: "/dashboard/center/team",
    icon: dashboardIcons.team,
  },
];

const DashboardSideBar = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <Sidebar
      className="h-screen py-10"
      side={locale === "ar" ? "right" : "left"}
      collapsible="offcanvas"
    >
      <SidebarHeader className="mb-4 justify-center items-center">
        <Image
          className=""
          src="/assets/logos/instagram-logo.png"
          width={81.66}
          height={80}
          alt="Nersery Logo"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>app</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Button asChild className="bg-transparent shadow-none">
                        <Link
                          href={item.url}
                          className={`flex justify-start items-center space-x-2 px-4 py-6.5 w-full rounded-lg transition-colors ${
                            isActive
                              ? "!bg-primary !text-white !font-bold"
                              : "bg-transparent !text-mid-gray"
                          }`}
                        >
                          <div
                            className={`rounded-[.5rem] w-fit p-2 ${
                              isActive ? "bg-white" : "bg-primary"
                            }`}
                          >
                            <item.icon
                              className={`size-4 ${
                                isActive ? "text-primary" : "text-white"
                              }`}
                            />
                          </div>
                          <span>{item.title}</span>
                        </Link>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-4 justify-end items-center">
        <Image
          src="/assets/logos/complete_logo.svg"
          alt="logo"
          width={157.6}
          height={40}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSideBar;
