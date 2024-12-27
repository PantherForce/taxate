import React, { useState } from "react";
import { FaPlay, FaQuestionCircle, FaPuzzlePiece } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion"; // Framer Motion
import QuizGame from "./QuizGame";
import PuzzleGame from "./PuzzleGame";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import TaxStrategyChallenge from "./TaxStrategyChallenge";

const gameData = [
  {
    title: "Crypto Tax Quiz",
    image: "/images/games/quiz.png", // Replace with actual image URL
    type: "quiz",
    id: 1,
    icon: <FaQuestionCircle size={30} />,
  },
  {
    title: "Tax Filing Puzzle",
    image: "/images/games/game-2.png", // Replace with actual image URL
    type: "puzzle",
    id: 2,
    icon: <FaPuzzlePiece size={30} />,
  },
  {
    title: "Tax Strategy Challenge",
    image: "/images/games/game-3.png", // Replace with actual image URL
    type: "strategy-quiz",
    id: 3,
    icon: <FaQuestionCircle size={30} />,
  },
];

const GameBoard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<null | string>(null);

  return (
    <ContentContainer>
      <div className="min-h-screen">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Crypto Tax Games
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameData.map((game) => (
            <motion.div
              key={game.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedGame(game.type)}
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
                  onClick={() => setSelectedGame(game.type)}
                >
                  <FaPlay /> <span>Play</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedGame === "quiz" && <QuizGame />}
        {selectedGame === "puzzle" && <PuzzleGame />}
        {selectedGame === "strategy-quiz" && <TaxStrategyChallenge />}
      </div>
    </ContentContainer>
  );
};

export default GameBoard;
