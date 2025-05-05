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
import { Eye, EyeOff } from "lucide-react";
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
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: BranchAdminFormData) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">إنشاء حساب مسئول الفرع</DialogTitle>
        <DialogContent className="sm:max-w-[716px] lg:px-10">
          <Form onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="pb-10">
        <DrawerTitle className="sr-only">إنشاء حساب مسئول الفرع</DrawerTitle>
        <Form onSubmit={onSubmit} className="px-4" />
      </DrawerContent>
    </Drawer>
  );
};

export default BranchAdminForm;

const Form = ({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit: (data: BranchAdminFormData) => void;
}) => {
  const t = useTranslations("auth.parent-signup.form");
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
          تم إنشاء فرع القصيم بنجاح
        </p>
        <p className="mb-6 heading-4 font-bold text-primary">
          إنشاء حساب مسئول الفرع
        </p>
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
                  {t("name.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("name.placeholder")}
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
                  {t("email.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("name.placeholder")}
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
                  {t("password.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("name.placeholder")}
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
                  {t("password-confirm.label")}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("name.placeholder")}
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
          >
            إنشاء حساب مسئول الفرع
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
