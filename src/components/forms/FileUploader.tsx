"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, X } from "lucide-react";

interface FileUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
}

export function FileUploader({
  value,
  onChange,
  accept,
  disabled,
}: FileUploaderProps) {
  const t = useTranslations("auth.center-signup.4.form");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(file);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
  };

  return (
    <div className="flex items-center justify-between border rounded-md">
      {value ? (
        <div className="flex items-center justify-between w-full px-6 py-6 h-9">
          <span className="text-sm truncate max-w-[200px]">{value.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="h-8 w-8 p-0"
            disabled={disabled}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-between w-full px-6 py-6 h-9 gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
          >
            <PaperclipIcon className="h-4 w-4" />
            <span>{t("file-placeholder")}</span>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept={accept}
            />
          </label>
        </div>
      )}
    </div>
  );
}
