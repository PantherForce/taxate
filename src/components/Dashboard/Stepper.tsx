// @ts-nocheck

import React, { useState } from "react";
import {
  FaCogs,
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaDollarSign,
  FaGift,
  FaSearch,
} from "react-icons/fa";
import Integration from "../DashboardSteps/Integration";
import Overview from "../DashboardSteps/Overview";
import ReferAndEarn from "../DashboardSteps/ReferAndEarn";
import CsvUpload from "../DashboardSteps/CsvUpload";
import TransactionsContent from "./TransactionsContent";

interface Step {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { label: "Add Integration", value: "integrations", icon: <FaCogs /> },
  { label: "Overview", value: "overview", icon: <FaChartLine /> },
  { label: "Portfolio", value: "portfolio", icon: <FaWallet /> },
  { label: "Transactions", value: "transactions", icon: <FaExchangeAlt /> },
  { label: "Taxes", value: "taxes", icon: <FaDollarSign /> },
  { label: "Refer & Earn", value: "referEarn", icon: <FaGift /> },
  { label: "Xplore", value: "xplore", icon: <FaSearch /> },
];

const Stepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>("integrations");

  const handleStepClick = (stepValue: string) => {
    setActiveStep(stepValue);
  };

  const renderContent = () => {
    switch (activeStep) {
      case "integrations":
        return <Integration setActiveStep={setActiveStep} />;
      case "overview":
        return <CsvUpload setActiveStep={setActiveStep} />;
      case "portfolio":
        return <TransactionsContent />;
      case "transactions":
        return <div>transactions</div>;
      case "taxes":
        return <div>Taxes Content</div>;
      case "referEarn":
        return <ReferAndEarn />;
      case "xplore":
        return <div>Xplore Content</div>;
      default:
        return <div>Select a Step</div>;
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar with steps */}
      <div className="w-1/6 bg-gray-50 text-[#2D2D2D] py-4 h-screen px-2 space-y-4 border-r border-gray-300 sticky top-0 z-10">
        {steps.map((step) => (
          <div
            key={step.value}
            className={`cursor-pointer flex items-center space-x-4 w-full text-xl py-3 px-4 rounded-md transition-colors duration-200 ${
              activeStep === step.value
                ? "text-black bg-white"
                : "text-[#2D2D2D] bg-transparent"
            }`}
            onClick={() => handleStepClick(step.value)}
          >
            <span className="text-2xl">{step.icon}</span>
            <span className="flex-1">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-5/6 p-6">
        {/* Render content based on active step */}
        <div className="text-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Stepper;
