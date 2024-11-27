// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";

// Define the structure of a tax strategy quiz question
interface TaxStrategyQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TaxStrategyChallenge: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<TaxStrategyQuestion[]>([
    {
      question:
        "What is the tax advantage of investing in a tax-deferred account?",
      options: [
        "Immediate tax deduction on contributions",
        "Tax-free growth of investments",
        "No tax on withdrawals",
        "Lower capital gains tax",
      ],
      correctAnswer: "Immediate tax deduction on contributions",
    },
    {
      question:
        "Which of the following is a tax strategy to minimize estate taxes?",
      options: [
        "Maximizing charitable contributions",
        "Tax-loss harvesting",
        "Making gifts during lifetime",
        "Using tax-deferred accounts",
      ],
      correctAnswer: "Making gifts during lifetime",
    },
    {
      question: "What is the primary purpose of a 1031 exchange?",
      options: [
        "Tax-free capital gains on primary residence",
        "Deferring capital gains tax on real estate investments",
        "Deducting business expenses on real estate",
        "Avoiding sales tax on real estate transactions",
      ],
      correctAnswer: "Deferring capital gains tax on real estate investments",
    },
    {
      question:
        "Which of the following is a tax-efficient strategy for long-term investment?",
      options: [
        "Frequent trading of stocks",
        "Holding investments for more than a year",
        "Investing only in bonds",
        "Investing in tax-exempt mutual funds",
      ],
      correctAnswer: "Holding investments for more than a year",
    },
    {
      question: "How can tax-loss harvesting reduce your taxable income?",
      options: [
        "By offsetting capital gains with capital losses",
        "By contributing to tax-deferred accounts",
        "By deducting property taxes",
        "By claiming a larger standard deduction",
      ],
      correctAnswer: "By offsetting capital gains with capital losses",
    },
    {
      question: "What is the benefit of contributing to a Roth IRA?",
      options: [
        "Tax-free withdrawals in retirement",
        "Tax deduction on contributions",
        "Tax deferral on capital gains",
        "Reduced income taxes in the current year",
      ],
      correctAnswer: "Tax-free withdrawals in retirement",
    },
    {
      question:
        "What is the maximum contribution limit to a 401(k) for individuals under 50 (2024)?",
      options: ["$19,500", "$22,500", "$26,000", "$30,000"],
      correctAnswer: "$22,500",
    },
    {
      question:
        "Which tax strategy is often used by high-income earners to reduce taxable income?",
      options: [
        "Maximizing contributions to tax-deferred accounts",
        "Buying real estate",
        "Investing in tax-free municipal bonds",
        "Engaging in tax-loss harvesting",
      ],
      correctAnswer: "Maximizing contributions to tax-deferred accounts",
    },
    {
      question:
        "How does the 'step-up in basis' rule help reduce taxes on inherited assets?",
      options: [
        "It allows the asset to be sold without any tax",
        "It resets the value of the asset to its fair market value at inheritance",
        "It eliminates capital gains tax on inherited assets",
        "It defers taxes on the asset indefinitely",
      ],
      correctAnswer:
        "It resets the value of the asset to its fair market value at inheritance",
    },
    {
      question:
        "What is the primary benefit of a Health Savings Account (HSA) in terms of tax strategy?",
      options: [
        "Tax-free withdrawals for medical expenses",
        "Tax deduction on contributions",
        "Tax-deferred growth of investments",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="relative flex justify-center items-center h-[60vh]">
      {/* Modal for quiz result */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-80 sm:w-96"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-4">
              Your score: {score}/{quizQuestions.length}
            </p>
            <motion.button
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
              onClick={closeModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Main quiz content */}
      <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-full sm:w-3/4 mx-auto z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {currentQuestion?.question}
        </h2>
        <div className="mb-4">
          {currentQuestion?.options.map((option, index) => (
            <motion.button
              key={index}
              className={`block w-full p-3 mb-2 rounded-lg ${
                selectedOption === option
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleOptionSelect(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="bg-secondary text-primary px-4 py-2 rounded-lg mt-4 hover:bg-primary hover:text-white transition-all"
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Question
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TaxStrategyChallenge;
