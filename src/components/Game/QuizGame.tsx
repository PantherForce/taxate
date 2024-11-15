// @ts-nocheck

import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

// Define the structure of a quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizGame: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize GoogleGenerativeAI client with API Key
  const genAI = new GoogleGenerativeAI({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  // Model selection (e.g., gemini-1.5-flash)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Fetch quiz questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await model.generateText({
          prompt:
            "Generate a list of 5 quiz questions about cryptocurrency taxation in India. Include multiple choice answers for each question.",
          temperature: 0.7,
          maxOutputTokens: 300,
        });

        const questions = parseQuizResponse(response.text);
        setQuizQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const parseQuizResponse = (responseText: string) => {
    // A simple parser for demonstration purposes (you may need to improve this based on actual output)
    const questions = responseText
      .split("\n")
      .map((line, index) => {
        if (line.trim()) {
          const parts = line.split(";");
          return {
            question: parts[0],
            options: parts.slice(1, 5),
            correctAnswer: parts[5],
          };
        }
        return null;
      })
      .filter(Boolean);
    return questions;
  };

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

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
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

export default QuizGame;
