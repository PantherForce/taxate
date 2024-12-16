import React from "react";
import { Helmet } from "react-helmet";

const AnalysisCard = [
  {
    icon: "/images/Baskets/1.png",
    title: "AI-Powered Trading Insights",
    description:
      "Analyzes trading patterns, profitability, and performance strategies using AI-generated summaries.",
  },
  {
    icon: "/images/Baskets/2.png",
    title: "Mistake Detection",
    description:
      "Identifies risky trading behaviors (e.g., over-leveraging, excessive risk exposure) and suggests actionable steps to improve strategy.",
  },
  {
    icon: "/images/Baskets/3.png",
    title: "Visual Data Representation",
    description:
      "Visualize key trends with charts (profit/loss pie charts and bar graphs) for easier understanding of trading history and patterns.",
  },
];


const AnalysisCards: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Taxate Analytics | AI-Powered Trading Analytics Dashboard</title>
        <meta
          name="description"
          content="Discover how Taxate's AI-powered Coin Sets can simplify crypto tax management. Learn about risk evaluation, data integration, and coin set generation."
        />
        <meta
          name="keywords"
          content="crypto tax, cryptocurrency accounting, coin sets, risk profile evaluation, taxate, portfolio management, crypto tax software"
        />
        <meta name="author" content="Taxate" />
        <link rel="canonical" href="https://www.taxate.in/coin-sets" />
      </Helmet>

      <section className="bg-white py-12 px-6">
        <h2 className="text-lg md:text-4xl font-bold text-center mb-10">
          Why Taxate Analytics?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          {AnalysisCard.map((item, index) => (
            <div
              key={index}
              className="bg-primary rounded-lg shadow-lg p-6 flex flex-col items-center max-w-sm w-full"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-xl text-white font-semibold mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center text-white">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AnalysisCards;
