"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { dashboardIcons } from "@/components/general/icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { useAuthUser } from "@/store/authStore";

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
  // {
  //   title: t("site-edit"),
  //   url: "/dashboard/center/site-edit",
  //   icon: dashboardIcons.site,
  // },
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
  // {
  //   title: "الرئيسية", // Home
  //   url: "/dashboard/parent",
  //   icon: dashboardIcons.home,
  // },
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
    icon: dashboardIcons.building,
  },
  {
    title: "أولياء الأمور", // Children
    url: "/dashboard/admin/parents",
    icon: dashboardIcons.person,
  },
  {
    title: "الحجوزات", // Bookings
    url: "/dashboard/admin/bookings",
    icon: dashboardIcons.bookings,
  },
  {
    title: "إعلان", // Children
    url: "/dashboard/admin/advertisement",
    icon: dashboardIcons.request,
  },
  {
    title: "مدونة", // Daily Reports
    url: "/dashboard/admin/blog",
    icon: dashboardIcons.blog,
  },
  {
    title: "الإشعارات", // Daily Reports
    url: "/dashboard/admin/notifications",
    icon: dashboardIcons.notifications,
  },
];

const DashboardSideBar = () => {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();
  const locale = useLocale();
  const t = useTranslations("dashboard.center.sidebar");
  const isMobile = useIsMobile();
  const user = useAuthUser();

  // Auto-expand sidebar when switching from mobile to desktop
  useEffect(() => {
    if (isMobile && state === "collapsed") {
      setOpen(true);
    }
  }, [isMobile, state, setOpen]);

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
      collapsible="icon"
    >
      <SidebarHeader className="mb-4 justify-center items-center">
        <Image
          className={cn(
            "size-20 aspect-square object-center object-cover rounded-full bg-primary-blue/20",
            state === "collapsed" ? "size-fit" : ""
          )}
          src={user?.logo || "/assets/logos/instagram-logo.png"}
          width={80}
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
                          className={cn(
                            "flex justify-start items-center space-x-2 px-4 py-6.5 w-full rounded-lg transition-colors",
                            isActive
                              ? "!bg-primary !text-white !font-bold"
                              : "bg-transparent !text-mid-gray"
                          )}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  "rounded-[.5rem] w-fit",
                                  isActive ? "bg-white" : "bg-primary",
                                  state === "collapsed"
                                    ? "bg-transparent"
                                    : "p-2"
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    state === "collapsed"
                                      ? "size-4.5"
                                      : "size-4",
                                    state === "collapsed" && !isActive
                                      ? "text-primary"
                                      : state === "collapsed" && isActive
                                      ? "text-white"
                                      : isActive
                                      ? "text-primary"
                                      : "text-white"
                                  )}
                                />
                              </div>
                            </TooltipTrigger>
                            {state === "collapsed" && (
                              <TooltipContent side="right" align="center">
                                {item.title}
                              </TooltipContent>
                            )}
                          </Tooltip>
                          {state !== "collapsed" && <span>{item.title}</span>}
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
      <SidebarFooter
        className={cn(
          "mt-4 justify-end items-center",
          state === "collapsed" ? "my-4" : ""
        )}
      >
        <Link href="/" className={state === "collapsed" ? "w-full h-full" : ""}>
          <Image
            className={cn(
              "w-8",
              state === "collapsed"
                ? "opacity-100 duration-1000 ease-in"
                : "opacity-0 h-0"
            )}
            src={"/assets/logos/logo.svg"}
            alt="logo"
            width={64.09}
            height={80}
          />
          <Image
            className={cn(
              state === "expanded" ? "opacity-100 duration-500" : "opacity-0"
            )}
            src={"/assets/logos/complete_logo.svg"}
            alt="logo"
            width={157.6}
            height={40}
          />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSideBar;
