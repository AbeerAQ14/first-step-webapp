"use client";

import { z } from "zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Parent } from "@/components/tables/data/parents";
import Parents from "@/components/dashboard/notifications/Parents";

const reportsSchema = z.object({
  activities: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  behavior: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  meals: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  napTime: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  additionalNotes: z
    .string()
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
  recipients: z
    .array(z.any())
    .min(1, { message: getErrorMessage("general-field-required", "ar") }),
});

export type ReportsFormData = z.infer<typeof reportsSchema>;

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

const ReportsForm = () => {
  const [selectedParents, setSelectedParents] = useState<Parent[]>([]);
  const [selectedChildMap, setSelectedChildMap] = useState<
    Record<number, string>
  >({});

  const methods = useForm<ReportsFormData>({
    resolver: zodResolver(reportsSchema),
    defaultValues: {
      activities: "",
      behavior: "",
      meals: "",
      napTime: "",
      additionalNotes: "",
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

export default ReportsForm;
