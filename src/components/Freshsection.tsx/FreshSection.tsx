// src/App.tsx
import React, { useState } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Heading from "../Layout/Heading/Heading";

type ContentSection = {
  title: string;
  heading: string;
  description: string;
  image: string;
  bullets: string[]; // New property for bullet points
};

const contentData: ContentSection[] = [
  {
    title: "Blockchain-Backed Tax Reporting",
    heading: "Transparent & Secure Tax Reports",
    description:
      "Every tax report you generate is securely recorded on the blockchain, ensuring full transparency and traceability of your financial actions.",
    image: "/images/Features/Blockchain 1.png",
    bullets: [
      "Immutable records for tax transactions.",
      "Enhanced transparency in reporting.",
    ],
  },
  {
    title: "Earn & Spend with Native Tokens",
    heading: "Rewarding Every Transaction",
    description:
      "Pay for reports or premium services with Taxate's native token and earn rewards for every transaction. Your payments bring extra value!",
    image: "/images/Features/Audit.png",
    bullets: [
      "Earn rewards with every transaction.",
      "Exclusive discounts using native tokens.",
    ],
  },
  {
    title: "Real-Time Tax Credits",
    heading: "Earn Tax Credits Instantly",
    description:
      "Gain tax credits based on your crypto activities or asset holdings. Use them to reduce future tax liabilities or redeem for platform rewards.",
    image: "/images/Features/Chasing Money 2.png",
    bullets: [
      "Instant credit accrual based on crypto assets.",
      "Redeem credits to offset future taxes.",
    ],
  },
];

const Freshsection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50">
      <ContentContainer>
        <Heading fontSize="xl" className="font-bold text-center">
          Why us? What makes us the better option?
        </Heading>
      </ContentContainer>

      <div className="flex flex-col md:flex-row space-y-6 space-x-4 mb-8">
        {contentData.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 text-xl py-3 rounded-md ${
              activeTab === index
                ? "bg-primary text-white"
                : "bg-[#F4F1E6] text-black"
            } transition-colors duration-300`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Main content section */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <img
              src={contentData[activeTab].image}
              alt={contentData[activeTab].title}
              className="w-full h-auto"
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {contentData[activeTab].heading}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {contentData[activeTab].description}
            </p>
            <ul className="list-disc list-inside text-gray-700">
              {contentData[activeTab].bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freshsection;
