// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";  // Import Axios for making HTTP requests

// Define the structure of a quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizGame: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: "What is the tax rate on cryptocurrency transactions in India?",
      options: ["10%", "15%", "30%", "40%"],
      correctAnswer: "30%",
    },
    {
      question:
        "Which Indian government body regulates cryptocurrency taxation?",
      options: ["RBI", "SEBI", "CBDT", "NITI Aayog"],
      correctAnswer: "CBDT", // Central Board of Direct Taxes
    },
    {
      question: "What is the tax implication for crypto mining in India?",
      options: [
        "No tax",
        "Taxed as business income",
        "Taxed as capital gains",
        "Taxed as gifts",
      ],
      correctAnswer: "Taxed as business income",
    },
    {
      question:
        "Is the sale of cryptocurrency subject to Goods and Services Tax (GST) in India?",
      options: [
        "Yes",
        "No",
        "Only on transactions above ₹50,000",
        "Only on ICOs",
      ],
      correctAnswer: "Yes",
    },
    {
      question:
        "In which year did the Indian government officially impose a 30% tax on income from crypto assets?",
      options: ["2021", "2022", "2023", "2020"],
      correctAnswer: "2022",
    },
    {
      question: "How are cryptocurrency gifts taxed in India?",
      options: [
        "Exempt from tax",
        "Taxed as business income",
        "Taxed as capital gains",
        "Taxed as income from other sources",
      ],
      correctAnswer: "Taxed as income from other sources",
    },
    {
      question:
        "What is the tax rate on gifts of cryptocurrency above ₹50,000 in India?",
      options: ["10%", "20%", "30%", "40%"],
      correctAnswer: "30%",
    },
    {
      question:
        "What document is required to report crypto transactions for tax purposes in India?",
      options: ["PAN card", "Form 16", "Form 26AS", "Tax audit report"],
      correctAnswer: "Form 26AS", // This form tracks income and tax payments
    },
    {
      question:
        "What is the tax treatment of capital gains on cryptocurrency in India?",
      options: [
        "Short-term capital gains tax applies on assets held for less than 3 years",
        "Long-term capital gains tax applies on assets held for more than 1 year",
        "No tax on capital gains",
        "Taxed as income from other sources",
      ],
      correctAnswer:
        "Short-term capital gains tax applies on assets held for less than 3 years",
    },
    {
      question:
        "Can losses from crypto trading be set off against other income in India?",
      options: [
        "Yes",
        "No",
        "Only against salary income",
        "Only against capital gains",
      ],
      correctAnswer: "No",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);


  const user_id = window.localStorage.getItem("user_id" )

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
     
      submitScore();
      setShowModal(true);
    }
  };

  const submitScore = async () => {
    try {
      const response = await axios.post("https://testdata-bh0z.onrender.com/gamescore", {
        user_id: user_id,
        score: score,
      });
      console.log("Score submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="relative mx-auto flex justify-center items-center ">
      {/* Modal for quiz result */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-blackbg-opacity-50 flex justify-center items-center z-50"
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
              className="bg-primary text-white px-4 py-2 rounded-lg"
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
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="bg-secondary text-primary px-4 py-2 rounded-lg mt-4 :bg-primary hoverhover:text-white transition-all"
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

export default QuizGame;
