"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNavigation from "@/components/forms/FormNavigation";
import StepIndicator from "@/components/forms/StepIndicator";
import ParentSignUp from "@/components/forms/parent/ParentSignUp";
import { Icons } from "@/components/general/icons";
import { SignUpParentFormData, signUpParentSchema } from "@/lib/schemas";
import Step1ChildInfo from "@/components/forms/child/Step1";
import Step2ChronicDiseases from "@/components/forms/child/Step2";

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
      birthDate: undefined,
      fatherName: "",
      motherName: "",
      gender: undefined,
      chronicDiseases: {
        hasDiseases: "yes",
        diseases: [{ name: "", medication: "", procedures: "" }],
      },
      childDescription: "",
      favoriteThings: "",
      recommendations: "",
      allergies: {
        hasAllergies: "yes",
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
          "name",
          "phone",
          "email",
          "relation",
          "password",
          "confirmPassword",
          "childName",
          "birthDate",
          "fatherName",
          "motherName",
          "gender",
        ];
      case 2:
        return ["chronicDiseases", "allergies"];
      case 3:
        return ["childDescription", "favoriteThings", "recommendations"];
      case 4:
        return ["authorizedPersons"];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ChildInfo />;
      case 2:
        return <Step2ChronicDiseases />;
      case 3:
        return <div></div>;
      case 4:
        return <div></div>;
      default:
        return null;
    }
  };

  const onSubmit = (data: SignUpParentFormData) => {
    console.log("Form submitted:", data);

    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="flex flex-col items-center container mx-auto px-4">
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <div className="mb-10 space-y-9 ">
                <h1 className="heading-2 text-primary text-center">
                  إنشاء حساب ولي أمر
                </h1>
                <ParentSignUp />
              </div>
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
    </>
  );
};

export default SignUp;
