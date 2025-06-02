import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { BranchAdminFormData, createAddBranchAdminSchema } from "@/lib/schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const BranchAdminForm = ({
  open,
  setOpen,
  onSubmit,
  branchName,
  disabled,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: BranchAdminFormData) => void;
  branchName: string;
  disabled?: boolean;
}) => {
  const t = useTranslations("dashboard.center.branches.admin");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">{t("title")}</DialogTitle>
        <DialogContent className="sm:max-w-[716px] lg:px-10">
          <Form onSubmit={onSubmit} branchName={branchName} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="pb-10">
        <DrawerTitle className="sr-only">{t("title")}</DrawerTitle>
        <Form
          onSubmit={onSubmit}
          className="px-4"
          branchName={branchName}
          disabled={disabled}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default BranchAdminForm;

const Form = ({
  className,
  onSubmit,
  branchName,
  disabled,
}: {
  className?: string;
  onSubmit: (data: BranchAdminFormData) => void;
  branchName: string;
  disabled?: boolean;
}) => {
  const t = useTranslations("dashboard.center.branches.admin");
  const [showPassword, setShowPassword] = useState(false);
  const locale = useLocale();

  const addBranchAdminSchema = createAddBranchAdminSchema(
    locale as "ar" | "en"
  );

  const methods = useForm<BranchAdminFormData>({
    resolver: zodResolver(addBranchAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/illustrations/check-mark.png"
          width={140}
          height={140}
          alt="check mark"
          className="select-none"
        />
        <p className="mt-4 font-medium text-success">
          {t("success", { branchName })}
        </p>
        <p className="mb-6 heading-4 font-bold text-primary">{t("title")}</p>
      </div>

      <FormProvider {...methods}>
        <form
          className={cn("grid sm:grid-cols-2 items-start gap-4", className)}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.name.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("form.name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.email.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("form.email.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.password.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("form.password.placeholder")}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 stroke-neutral-500 hover:stroke-neutral-600 duration-300"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-6 stroke-inherit" />
                      ) : (
                        <Eye className="size-6 stroke-inherit" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.password-confirm.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("form.password-confirm.placeholder")}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 stroke-neutral-500 hover:stroke-neutral-600 duration-300"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-6 stroke-inherit" />
                      ) : (
                        <Eye className="size-6 stroke-inherit" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"default"}
            size={"sm"}
            type="submit"
            className="mx-auto sm:col-span-2"
            disabled={disabled}
          >
            {disabled && <Loader2 className="size-4 animate-spin" />}
            {t("form.submit")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
