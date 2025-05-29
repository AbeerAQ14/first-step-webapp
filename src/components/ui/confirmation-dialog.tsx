"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  variant = "destructive",
}: ConfirmationDialogProps) {
  const t = useTranslations("common");

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:rtl:text-right">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-mid-gray">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-center">
          <Button variant="outline" onClick={onClose}>
            {cancelText || t("cancel")}
          </Button>
          <Button variant={variant} onClick={handleConfirm}>
            {confirmText || t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
