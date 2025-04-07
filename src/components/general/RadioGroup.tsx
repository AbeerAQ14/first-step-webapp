import {
  RadioGroup as ShRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Utility for conditional class merging

interface RadioOption {
  value: string;
  label: string;
  labelClassName?: string; // Optional: allow customization of label text color
  selectedClassName?: string; // Optional: allow customization of selected state
}

interface RadioGroupProps {
  value: string;
  onChange: (val: string) => void;
  options: RadioOption[];
  className?: string;
}

export function RadioGroup({
  value,
  onChange,
  options,
  className,
}: RadioGroupProps) {
  return (
    <ShRadioGroup
      value={value}
      onValueChange={onChange}
      className={cn(
        "flex gap-8 justify-center rtl:flex-row-reverse",
        className
      )}
    >
      {options.map((option) => (
        <Label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer rtl:flex-row-reverse"
        >
          <RadioGroupItem value={option.value} className="peer sr-only" />
          <span
            className={cn(
              "w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all",
              value === option.value
                ? "border-secondary-mint-green"
                : "border-mid-gray"
            )}
          >
            {value === option.value && (
              <span className="w-3 h-3 bg-secondary-mint-green border-secondary-mint-green rounded-full"></span>
            )}
          </span>
          <span
            className={cn(
              value === option.value
                ? option.selectedClassName || "text-secondary-mint-green "
                : option.labelClassName || "text-mid-gray"
            )}
          >
            {option.label}
          </span>
        </Label>
      ))}
    </ShRadioGroup>
  );
}
