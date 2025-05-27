"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNavigation from "@/components/forms/FormNavigation";
import StepIndicator from "@/components/forms/StepIndicator";
import ParentSignUp from "@/components/forms/parent/ParentSignUp";
import { Icons } from "@/components/general/icons";
import Step1ChildInfo from "@/components/forms/child/Step1";
import Step2ChronicDiseases from "@/components/forms/child/Step2";
import Step3Recommendations from "@/components/forms/child/Step3";
import Step4AuthorizedPersons from "@/components/forms/child/Step4";
import { createSignUpParentSchema, SignUpParentFormData } from "@/lib/schemas";
import { AlertCircle } from "lucide-react";

const SignUp = ({
  submitHandler,
  isLoading,
  formRef,
}: {
  submitHandler: (data: SignUpParentFormData) => void;
  isLoading: boolean;
  formRef: React.RefObject<UseFormReturn<SignUpParentFormData> | null>;
}) => {
  const t = useTranslations("auth.parent-signup");
  const tSteps = useTranslations("auth.add-child");
  const tFields = useTranslations("auth.parent-signup.fields");
  const locale = useLocale();

  const steps = [
    { number: 1, label: tSteps("1.title"), icon: Icons.one },
    { number: 2, label: tSteps("2.title"), icon: Icons.two },
    { number: 3, label: tSteps("3.title"), icon: Icons.three },
    {
      number: 4,
      label: tSteps("4.title"),
      icon: Icons.four,
    },
  ];

  const signUpParentSchema = createSignUpParentSchema(locale as "ar" | "en");

  const methods = useForm<SignUpParentFormData>({
    resolver: zodResolver(signUpParentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      national_number: "",
      address: "",
      childName: "",
      birthDate: undefined,
      fatherName: "",
      motherName: "",
      gender: undefined,
      kinship: "",
      chronicDiseases: {
        hasDiseases: "yes",
        diseases: [{ name: "", medication: "", procedures: "" }],
      },
      childDescription: "",
      favoriteThings: "",
      recommendations: "",
      allergies: {
        hasAllergies: "yes",
        allergies: [
          { allergyTypes: "", allergyFoods: "", allergyProcedures: "" },
        ],
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
          "password",
          "confirmPassword",
          "national_number",
          "address",
          "childName",
          "birthDate",
          "fatherName",
          "motherName",
          "gender",
          "kinship",
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
        return <Step3Recommendations />;
      case 4:
        return <Step4AuthorizedPersons />;
      default:
        return null;
    }
  };

  const onSubmit = (data: SignUpParentFormData) => {
    submitHandler(data);
  };

  // Attach the ref to the form provider
  useEffect(() => {
    if (formRef) {
      formRef.current = methods;
    }
  }, [methods, formRef]);

  return (
    <>
      <div className="flex flex-col items-center container mx-auto px-4">
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <div className="mb-10 space-y-9 ">
                <h1 className="heading-2 text-primary text-center">
                  {t("title")}
                </h1>
                <ParentSignUp />
              </div>
            )}

            <div className="p-5 sm:p-10 rounded-3xl border border-secondary-burgundy">
              <div className="w-full">
                <StepIndicator steps={steps} currentStep={currentStep} />
              </div>

              <div className="mt-40">{renderStep()}</div>

              {/* Localized validation errors summary */}
              {Object.keys(methods.formState.errors).length > 0 && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-lg my-6">
                  <div className="flex items-center gap-2 mb-3 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">{t("error.validation")}</p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-red-700">
                    {Object.entries(methods.formState.errors).map(
                      ([field, error]) => {
                        // Skip root level errors as they are handled separately
                        if (field === "root") return null;

                        // Handle nested fields (e.g., children.0.kinship)
                        let translationKey = field;
                        if (field.includes(".")) {
                          const parts = field.split(".");
                          // If it's a children array field (e.g. children.0.kinship)
                          if (
                            parts[0] === "children" &&
                            !isNaN(Number(parts[1]))
                          ) {
                            translationKey = `children.${parts[2]}`;
                          } else if (
                            parts[0] === "authorizedPersons" &&
                            !isNaN(Number(parts[1]))
                          ) {
                            translationKey = `authorizedPersons.${parts[2]}`;
                          } else {
                            // For other nested fields, just use the last part
                            translationKey = parts[parts.length - 1];
                          }
                        }

                        // Get the field label from translations
                        const fieldLabel = tFields(translationKey, {
                          default:
                            translationKey.charAt(0).toUpperCase() +
                            translationKey.slice(1).replace(/([A-Z])/g, " $1"),
                        });

                        // Get the error message
                        const errorMessage =
                          error?.message || t("error.general.field-required");

                        return (
                          <li key={field} className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>
                              <span className="font-medium">{fieldLabel}</span>
                              <span className="text-red-600 ms-1">
                                ({errorMessage})
                              </span>
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}

              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={goToPreviousStep}
                onNext={goToNextStep}
                isLoading={isLoading}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default SignUp;
