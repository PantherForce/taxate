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
import FileUpload from "./FileUpload";

interface Step {
  label: string;
  value: string;
  icon: React.ReactNode; // Add icon property to Step interface
}

const steps: Step[] = [
  { label: "Add Integration", value: "integrations", icon: <FaCogs /> }, // FaCogs for integrations
  { label: "Overview", value: "overview", icon: <FaChartLine /> }, // FaChartLine for overview
  { label: "Portfolio", value: "portfolio", icon: <FaWallet /> }, // FaWallet for portfolio
  { label: "Transactions", value: "transactions", icon: <FaExchangeAlt /> }, // FaExchangeAlt for transactions
  { label: "Taxes", value: "taxes", icon: <FaDollarSign /> }, // FaDollarSign for taxes
  { label: "Refer & Earn", value: "referEarn", icon: <FaGift /> }, // FaGift for refer & earn
  { label: "Xplore", value: "xplore", icon: <FaSearch /> }, // FaSearch for xplore
];

const Stepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>("integrations"); // Initial state set to "Integrations"

  const handleStepClick = (stepValue: string) => {
    setActiveStep(stepValue);
  };

  const renderContent = () => {
    switch (activeStep) {
      case "integrations":
        return (
          <div>
            <Integration />
          </div>
        );
      case "overview":
        return (
          <div>
            <FileUpload />
          </div>
        );
      case "portfolio":
        return <div>Portfolio Content</div>;
      case "transactions":
        return <div>Transactions Content</div>;
      case "taxes":
        return <div>Taxes Content</div>;
      case "referEarn":
        return (
          <div>
            <ReferAndEarn />
          </div>
        );
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
        <div className="text-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Stepper;
