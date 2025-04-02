"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNavigation from "@/components/forms/FormNavigation";
import StepIndicator from "@/components/forms/StepIndicator";
import ParentSignUp from "@/components/forms/parent/ParentSignUp";
import { Icons } from "@/components/general/icons";
import { SignUpParentFormData, signUpParentSchema } from "@/lib/schemas";

const SignUp = () => {
  const steps = [
    { number: 1, label: "بيانات طفلك", icon: Icons.one },
    { number: 2, label: "الأمراض المزمنة والحساسية", icon: Icons.two },
    { number: 3, label: "التوصيات الخاصة بالطفل", icon: Icons.three },
    {
      number: 4,
      label: "الأشخاص المصرح لهم بإرسال أو استلام الأبناء",
      icon: Icons.four,
    },
  ];

  const methods = useForm<SignUpParentFormData>({
    resolver: zodResolver(signUpParentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      relation: "",
      password: "",
      confirmPassword: "",
      childName: "",
      birthDate: "",
      fatherName: "",
      motherName: "",
      gender: undefined,
      chronicDiseases: {
        hasDiseases: undefined,
        diseases: [],
      },
      childDescription: "",
      favoriteThings: "",
      recommendations: "",
      allergies: {
        hasAllergies: undefined,
        allergyTypes: "",
        allergyFoods: "",
        allergyProcedures: "",
      },
      authorizedPersons: [
        {
          name: "",
          idNumber: "",
        },
      ],
      comments: "",
    },
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const goToNextStep = async () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className="flex flex-col items-center container mx-auto px-4">
        <FormProvider {...methods}>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {currentStep === 1 && (
              <div className="mb-10 space-y-9 ">
                <h1 className="heading-2 text-primary text-center">
                  إنشاء حساب ولي أمر
                </h1>
                <ParentSignUp />
              </div>
            )}

            <div className="sm:p-10 rounded-3xl border border-secondary-burgundy">
              <div className="w-full">
                <StepIndicator steps={steps} currentStep={currentStep} />
              </div>

              <div className="mt-40"></div>

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
    </>
  );
};

export default SignUp;
