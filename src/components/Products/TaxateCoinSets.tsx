// @ts-nocheck

import React, { useState, useEffect } from "react";
import Button from "../Layout/Button/Button";
import JoinWishlistButton from "../Layout/Button/JoinWishlistButton";

const stepsData = [
  {
    id: 1,
    title: "Risk Profile Evaluation",
    description:
      "Taxate evaluates your risk profile to understand your investment preferences.",
    buttonText: null,
    additionalContent: null,
    animation: "animate__fadeIn",
  },
  {
    id: 2,
    title: "Integrate or Upload Data",
    description:
      "You can either integrate your existing platform API or upload a CSV file.",
    buttonText: "API Integration",
    animation: "animate__fadeIn",
  },
  {
    id: 3,
    title: "Coin Set Generation",
    description:
      "Based on your data, Taxate AI will generate the best Coin Set for your portfolio.",
    buttonText: null,
    additionalContent: (
      <div className="mt-8">
        <div className="animate__animated animate__pulse animate__infinite">
          <div className="w-16 h-16 border-4 border-dashed border-gray-600 rounded-full mx-auto"></div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Generating your personalized Coin Set...
        </p>
      </div>
    ),
    animation: "animate__fadeIn",
  },
  {
    id: 4,
    title: "Personalized Coin Set",
    description:
      "Taxate create a personalized Coin Set to meet your specific goals.",
    buttonText: "Create Personalized Basket",
    animation: "animate__fadeIn",
  },
];

const TaxateCoinSets: React.FC = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep === 4 ? 1 : prevStep + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPreviousStep = () => {
    setStep((prevStep) => (prevStep === 1 ? 4 : prevStep - 1));
  };

  const goToNextStep = () => {
    setStep((prevStep) => (prevStep === 4 ? 1 : prevStep + 1));
  };

  const currentStepData = stepsData.find((stepItem) => stepItem.id === step);

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg space-y-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Discover Taxate Coin Sets: Your Path to Smarter Crypto Investing
        </h1>
        <div className="space-y-8">
          <div className={`text-center ${currentStepData?.animation}`}>
            <h2 className="text-lg md:text-3xl font-bold text-gray-700">
              {currentStepData?.title}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-gray-600 mt-4">
              {currentStepData?.description}
            </p>
            {currentStepData?.additionalContent}
          </div>
        </div>
        <div className="flex justify-center">
        <JoinWishlistButton bgColor="" buttonText="Join the exclusive list!" />

        </div>
        <div className="flex justify-center space-x-3 mt-8">
          {stepsData.map((stepItem) => (
            <div
              key={stepItem.id}
              onClick={() => setStep(stepItem.id)}
              className={`w-4 h-4 rounded-full cursor-pointer ${
                step === stepItem.id ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxateCoinSets;
