// @ts-nocheck


import React, { useState, useEffect } from "react";
import { FaPlay, FaQuestionCircle, FaPuzzlePiece, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import QuizGame from "./QuizGame";
import PuzzleGame from "./PuzzleGame";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import TaxStrategyChallenge from "./TaxStrategyChallenge";
import Signup from "../Singup/SignupModal"; // Import your Signup component

const gameData = [
  {
    title: "Crypto Tax Quiz",
    image: "/images/games/quiz.png",
    type: "quiz",
    id: 1,
    icon: <FaQuestionCircle size={30} />,
  },
  {
    title: "Tax Filing Puzzle",
    image: "/images/games/game-2.png",
    type: "puzzle",
    id: 2,
    icon: <FaPuzzlePiece size={30} />,
  },
  {
    title: "Tax Strategy Challenge",
    image: "/images/games/game-3.png",
    type: "strategy-quiz",
    id: 3,
    icon: <FaQuestionCircle size={30} />,
  },
];

const GameBoard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<null | string>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State for signup modal
  const [isPlayDisabled, setIsPlayDisabled] = useState(false);

  useEffect(() => {
    const score1 = localStorage.getItem("score1");
    setIsPlayDisabled(Boolean(score1));
  }, []);

  const handleGameSelection = (gameType: string) => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setIsSignupModalOpen(true); // Open signup modal if user_id is not present
    } else {
      setSelectedGame(gameType);
      setIsModalOpen(true); // Open game modal if user_id exists
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleSignupCompletion = () => {
    // Simulate signup and save user_id in local storage
    localStorage.setItem("user_id", "user123"); // Replace with actual user_id from backend
    setIsSignupModalOpen(false);
  };

  return (
    <ContentContainer>
      <div className="">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Crypto Tax Games
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameData.map((game) => (
            <motion.div
              key={game.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-64">
                <img
                  src={game.image}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="text-xl font-semibold text-primary flex items-center space-x-2">
                    {game.icon}
                    <span>{game.title}</span>
                  </div>
                </div>
                <button
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    isPlayDisabled
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-secondary transition-all"
                  }`}
                  onClick={() => !isPlayDisabled && handleGameSelection(game.type)}
                  disabled={isPlayDisabled}
                >
                  <FaPlay /> <span>{isPlayDisabled ? "Played" : "Play"}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-[90vw]">
              <button
                onClick={closeModal}
                className=" text-xl text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} color="red" />
              </button>
              <div className="modal-content">
                {selectedGame === "quiz" && <QuizGame />}
                {selectedGame === "puzzle" && <PuzzleGame />}
                {selectedGame === "strategy-quiz" && <TaxStrategyChallenge />}
              </div>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {isSignupModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl w-[90vw]">
              <button
                onClick={closeSignupModal}
                className=" text-xl text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} color="red" />
              </button>
              <Signup onComplete={handleSignupCompletion} />
            </div>
          </div>
        )}
      </div>
    </ContentContainer>
  );
};

export default GameBoard;
