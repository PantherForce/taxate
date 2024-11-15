import React from 'react';

interface AlphabetFilterProps {
  onSelectLetter: (letter: string | null) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({ onSelectLetter }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter: string) => {
    onSelectLetter(letter);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Filter by Alphabet</h2>
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className="px-4 py-2 text-lg font-semibold rounded-full bg-white border border-gray-300 hover:bg-blue-100 transition duration-200"
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
        <button
          className="px-4 py-2 text-lg font-semibold rounded-full bg-white border border-gray-300 hover:bg-blue-100 transition duration-200"
          onClick={() => handleLetterClick(null)}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default AlphabetFilter;
