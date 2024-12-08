import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RiskProfileCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0); // Points will drive the speedometer

  const questions = [
    "Are you willing to take significant risks for the possibility of high returns?",
    "How do you react to market volatility?",
    "Do you have experience in managing investments in high-risk assets?",
    "Are you comfortable with losing a portion of your investment in the short term?",
    "How long is your investment horizon?",
  ];

  const options = [
    ["Yes", "No"],
    ["I get worried", "I stay calm"],
    ["Yes", "No"],
    ["Yes", "No"],
    ["More than 10 years", "Less than 5 years"],
  ];

  const handleAnswer = (answerIndex: number) => {
    // Update the answers array by adding the new answer
    setAnswers([...answers, answerIndex]);

    // Move to the next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    const score = answers.reduce((total, answer) => total + answer, 0);
    setPoints(score);

    if (score <= 5) {
      setRiskLevel("Low Risk");
    } else if (score <= 10) {
      setRiskLevel("Medium Risk");
    } else {
      setRiskLevel("High Risk");
    }
  };

  const getColor = () => {
    if (riskLevel === "Low Risk") return "bg-green-500"; // Low Risk
    if (riskLevel === "Medium Risk") return "bg-yellow-500"; // Medium Risk
    return "bg-red-500"; // High Risk
  };

  const getMarketCondition = () => {
    if (riskLevel === "Low Risk")
      return "You prefer stability and low volatility.";
    if (riskLevel === "Medium Risk")
      return "You can tolerate some fluctuations in exchange for moderate returns.";
    return "You seek high returns and are comfortable with significant volatility.";
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <h2 className="text-2xl text-center font-semibold mb-3 text-gray-800">
        Calculate Risk Profile
      </h2>

      {/* Initial text describing risk profile */}
      {!riskLevel && (
        <div className="text-left">
          <p className="text-gray-700 text-lg font-normal mb-4">
            Risk profiling helps you understand your investment preferences and
            risk tolerance. This tool will guide you through a series of
            questions to determine whether you're more comfortable with
            conservative, balanced, or aggressive investment strategies.
          </p>
          <p className="text-gray-700 mb-4">
            Answer the questions below to determine your risk profile.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 mt-3 bg-primary text-white rounded-md"
          >
            Start Assessment
          </button>
        </div>
      )}

      {/* Risk level content after submission */}
      {riskLevel && (
        <>
          <div className="relative flex justify-center items-center">
            <div className="w-32 h-32 rounded-full border-4 border-gray-200 relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div
                  className={`${getColor()} w-24 h-24 rounded-full`}
                  style={{
                    clipPath: `polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%)`,
                    transform: `rotate(${points * 1.8 - 90}deg)`, // Rotate the meter based on score
                    transition: "transform 0.5s ease-in-out", // Smooth transition
                  }}
                />
              </div>
            </div>
            <div className="absolute text-center text-xl font-semibold text-gray-800">
              {riskLevel}
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-center items-center">
            <p className="text-lg md:text-lg text-gray-700">
              Your Risk Profile: <strong>{riskLevel}</strong>
            </p>
            <p className="mt-4 text-sm text-center md:text-lg text-gray-500">
              {getMarketCondition()}
            </p>

            {/* Speedometer (Circular Progress Bar) */}
          </div>
        </>
      )}

      {/* Modal for answering questions */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 mx-auto max-w-5xl relative">
            <div className="flex flex-row justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Risk Profile Assessment
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 p-2 text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <p className="mb-4 text-gray-700">{questions[currentQuestion]}</p>

            <div className="flex space-x-4 mb-4">
              {options[currentQuestion].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-6 py-3 bg-primary text-white rounded-md"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 && (
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-primary text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskProfileCard;
