"use client";

import { z } from "zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Parents from "@/components/dashboard/notifications/Parents";
import type { Parent } from "@/components/tables/data/parents";
import NotificationForm from "@/components/dashboard/notifications/NotificationForm";

const notificationSchema = z.object({
  type: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  day: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  time: z
    .string({
      message: getErrorMessage("invalid-time", "ar"),
    })
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  recipients: z
    .array(z.any())
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
});

export type NotificationsFormData = z.infer<typeof notificationSchema>;

// Function to get filtered parents based on selection
const useFilteredParents = (
  selectedParents: Parent[],
  selectedChildMap: Record<number, string>
): Parent[] => {
  // If no parents are selected, return all parents with all children
  if (selectedParents.length === 0) {
    return selectedParents;
  }

  // Return selected parents with only the selected children (or all children if none selected for that parent)
  return selectedParents.map((parent) => {
    const selectedChildId = selectedChildMap[parent.id];

    // If no child is selected for this parent, return parent with all children
    if (!selectedChildId) {
      return parent;
    }

    // Return parent with only the selected child
    return {
      ...parent,
      childs: parent.childs.filter((child) => child.id === selectedChildId),
    };
  });
};

const NotificationsForm = () => {
  const [selectedParents, setSelectedParents] = useState<Parent[]>([]);
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});

  const methods = useForm<NotificationsFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      type: "",
      day: "",
      time: "",
      recipients: [],
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    const selectedWithOnlySelectedChild = useFilteredParents(
      selectedParents,
      selectedChildMap
    );

    // Update the hidden field value before validation
    methods.setValue("recipients", selectedWithOnlySelectedChild);

    const valid = await methods.trigger(); // re-validate with updated recipients
    if (!valid) return;

    const data = methods.getValues();

    const finalPayload = data;

    console.log("Final Payload", finalPayload);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent default submission
          onSubmit(); // our custom function
        }}
        className="flex flex-col items-center gap-y-6"
      >
        <div className="mb-2 w-full flex flex-col gap-y-6">
          <h1 className="heading-4 font-medium text-primary">
            جدولة الإشعارات
          </h1>

          <NotificationForm />
        </div>

        <div>
          <Parents
            selected={selectedParents}
            setSelected={setSelectedParents}
            selectedChildMap={selectedChildMap}
            setSelectedChildMap={setSelectedChildMap}
          />
        </div>

        <input type="hidden" {...methods.register("recipients")} />
        {methods.formState.errors.recipients && (
          <p className="text-sm text-red-500 text-center mt-2">
            {methods.formState.errors.recipients.message}
          </p>
        )}

        <Button size={"sm"} type="submit">
          إرسال الإشعار
        </Button>
      </form>
    </FormProvider>
  );
};

export default NotificationsForm;
