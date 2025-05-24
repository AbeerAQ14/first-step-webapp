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
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { dashboardIcons } from "@/components/general/icons";

const getCenterNavbar = (t: any) => [
  {
    title: t("home"),
    url: "/dashboard/center",
    icon: dashboardIcons.home,
  },
  {
    title: t("branches"),
    url: "/dashboard/center/branches",
    icon: dashboardIcons.branches,
  },
  {
    title: t("children-files"),
    url: "/dashboard/center/children-files",
    icon: dashboardIcons.files,
  },
  {
    title: t("bookings"),
    url: "/dashboard/center/bookings",
    icon: dashboardIcons.bookings,
  },
  {
    title: t("daily-reports"),
    url: "/dashboard/center/daily-reports",
    icon: dashboardIcons.reports,
  },
  {
    title: t("site-edit"),
    url: "/dashboard/center/site-edit",
    icon: dashboardIcons.site,
  },
  {
    title: t("ad-or-blog-request"),
    url: "/dashboard/center/ad-or-blog-request",
    icon: dashboardIcons.request,
  },
  {
    title: t("notifications"),
    url: "/dashboard/center/notifications",
    icon: dashboardIcons.notifications,
  },
  {
    title: t("team"),
    url: "/dashboard/center/team",
    icon: dashboardIcons.team,
  },
];

const parentNavbar = [
  {
    title: "الرئيسية", // Home
    url: "/dashboard/parent",
    icon: dashboardIcons.home,
  },
  {
    title: "أطفالي", // Children
    url: "/dashboard/parent/children",
    icon: dashboardIcons.files,
  },
  {
    title: "الحجوزات", // Bookings
    url: "/dashboard/parent/bookings",
    icon: dashboardIcons.bookings,
  },
  {
    title: "التقارير اليومية", // Daily Reports
    url: "/dashboard/parent/daily-reports",
    icon: dashboardIcons.reports,
  },
];

const adminNavbar = [
  {
    title: "الرئيسية", // Home
    url: "/dashboard/admin",
    icon: dashboardIcons.home,
  },
  {
    title: "الحضانات والمراكز", // Children
    url: "/dashboard/admin/centers",
    icon: dashboardIcons.files,
  },
  {
    title: "أولياء الأمور", // Children
    url: "/dashboard/admin/parents",
    icon: dashboardIcons.files,
  },
  {
    title: "الحجوزات", // Bookings
    url: "/dashboard/admin/bookings",
    icon: dashboardIcons.bookings,
  },
  {
    title: "إعلان", // Children
    url: "/dashboard/admin/advertisement",
    icon: dashboardIcons.files,
  },
  {
    title: "مدونة", // Daily Reports
    url: "/dashboard/admin/blog",
    icon: dashboardIcons.reports,
  },
  {
    title: "الإشعارات", // Daily Reports
    url: "/dashboard/admin/notifications",
    icon: dashboardIcons.reports,
  },
];

const DashboardSideBar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("dashboard.center.sidebar");

  const navbar = pathname.includes("/dashboard/center")
    ? getCenterNavbar(t)
    : pathname.includes("dashboard/admin")
    ? adminNavbar
    : parentNavbar;

  const basePathname = pathname.includes("/dashboard/center")
    ? "/dashboard/center"
    : pathname.includes("dashboard/admin")
    ? "/dashboard/admin"
    : "/dashboard/parent";

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
              {navbar.map((item) => {
                const isActive =
                  pathname === basePathname
                    ? pathname === item.url
                    : pathname.startsWith(item.url) &&
                      item.url !== basePathname;
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
