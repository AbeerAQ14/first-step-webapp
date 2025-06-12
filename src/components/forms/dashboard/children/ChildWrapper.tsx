"use client";

import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSignUpParentSchema,
  SignUpParentFormData,
} from "@/lib/validations/parent";
import { FormProvider } from "react-hook-form";
import { parentService } from "@/services/dashboardApi";
import Child from "./Child";

const ChildWrapper = ({
  initialValues,
  mode,
  branchId,
  childId,
}: {
  initialValues: any;
  mode: "add" | "edit" | "show";
  branchId?: string;
  childId?: string;
}) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("dashboard.center.children.form");
  const signUpParentSchema = createSignUpParentSchema(locale as "ar" | "en");

  const methods = useForm<SignUpParentFormData>({
    resolver: zodResolver(signUpParentSchema),
    defaultValues: {
      ...initialValues,
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    if (mode === "add") {
      parentService
        .addChild(data)
        .then(() => {
          toast.success(t("success.add"));
          router.push("/dashboard/parent/children");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else if (mode === "edit") {
      parentService
        .updateChild(childId!, data)
        .then(() => {
          toast.success(t("success.edit"));
          router.push("/dashboard/parent/children");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <Child
          initialValues={initialValues}
          mode={mode}
          onSubmit={onSubmit}
          childId={childId}
          isSubmitting={methods.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default ChildWrapper;
