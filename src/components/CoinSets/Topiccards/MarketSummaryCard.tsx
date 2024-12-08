import React from "react";

const MarketSummaryCard = () => {
  // Mock data for market summary
  const marketSummary = {
    totalMarketCap: "$2.3 Trillion",
    btcDominance: "42%",
    topGainers: ["Bitcoin", "Ethereum", "Cardano"],
    topLosers: ["Shiba Inu", "Dogecoin", "Litecoin"],
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        Crypto Market Summary
      </h2>
      <p className="text-lg mb-2 text-gray-700">
        Market Cap: <strong>{marketSummary.totalMarketCap}</strong>
      </p>
      <p className="text-lg mb-2 text-gray-700">
        BTC Dominance: <strong>{marketSummary.btcDominance}</strong>
      </p>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Top Gainers</h3>
      <ul className="list-disc pl-5 text-gray-700">
        {marketSummary.topGainers.map((coin) => (
          <li key={coin}>{coin}</li>
        ))}
      </ul>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Top Losers</h3>
      <ul className="list-disc pl-5 text-gray-700">
        {marketSummary.topLosers.map((coin) => (
          <li key={coin}>{coin}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarketSummaryCard;
