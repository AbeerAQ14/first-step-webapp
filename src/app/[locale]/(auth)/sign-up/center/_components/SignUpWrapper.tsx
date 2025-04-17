"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/api";
import { SignUpCenterFormData } from "@/lib/schemas";
import { CenterRegisterPayload } from "@/types";
import { SignUp } from "./SignUp";
import LoadingOverlay from "@/components/forms/LoadingOverlay";

const SignUpWrapper = () => {
  const router = useRouter();
  const locale = useLocale();

  // --- Data Fetching & Mutation ---
  const mutation = useMutation<
    any, // Type of successful response from submitFormData
    Error, // Type of error thrown by submitFormData
    CenterRegisterPayload // Type of variable passed to mutate function (original form data)
  >({
    mutationFn: async (data: CenterRegisterPayload) => {
      return await authService.registerCenter(data);
    },
    onSuccess: (data) => {
      console.log("Submission successful:", data);

      router.push(`/${locale}/sign-in`);
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      alert(`Submission failed: ${error.message}`);
    },
  });

  useEffect(() => {
    router.prefetch(`/${locale}/sign-in`);
  }, []);

  const submitHandler = (data: SignUpCenterFormData) => {
    const expectedData = {
      logo: data.logo,
      license_path: data.license_path,
      commercial_record_path: data.commercial_record_path,
      name: data.name,
      email: data.email,
      password: data.password,
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

  return (
    <div>
      {mutation.isSuccess && (
        <LoadingOverlay
          content={`Welcome aboard! Let\u2019s get you signed in.`}
        />
      )}

      <SignUp submitHandler={submitHandler} isLoading={mutation.isPending} />
    </div>
  );
};

export default SignUpWrapper;
