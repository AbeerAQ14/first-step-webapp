import { useState } from "react";
import { cn } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: any;
  inputDisabled?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  disabled,
  inputDisabled,
}: DatePickerProps) => {
  const [inputValue, setInputValue] = useState(
    value ? format(value, "yyyy-MM-dd") : ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Try different date formats
    const formats = ["yyyy-MM-dd", "dd/MM/yyyy", "MM/dd/yyyy", "dd-MM-yyyy"];
    let parsedDate: Date | undefined;

    for (const formatStr of formats) {
      const date = parse(newValue, formatStr, new Date());
      if (isValid(date)) {
        parsedDate = date;
        break;
      }
    }

    if (parsedDate) {
      onChange(parsedDate);
    } else if (newValue === "") {
      onChange(undefined);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    onChange(date);
    setInputValue(date ? format(date, "yyyy-MM-dd") : "");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <div className="relative">
            <Input
              className={cn(!value && "text-mid-gray")}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              disabled={inputDisabled}
            />
            <CalendarIcon
              className={`cursor-pointer absolute left-3 ltr:left-auto ltr:right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 ${
                inputDisabled ? "hidden" : ""
              }`}
            />
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className={`w-auto p-0 ${inputDisabled ? "hidden" : ""}`}
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleCalendarSelect}
          disabled={
            disabled ||
            ((date) => date > new Date() || date < new Date("1900-01-01"))
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
