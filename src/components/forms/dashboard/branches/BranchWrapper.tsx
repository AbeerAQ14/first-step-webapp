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
import { useMutation } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";

const BranchWrapper = ({
  initialValues,
  mode,
}: {
  initialValues?: BranchFormData;
  mode: "add" | "edit";
}) => {
  const [branchId, setBranchId] = useState(null);
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

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await centerService.createBranch(data);
    },
    onSuccess: (data) => {
      console.log("Branch created successfully", data);
      setBranchId(data.id);
      setOpen(true);
    },
    onError: (error: any) => {
      console.error("Branch creation failed", error);
      // You can show a toast or set form error here
    },
  });

  const branchMutation = useMutation({
    mutationFn: async (data: any) => {
      return await centerService.assignBranch(branchId!, data);
    },
    onSuccess: (data) => {
      console.log("Branch created successfully", data);
      setOpen(true);
    },
    onError: (error: any) => {
      console.error("Branch creation failed", error);
      // You can show a toast or set form error here
    },
  });

  // onSubmitBranch function for each page (add - edit)
  const onSubmitBranch = (data: BranchFormData) => {
    const expectedData = {
      logo: data.logo,
      license_path: data.license_path,
      commercial_record_path: data.commercial_record_path,
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      comments: data.comments,

      nursery_type: data.nursery_type,
      additional_service: data.additional_service,
      work_days_from: data.work_days_from,
      work_days_to: data.work_days_to,

      work_hours_from: data.work_hours_from,
      work_hours_to: data.work_hours_to,
      time_of_first_period: data.meals_and_periods.time_of_first_period,
      time_of_second_period: data.meals_and_periods.time_of_second_period,

      first_meals: data.meals_and_periods.first_meals,
      second_meals: data.meals_and_periods.second_meals,

      emergency_contact: data.emergency_contact === "yes",
      special_needs: data.accepted_ages.includes("disabled"),

      nursery_name: data.nursery_name,
      location: data.location,
      city: data.city,
      neighborhood: data.neighborhood,

      services: data.services,
      communication_methods: data.communication_methods,

      provides_food: data.meals_and_periods.provides_food === "yes",

      accepted_ages: data.accepted_ages,

      pricing: [
        {
          enrollment_type: "daily",
          response_speed: "normal",
          price_amount: 100,
        },
        {
          enrollment_type: "daily",
          response_speed: "emergency",
          price_amount: 120,
        },
        {
          enrollment_type: "monthly",
          response_speed: "normal",
          price_amount: 1200,
        },
        {
          enrollment_type: "monthly",
          response_speed: "emergency",
          price_amount: 1400,
        },
        {
          enrollment_type: "6_months",
          response_speed: "normal",
          price_amount: 6500,
        },
        {
          enrollment_type: "hourly",
          response_speed: "normal",
          price_amount: 30,
        },
      ],
    };

    mutation.mutate(expectedData);
  };

  const onSubmitAdmin = (data: BranchAdminFormData) => {
    branchMutation.mutate(data);
  };

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitBranch)}
          className="flex flex-col items-center space-y-8"
        >
          <Branch mode={mode} isSubmitting={mutation.isPending} />
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
