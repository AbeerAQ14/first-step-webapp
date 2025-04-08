"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormNavigation from "@/components/forms/FormNavigation";
import StepIndicator from "@/components/forms/StepIndicator";
import { Icons } from "@/components/general/icons";
import { createSignUpCenterSchema, SignUpCenterFormData } from "@/lib/schemas";
import { Step1BasicInfo } from "@/components/forms/center/Step1";
import { Step2AgesAndHours } from "@/components/forms/center/Step2";
import { Step3Communication } from "@/components/forms/center/Step3";
import { Step4Permits } from "@/components/forms/center/Step4";

export function SignUp() {
  const steps = [
    { number: 1, label: "المعلومات الأساسية", icon: Icons.one },
    { number: 2, label: "الأعمار المقبولة وساعات العمل", icon: Icons.two },
    {
      number: 3,
      label: "التواصل مع أولياء الأمور وتقديم الطعام",
      icon: Icons.three,
    },
    { number: 4, label: "التصريحات المطلوبة", icon: Icons.four },
  ];

  const signUpCenterSchema = createSignUpCenterSchema();

  const methods = useForm<SignUpCenterFormData>({
    resolver: zodResolver(signUpCenterSchema),
    defaultValues: {
      centerNameArabic: "",
      centerNameEnglish: "",
      email: "",
      phone: "",
      city: "",
      district: "",
      street: "",
      locationLink: "",
      branches: "",
      centerType: [],
      services: [],
      additionalServices: "",
      ageGroups: [],
      additionalInfo: "",
      workDays: {
        from: "",
        to: "",
      },
      workHours: {
        from: "",
        to: "",
      },
      emergencyContact: undefined,
      communicationMethods: [],
      foodService: "yes",
      meals: [
        {
          name: "",
          ingredients: "",
          drink: "",
        },
        {
          name: "",
          ingredients: "",
          drink: "",
        },
      ],
      businessLicense: undefined,
      commercialRegistration: undefined,
      comments: "",
    },
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const goToNextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isValid = await methods.trigger(fieldsToValidate as any);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 1:
        return [
          "centerNameArabic",
          "centerNameEnglish",
          "email",
          "phone",
          "city",
          "district",
          "street",
          "locationLink",
          "branches",
          "centerType",
          "services",
        ];
      case 2:
        return ["ageGroups", "workDays", "workHours"];
      case 3:
        return ["emergencyContact", "communicationMethods", "foodService"];
      case 4:
        return ["businessLicense", "commercialRegistration"];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2AgesAndHours />;
      case 3:
        return <Step3Communication />;
      case 4:
        return <Step4Permits />;
      default:
        return null;
    }
  };

  const onSubmit = (data: SignUpCenterFormData) => {
    console.log("Form submitted:", data);

    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4">
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <h1 className="mb-10 heading-2 text-primary text-center">
              إنشاء حساب مركز
            </h1>
          )}

          <div className="p-5 sm:p-10 rounded-3xl border border-secondary-burgundy">
            <div className="w-full">
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>

            <div className="mt-40">{renderStep()}</div>

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={goToPreviousStep}
              onNext={goToNextStep}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
