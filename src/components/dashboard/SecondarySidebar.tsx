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
import { useEventsStore } from "@/store/eventsStore";

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

import { useState } from "react";
import { Pencil, Trash, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

type CardProps = {
  id: string;
  type: "occasion" | "birthday" | "task";
  title: string;
  date: string;
  rawDate: Date;
  done?: boolean;
};

export const Card = ({ id, type, title, date, rawDate, done }: CardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDate, setNewDate] = useState(rawDate.toISOString().split("T")[0]);

  const {
    editOccasion,
    deleteOccasion,
    editBirthday,
    deleteBirthday,
    editTask,
    deleteTask,
    toggleTaskDone,
  } = useEventsStore();

  const handleSave = () => {
    const updated = { title: newTitle, date: new Date(newDate) };

    if (type === "occasion") editOccasion(id, updated);
    else if (type === "birthday") editBirthday(id, updated);
    else editTask(id, { ...updated, done });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (type === "occasion") deleteOccasion(id);
    else if (type === "birthday") deleteBirthday(id);
    else deleteTask(id);
  };

  const cardClasses = cn(
    "group relative w-full p-2 rounded-xl text-sm space-y-2 text-center",
    type === "task" && "text-mid-gray bg-white",
    type === "task" && done && "text-success",
    (type === "occasion" || type === "birthday") &&
      "text-mid-gray first:text-primary"
  );

  const dateClasses = cn(
    "text-light-gray text-center",
    type === "task" && done && "text-success"
  );

  return (
    <div className={cardClasses}>
      {type === "task" && (
        <div
          className={cn(
            "absolute top-2 flex items-center justify-center",
            isRTL ? "right-2" : "left-2"
          )}
        >
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleTaskDone(id)}
            className="size-4 cursor-pointer accent-success"
          />
        </div>
      )}

      {isEditing ? (
        <>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-sm"
          />
          <Input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="text-sm"
          />
        </>
      ) : (
        <>
          <p
            className={cn(
              "font-medium text-center",
              type === "task" && "pe-5", // padding end for checkbox
              type === "task" && done && "line-through text-success"
            )}
          >
            {title}
          </p>
          <p className={dateClasses}>{date}</p>
        </>
      )}

      <div
        className={cn(
          "absolute top-2 flex gap-1",
          isRTL ? "left-2" : "right-2"
        )}
      >
        {isEditing ? (
          <>
            <Check
              className="size-4 text-success cursor-pointer"
              onClick={handleSave}
            />
            <X
              className="size-4 text-gray-400 hover:text-destructive cursor-pointer"
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <div className="bg-white flex items-center gap-x-1 px-2">
            <Pencil
              onClick={() => setIsEditing(true)}
              className="hidden group-hover:block size-4 text-gray-400 hover:text-primary cursor-pointer"
            />
            <Trash
              onClick={handleDelete}
              className="hidden group-hover:block size-4 text-gray-400 hover:text-destructive cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

type TaskCardProps = {
  id: string;
  title: string;
  date: string;
  rawDate: Date;
  done: boolean;
};

export const TaskCard = ({
  id,
  title,
  date,
  rawDate,
  done = false,
}: TaskCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDate, setNewDate] = useState(rawDate.toISOString().split("T")[0]);

  const { editTask, deleteTask, toggleTaskDone } = useEventsStore();

  const handleSave = () => {
    editTask(id, { title: newTitle, date: new Date(newDate), done });
    setIsEditing(false);
  };

  const cardClasses = cn(
    "group relative w-full p-2 pt-2.5 pb-2.5 rounded-xl text-sm bg-white",
    done ? "text-success" : "text-warning"
  );

  return (
    <div className={cardClasses}>
      <div
        className={cn(
          "flex items-center",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div className="ms-2">
          <Checkbox checked={done} onCheckedChange={() => toggleTaskDone(id)} />
        </div>

        {isEditing ? (
          <div className="flex-1">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-sm mb-1"
            />
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="text-sm"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center flex-1 overflow-hidden">
            <p
              className={cn(
                "font-medium overflow-hidden text-ellipsis truncate",
                done ? "text-success" : "text-warning",
                isRTL ? "text-end" : "text-start"
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "text-xs",
                done ? "text-success" : "text-warning",
                isRTL ? "text-start" : "text-end"
              )}
            >
              {date}
            </p>
          </div>
        )}

        <div
          className={cn(
            "absolute inset-y-0 flex gap-1",
            isRTL ? "left-2" : "right-2"
          )}
        >
          {isEditing ? (
            <>
              <Check
                className="size-4 text-success cursor-pointer"
                onClick={handleSave}
              />
              <X
                className="size-4 text-gray-400 hover:text-destructive cursor-pointer"
                onClick={() => setIsEditing(false)}
              />
            </>
          ) : (
            <div className="bg-white flex items-center gap-x-1 px-2">
              <Pencil
                onClick={() => setIsEditing(true)}
                className="hidden group-hover:block size-4 text-gray-400 hover:text-primary cursor-pointer"
              />
              <Trash
                onClick={() => deleteTask(id)}
                className="hidden group-hover:block size-4 text-gray-400 hover:text-destructive cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col items-center gap-3 mt-4">
    <Image
      src="/assets/illustrations/empty.png"
      width={60}
      height={60}
      alt="empty"
    />
    <Button
      onClick={onAdd}
      className="h-7 px-4 font-bold text-[.75rem]"
      size="sm"
      variant="outline"
    >
      أضف الآن
      <Plus className="size-4 ml-1" />
    </Button>
  </div>
);
