import React from "react";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { motion } from "framer-motion";

const features = [
  {
    title: "800+ Integrations",
    description:
      "Taxate integrates with 800+ crypto platforms including 350+ exchanges, 90+ wallets, 150+ blockchains. Plus support for thousands of coins and tokens.",
    color: "border-primary",
    icon: "💡",
  },
  {
    title: "Value for Money",
    description:
      "Taxate gives you more for less, with a generous free plan that imports 10,000 transactions, supports 800+ integrations, and provides a free preview of your taxable crypto gains.",
    color: "border-primary",
    icon: "💰",
  },
  {
    title: "Free Portfolio Tracker",
    description:
      "Enhance your cryptocurrency portfolio performance by keeping track of your real-time realized and unrealized profits and losses with Taxate.",
    color: "border-primary",
    icon: "💼",
  },
  {
    title: "Support",
    description:
      "Taxate stands out as the highest-rated crypto tax software on Trustpilot, thanks to our unbeatable combination of exceptional product features and legendary user support.",
    color: "border-primary",
    icon: "⭐",
  },
];

const KoinlyFeatures: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex bg-[#F4F1E6] h-auto flex-col items-center w-full py-16">
        <Heading fontSize="xl" className="font-bold mb-4 text-center">
          Taxate, the crypto tax calculator India needs
        </Heading>
    
        <Text
          fontSize="lg"
          className="text-gray-600 mb-8 text-center max-w-5xl px-4"
        >
          Don't waste time and money with crypto tax calculators that are
          expensive and complicated. Choose India's free crypto tax calculator
          and simplify the process!
        </Text>

        <div className="flex flex-wrap justify-center p-3 gap-12 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-start border-2 border-black border-t-4 ${feature.color} rounded-lg shadow-lg p-6 w-full sm:w-4/12 md:w-1/4 xl:w-1/5`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-row items-center gap-4 mb-4">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default KoinlyFeatures;
