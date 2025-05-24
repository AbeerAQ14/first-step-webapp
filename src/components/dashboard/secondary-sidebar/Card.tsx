"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Pencil, Trash, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEventsStore } from "@/store/eventsStore";

type CardProps = {
  id: string;
  type: "occasion" | "birthday";
  title: string;
  date: string;
  rawDate: Date;
};

const Card = ({ id, type, title, date, rawDate }: CardProps) => {
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
  } = useEventsStore();

  const handleSave = () => {
    const updated = { title: newTitle, date: new Date(newDate) };

    if (type === "occasion") editOccasion(id, updated);
    else if (type === "birthday") editBirthday(id, updated);

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (type === "occasion") deleteOccasion(id);
    else if (type === "birthday") deleteBirthday(id);
  };

  const cardClasses = cn(
    "group relative w-full p-2 rounded-xl text-sm space-y-2 text-center",
    "text-mid-gray first:text-primary"
  );

  const dateClasses = "text-light-gray text-center";

  return (
    <div className={cardClasses}>
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
          <p className="font-medium text-center">{title}</p>
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

export default Card; 