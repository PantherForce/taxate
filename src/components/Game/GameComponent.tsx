import React, { useState } from "react";
import { FaPlay, FaQuestionCircle, FaPuzzlePiece, FaTimes } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion"; // Framer Motion
import QuizGame from "./QuizGame";
import PuzzleGame from "./PuzzleGame";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import TaxStrategyChallenge from "./TaxStrategyChallenge";

// Game Data
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Function to handle game selection
  const handleGameSelection = (gameType: string) => {
    setSelectedGame(gameType);
    setIsModalOpen(true); // Open modal when game is selected
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null); // Reset selected game when modal closes
  };

  return (
    <ContentContainer>
      <div className="">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Crypto Tax Games
        </h1>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameData.map((game) => (
            <motion.div
              key={game.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
              onClick={() => handleGameSelection(game.type)}
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
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-all"
                  onClick={() => handleGameSelection(game.type)}
                >
                  <FaPlay /> <span>Play</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for displaying selected game */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-[90vw]">
              <button
                onClick={closeModal}
                className=" text-xl text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} color="red"/>
              </button>
              <div className="modal-content">
          
                {selectedGame === "quiz" && <QuizGame />}
                {selectedGame === "puzzle" && <PuzzleGame />}
                {selectedGame === "strategy-quiz" && <TaxStrategyChallenge />}
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentContainer>
  );
};

export default GameBoard;
