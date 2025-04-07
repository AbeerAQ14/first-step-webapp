import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  locale?: string;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  locale = "en",
  className,
  ...rest
}) => {
  return (
    <div className="relative flex items-center">
      <span className="absolute ltr:left-3 rtl:right-3 text-gray-500">
        +966
      </span>
      <Input
        dir={locale === "ar" ? "rtl" : "ltr"}
        type="tel"
        className={`ltr:pr-0 ltr:pl-14 rtl:pl-0 rtl:pr-14 ${className || ""}`}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default PhoneInput;
