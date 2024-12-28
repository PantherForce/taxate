// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion

const puzzleClues = [
  { clue: "What is the tax rate for long-term capital gains?", answer: "20%" },
  { clue: "What is the tax rate on staking rewards?", answer: "Income tax" },
  { clue: "Are crypto airdrops taxed?", answer: "Yes" },
];

const PuzzleGame: React.FC = () => {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  const currentClue = puzzleClues[currentClueIndex];

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === currentClue.answer.toLowerCase()) {
      setScore(score + 1);
    }
    setUserAnswer("");
    if (currentClueIndex < puzzleClues.length - 1) {
      setCurrentClueIndex(currentClueIndex + 1);
    } else {
      alert(`Puzzle completed! Your score: ${score}/${puzzleClues.length}`);
      setCurrentClueIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-lg w-full mt-16 sm:w-3/4 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Puzzle Clue #{currentClueIndex + 1}
      </h2>
      <p className="mb-4 text-lg">{currentClue.clue}</p>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <motion.button
        className="bg-primary text-white px-4 py-2 rounded-lg mt-4 hover:bg-secondary transition-all"
        onClick={handleSubmit}
        disabled={!userAnswer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit Answer
      </motion.button>
    </div>
  );
};

export default PuzzleGame;
