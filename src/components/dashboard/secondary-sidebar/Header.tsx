import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthUser } from "@/store/authStore";

export default function SidebarHeader() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const user = useAuthUser();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the date like "Tue, 15 Apr"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // Format the time like "01:36 PM"
  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex justify-between gap-x-4 text-primary font-semibold">
      <div className="grow">
        <div className="font-bold text-primary">{formattedDate}</div>
        <div className="font-medium text-primary">{formattedTime}</div>
      </div>

      <div className="grow">
        <Select value={user?.name} defaultValue={user?.name}>
          <SelectTrigger className="border-primary text-primary text-[.7rem] p-1 shrink">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {user?.name && (
              <SelectItem key={user?.name} value={user?.name}>
                {user?.name}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
