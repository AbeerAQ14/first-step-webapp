import React from "react";
import clsx from "clsx";

interface Step {
  number: number;
  label: string;
  icon: React.ElementType;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="relative flex items-center justify-between w-full max-w-5xl mx-auto">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="relative flex flex-col items-center w-full"
        >
          {/* Connector Line */}
          {index !== 0 && (
            <div
              className={clsx(
                "-z-10 absolute translate-x-1/2 ltr:-translate-x-1/2 top-1/2 w-full h-[2px] transition-all",
                index < currentStep ? "w-full" : "w-0",
                step.number <= currentStep
                  ? "bg-[repeating-linear-gradient(to_right,#2B3990_0_24px,transparent_24px_48px)]"
                  : "bg-[repeating-linear-gradient(to_right,#cacaca_0_24px,transparent_24px_48px)]"
              )}
            ></div>
          )}

          {/* Step Number */}
          <div
            className={clsx(
              "size-10 sm:size-14 md:size-16 flex items-center justify-center border-2 rounded-full text-lg font-bold transition-all bg-white",
              step.number <= currentStep
                ? "border-primary text-primary"
                : "border-light-gray text-mid-gray"
            )}
          >
            {React.createElement(step.icon, {
              className: clsx(
                "h-6 sm:h-7 md:h-auto",
                step.number <= currentStep ? "fill-primary" : "fill-mid-gray"
              ),
            })}
          </div>

          {/* Step Label */}
          <p
            className={clsx(
              "text-sm md:text-base absolute top-[calc(100%+0.5rem)] w-fit max-w-44 font-bold transition-all text-center",
              step.number <= currentStep ? "text-primary" : "text-mid-gray"
            )}
          >
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
