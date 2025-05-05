"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Header from "./secondary-sidebar/Header";
import { Plus, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const SecondarySidebar = () => {
  const locale = useLocale();

  const occasions = [
    {
      title: "وقفة عيد الأضحى المبارك",
      date: new Date(2025, 3, 24),
    },
    {
      title: "أول أيام عيد الأضحى المبارك",
      date: new Date(2025, 3, 24),
    },
  ];

  const birthDays = [
    {
      title: "يوم ميلاد منة الله عماره",
      date: new Date(2025, 7, 31),
    },
    {
      title: "يوم ميلاد عمرو طه",
      date: new Date(2025, 9, 1),
    },
  ];

  const todos = [
    {
      title: "إرسال تقارير لأولياء الأمور",
      date: new Date(2025, 6, 5),
      done: true,
    },
    {
      title: "إرسال تقارير لأولياء الأمور",
      date: new Date(2025, 6, 5),
      done: false,
    },
  ];

  return (
    <Sidebar
      className="h-screen py-10 px-4"
      side={locale === "ar" ? "left" : "right"}
      collapsible="none"
    >
      <SidebarHeader className="mb-9 px-0">
        <Header />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl text-primary">مناسبات قادمة</p>

            <PlusCircle className="size-4 text-light-gray hover:text-primary cursor-pointer" />
          </div>

          <div className="group mt-2 flex flex-col items-center gap-y-2">
            {occasions.map((item) => (
              <Card
                key={item.title}
                {...item}
                date={item.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              />
            ))}
            <div className="w-4/5 h-px bg-light-gray rounded-full" />
          </div>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl text-primary">أعياد الميلاد</p>

            <PlusCircle className="size-4 text-light-gray hover:text-primary cursor-pointer" />
          </div>

          <div className="group mt-2 flex flex-col items-center gap-y-2">
            {birthDays.map((item) => (
              <Card
                key={item.title}
                {...item}
                date={item.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              />
            ))}
            <div className="w-4/5 h-px bg-light-gray rounded-full" />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between">
          <p className="font-medium text-xl text-primary">المهام</p>

          <PlusCircle className="size-4 text-light-gray hover:text-primary cursor-pointer" />
        </div>

        <div className="flex flex-col items-center gapy">
          <Image
            src="/assets/illustrations/empty.png"
            width={60}
            height={60}
            alt="empty sheet"
          />
          <Button
            className="h-7 px-4 font-bold text-[.75rem]"
            size={"sm"}
            variant={"outline"}
          >
            أضف مهامك الآن
            <Plus className="size-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SecondarySidebar;

const Card = ({ title, date }: { title: string; date: string }) => {
  return (
    <div className="text-mid-gray first:text-primary bg-white w-full text-center p-2 space-y-2 rounded-xl">
      <p className="font-medium text-sm">{title}</p>
      <p className="font-medium text-sm text-light-gray">{date}</p>
    </div>
  );
};
