"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BranchAdminFormData,
  BranchFormData,
  createBranchSchema,
} from "@/lib/schemas";
import Branch from "./Branch";
import BranchAdminForm from "./BranchAdminForm";

const BranchWrapper = ({
  initialValues,
  mode,
  branchId,
}: {
  initialValues?: BranchFormData;
  mode: "add" | "edit";
  branchId?: string;
}) => {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  const branchSchema = createBranchSchema(locale as "ar" | "en");

  const methods = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      // step1
      name: "",
      email: "",
      phone: "",
      neighborhood: "",
      nursery_name: "",
      nursery_type: [],
      address: "",
      city: "",
      location: "",
      services: [],
      additional_service: "",
      // step2
      accepted_ages: [],
      // additionalInfo: "",
      work_days_from: "",
      work_days_to: "",
      work_hours_from: "",
      work_hours_to: "",
      // step3
      emergency_contact: undefined,
      communication_methods: [],
      meals_and_periods: {
        provides_food: "yes",
        first_meals: [{ meal_name: "", juice: "", components: "" }],
        second_meals: [{ meal_name: "", juice: "", components: "" }],
        time_of_first_period: "",
        time_of_second_period: "",
      },
      // step4
      license_path: undefined,
      commercial_record_path: undefined,
      logo: undefined,
      comments: "",
    },
    mode: "onChange",
  });

  // onSubmitBranch function for each page (add - edit)
  const onSubmitBranch = (data: BranchFormData) => {
    console.log(data);
    setOpen(true);
  };

  const onSubmitAdmin = (data: BranchAdminFormData) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitBranch)}
          className="flex flex-col items-center space-y-8"
        >
          <Branch mode={mode} branchId={branchId} />
        </form>
      </FormProvider>

      {mode === "add" && (
        <BranchAdminForm
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmitAdmin}
        />
      )}
    </React.Fragment>
  );
};

export default BranchWrapper;
