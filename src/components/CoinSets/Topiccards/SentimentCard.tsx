import React, { useEffect, useState } from "react";

const SentimentCard = () => {
  const [sentiment, setSentiment] = useState("Bullish");
  const [points, setPoints] = useState(80); // Points range from 0 to 100

  useEffect(() => {
    setTimeout(() => {
      setSentiment("Neutral");
      setPoints(50); // Set points dynamically (between 0 and 100)
    }, 3000);
  }, []);

  const getColor = () => {
    if (points <= 30) return "text-red-500"; // Bearish
    if (points <= 70) return "text-yellow-500"; // Neutral
    return "text-green-500"; // Bullish
  };

  const getMarketCondition = () => {
    if (points <= 30) return "Bearish - Market showing signs of fear.";
    if (points <= 70) return "Neutral - Market in balance.";
    return "Bullish - Market showing signs of greed.";
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <h2 className="text-2xl text-center font-semibold mb-3 text-gray-800">
        Live Market Sentiment
      </h2>

      <div className="relative flex justify-center items-center mb-4">
        <div className="w-32 h-32 rounded-full border-4 border-gray-200 relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className={`w-24 h-24 rounded-full ${getColor()}`}
              style={{
                clipPath: `polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%)`,
                transform: `rotate(${points * 1.8 - 90}deg)`,
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
        <div className="absolute text-center text-xl font-semibold text-gray-800">
          {sentiment}
        </div>
      </div>

      <p className="text-lg text-center font-medium mb-2 text-gray-600">
        {getMarketCondition()}
      </p>

      <div className="mt-4">
        <p className="text-sm text-center text-gray-500">
          {sentiment === "Bullish"
            ? "The market is showing positive trends. Investors are optimistic."
            : sentiment === "Bearish"
            ? "The market is underperforming. There's cautious or negative sentiment."
            : "The market is neutral. Wait for clearer signals."}
        </p>
      </div>
    </div>
  );
};

export default SentimentCard;
