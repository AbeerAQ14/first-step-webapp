"use client";

import { useLocale } from "next-intl";
import { PlusCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Header from "./secondary-sidebar/Header";
import { useEventsStore } from "@/store/eventsStore";
import TaskCard from "./secondary-sidebar/TaskCard";
import Card from "./secondary-sidebar/Card";
import EmptyState from "./secondary-sidebar/EmptyState";

const SecondarySidebar = () => {
  const locale = useLocale();

  const { occasions, birthdays, tasks, addOccasion, addBirthday, addTask } =
    useEventsStore();

  return (
    <Sidebar
      className="bg-sidebar h-screen py-10 px-4"
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
            <PlusCircle
              onClick={() =>
                addOccasion({ title: "مناسبة جديدة", date: new Date() })
              }
              className="size-4 text-light-gray hover:text-primary cursor-pointer"
            />
          </div>

          {occasions.length === 0 ? (
            <EmptyState
              onAdd={() =>
                addOccasion({ title: "مناسبة جديدة", date: new Date() })
              }
            />
          ) : (
            <div className="mt-2 flex flex-col items-center gap-y-2">
              {occasions.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  type="occasion"
                  title={item.title}
                  rawDate={item.date}
                  date={item.date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                />
              ))}
              <div className="w-4/5 h-px bg-light-gray rounded-full" />
            </div>
          )}
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl text-primary">أعياد الميلاد</p>
            <PlusCircle
              onClick={() =>
                addBirthday({ title: "عيد ميلاد جديد", date: new Date() })
              }
              className="size-4 text-light-gray hover:text-primary cursor-pointer"
            />
          </div>

          {birthdays.length === 0 ? (
            <EmptyState
              onAdd={() =>
                addBirthday({ title: "عيد ميلاد جديد", date: new Date() })
              }
            />
          ) : (
            <div className="mt-2 flex flex-col items-center gap-y-2">
              {birthdays.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  type="birthday"
                  title={item.title}
                  rawDate={item.date}
                  date={item.date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                />
              ))}
              <div className="w-4/5 h-px bg-light-gray rounded-full" />
            </div>
          )}
        </SidebarGroup>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl text-primary">المهمات</p>

            <div className="flex items-center gap-x-2">
              <p className="text-xs text-success">
                {tasks.filter((t) => t.done).length}/{tasks.length}
              </p>
              <PlusCircle
                onClick={() =>
                  addTask({
                    title: "مهمة جديدة",
                    date: new Date(),
                    done: false,
                  })
                }
                className="size-4 text-light-gray hover:text-primary cursor-pointer"
              />
            </div>
          </div>

          {tasks.length === 0 ? (
            <EmptyState
              onAdd={() =>
                addTask({ title: "مهمة جديدة", date: new Date(), done: false })
              }
            />
          ) : (
            <div className="mt-2 flex flex-col gap-y-2">
              {/* Tasks list */}
              <div className="flex flex-col items-center gap-y-2">
                {tasks.map((item) => (
                  <TaskCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    rawDate={item.date}
                    date={item.date.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                    done={item.done}
                  />
                ))}
                <div className="w-4/5 h-px bg-light-gray rounded-full mt-1" />
              </div>
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SecondarySidebar;
