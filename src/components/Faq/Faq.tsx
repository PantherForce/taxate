import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import { FaBuildingCircleCheck, FaCoins } from "react-icons/fa6";

interface FAQData {
  question: string;
  answer: string;
}

const faqData: FAQData[] = [
  {
    question: "What is the tax rate on cryptocurrency gains in India?",
    answer:
      "In India, cryptocurrency gains are taxed at a flat rate of 30%, irrespective of the individual's income tax slab. This rate applies to all types of crypto transactions.",
  },
  {
    question: "Is there a tax deduction on cryptocurrency losses in India?",
    answer:
      "No, losses from cryptocurrency transactions cannot be set off against other income or carry forward to subsequent years. The tax law in India does not allow deductions for crypto losses.",
  },
  {
    question: "Do I need to pay tax on each cryptocurrency transaction?",
    answer:
      "Yes, every transaction involving cryptocurrency, such as buying, selling, or exchanging, incurs a 1% TDS (Tax Deducted at Source) if it exceeds INR 10,000 in a financial year.",
  },
  {
    question: "How is tax calculated on cryptocurrency earnings in India?",
    answer:
      "The tax is calculated based on the difference between the purchase price and sale price of the cryptocurrency. All gains are taxed at 30%, and no exemptions apply.",
  },
  {
    question: "What is TDS, and how does it apply to cryptocurrency?",
    answer:
      "TDS stands for Tax Deducted at Source, and in India, a 1% TDS is applicable on all cryptocurrency transactions above INR 10,000 per year. This tax is deducted before the transaction is completed.",
  },
];

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8">
      <div className="text-center flex justify-center items-center">
        <Heading
          fontSize="xl"
          fontColor="text-gray-900"
          className="text-center mb-4 font-bold"
        >
          Your Frequently Asked Questions
        </Heading>
      </div>
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          className="p-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex items-center space-x-3">
              <FaCoins className="text-primary" />
              <Heading className="font-normal" fontSize="lg" fontColor="text-black">
                {faq.question}
              </Heading>
            </div>
            <div className="text-gray-600">
              {expandedIndex === index ? (
                <FaChevronUp className="w-6 h-6" />
              ) : (
                <FaChevronDown className="w-6 h-6" />
              )}
            </div>
          </div>

          {expandedIndex === index && (
            <motion.div
              className="mt-4"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Text fontSize="xl" fontColor="text-[#2A3D3B]" className="mt-4">
                <p>{faq.answer}</p>
              </Text>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FAQ;
