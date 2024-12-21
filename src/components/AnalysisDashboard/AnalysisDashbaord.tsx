// @ts-nocheck

import React, { useEffect, useState } from "react";
import { fetchTradingData } from "../../services/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingSpinner from "../Loader/LoadingSpinner";

const genAI = new GoogleGenerativeAI("AIzaSyDT0F0VNnq_8NfeSTwU43txF9henjAaSdU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Navbar from "../Navbar/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type TradingHistoryItem = {
  trade_id: string;
  asset: string;
  trade_type: string;
  entry_price: number;
  exit_price: number;
  profit_loss: number;
  date_time: string;
};

type PortfolioItem = {
  asset: string;
  entry_price: number;
  current_price: number;
  leverage: number;
  quantity: number;
  unrealized_profit_loss: number;
};

type DashboardResponse = {
  user_id: string;
  trading_history: TradingHistoryItem[];
  trading_patterns: {
    average_trade_duration: number;
    average_leverage: number;
    most_profitable_trade_type: string;
  };
  portfolio: {
    current_balance: number;
    initial_balance: number;
    open_positions: PortfolioItem[];
  };
};

const AnalysisDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAISummary] = useState<string>("");
  const [mistakesSummary, setMistakesSummary] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"pie" | "bar" | "table">("table");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTradingData();
        setData(result);
        await generateAISummary(result.trading_history);
        await analyzeMistakes(result.trading_history);
      } catch (error) {
        setError("Failed to fetch trading data");
      }
    };

    fetchData();
  }, []);

  const analyzeMistakes = async (tradingHistory: TradingHistoryItem[]) => {
    if (!tradingHistory || tradingHistory.length === 0) return;

    const prompt = `
    Analyze the following trading history and identify mistakes or patterns indicating risky behavior, such as over-leveraging, asset concentration, high frequency of loss trades, or excessive risk exposure. Summarize in 100 words with 3 concise bullet points:
    
    Total trades: ${tradingHistory.length}.
    Profitable trades: ${
      tradingHistory.filter((trade) => trade.profit_loss > 0).length
    }.
    Loss trades: ${
      tradingHistory.filter((trade) => trade.profit_loss < 0).length
    }.
    Total profit/loss: ${tradingHistory.reduce(
      (sum, trade) => sum + trade.profit_loss,
      0
    )}.
    Suggest specific actions or strategies to improve trading behavior.
  `;

    try {
      const result = await model.generateContent(prompt);
      setMistakesSummary(result.response.text());
    } catch (error) {
      console.error(
        "Error generating AI insights for mistakes analysis",
        error
      );
      setMistakesSummary("Unable to analyze trading mistakes at this time.");
    }
  };

  const generateAISummary = async (tradingHistory: TradingHistoryItem[]) => {
    if (!tradingHistory || tradingHistory.length === 0) return;

    const prompt = `
      Summarize the following trader's trading history for AI insights in 100 words:
      Total trades: ${tradingHistory.length}.
      Profitable trades: ${
        tradingHistory.filter((trade) => trade.profit_loss > 0).length
      }.
      Loss trades: ${
        tradingHistory.filter((trade) => trade.profit_loss < 0).length
      }.
      Total profit/loss: ${tradingHistory.reduce(
        (sum, trade) => sum + trade.profit_loss,
        0
      )}.
      Suggest a strategic approach for this trader.
    `;

    try {
      const result = await model.generateContent(prompt);
      setAISummary(result.response.text());
      await analyzeMistakes(tradingHistory);
    } catch (error) {
      console.error("Error generating AI insights", error);
      setAISummary("Unable to generate AI insights at this time.");
      setMistakesSummary("Unable to analyze mistakes at this time.");
    }
  };

  const calculateProfitLoss = () => {
    if (!data?.trading_history) return { profit: 0, loss: 0 };

    const profit = data.trading_history
      .filter((trade) => trade.profit_loss > 0)
      .reduce((sum, trade) => sum + trade.profit_loss, 0);

    const loss = data.trading_history
      .filter((trade) => trade.profit_loss < 0)
      .reduce((sum, trade) => sum + Math.abs(trade.profit_loss), 0);

    return { profit, loss };
  };

  const prepareBarChartData = () => {
    const dateCounts: Record<string, number> = {};
    data?.trading_history?.forEach((trade) => {
      const date = new Date(trade.date_time).toLocaleDateString();
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return {
      labels: Object.keys(dateCounts),
      datasets: [
        {
          label: "Trade Count Over Time",
          data: Object.values(dateCounts),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const profitLossSummary = calculateProfitLoss();
  const barChartData = prepareBarChartData();

  const pieData = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        label: "Profit vs Loss",
        data: [profitLossSummary.profit, profitLossSummary.loss],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  const handleTabClick = (tab: "pie" | "bar" | "table") => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-full h-full px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Analytics Dashboard of Your Crypto
      </h1>

      {/* Open Positions Section */}
      <div className="bg-[#F4F1E6] p-6 rounded-md shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Open Positions</h2>
        {data?.portfolio?.open_positions?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {data?.portfolio.open_positions.map((position, index) => (
              <div key={index} className="border p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">{position.asset}</h3>
                <p>
                  <span className="font-semibold">Entry Price:</span> $
                  {position.entry_price?.toFixed(2) || 0}
                </p>
                <p>
                  <span className="font-semibold">Current Price:</span> $
                  {position.current_price?.toFixed(2) || 0}
                </p>
                <p>
                  <span className="font-semibold">Leverage:</span>{" "}
                  {position.leverage}x
                </p>
                <p
                  className={`font-semibold ${
                    position.unrealized_profit_loss >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Unrealized P/L: $
                  {position.unrealized_profit_loss?.toFixed(2) || 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No open positions</div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* AI Summary Section */}
      {data ? (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Your Trading Summary</h2>
            <div className="bg-primary p-6 rounded-md shadow-md text-white">
              {aiSummary ? (
                <ul className="list-disc pl-6 space-y-2">
                  {aiSummary
                    .split(". ")
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((item, index) => (
                      <li key={index}>{item}.</li>
                    ))}
                </ul>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#F4F1E6] p-6 rounded-md shadow-md">
              <h3 className="font-semibold mb-2">Initial Balance</h3>
              <p className="text-xl font-bold">
                ${data?.portfolio.initial_balance?.toFixed(2) || 0}
              </p>
            </div>

            <div className="bg-[#F4F1E6] p-6 rounded-md shadow-md">
              <h3 className="font-semibold mb-2">Current Balance</h3>
              <p className="text-xl font-bold">
                ${data?.portfolio.current_balance?.toFixed(2) || 0}
              </p>
            </div>

            <div className="bg-[#F4F1E6] p-6 rounded-md shadow-md">
              <h3 className="font-semibold mb-2">Average Leverage</h3>
              <p className="text-xl font-bold">
                {data?.trading_patterns.average_leverage || 0}x
              </p>
            </div>

            <div className="bg-[#F4F1E6] p-6 rounded-md shadow-md">
              <h3 className="font-semibold mb-2">Profitable Trade Type</h3>
              <p className="text-xl font-bold">
                {data?.trading_patterns.most_profitable_trade_type || 0}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-8">
            <div className="mb-8 border-2 border-black  p-4  w-full md:w-1/4">
              <h2 className="text-lg font-semibold mb-2">
                Trading Mistakes Analysis
              </h2>
              <div className="bg-white border rounded-md shadow-md p-6">
                {mistakesSummary ? (
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                    {mistakesSummary
                      .split(". ")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index}>{item}.</li>
                      ))}
                  </ul>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>

            <div className="flex w-full md:w-3/4 flex-col">
              <div className="w-full flex justify-center mb-6 space-x-6">
                <button
                  className={`px-4 py-2 border rounded-lg ${
                    activeTab === "table"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  }`}
                  onClick={() => handleTabClick("table")}
                >
                  Trading Activity Table
                </button>

                <button
                  className={`px-4 py-2 border rounded-lg ${
                    activeTab === "pie"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  }`}
                  onClick={() => handleTabClick("pie")}
                >
                  Profit/Loss Pie Chart
                </button>

                <button
                  className={`px-4 py-2 border rounded-lg ${
                    activeTab === "bar"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  }`}
                  onClick={() => handleTabClick("bar")}
                >
                  Trading Activity Bar Chart
                </button>
              </div>
              {data ? (
                <div className="p-4 border-2 border-black">
                  {activeTab === "table" && (
                    <div className="mb-8 h-[50vh] overflow-auto">
                      <h2 className="text-lg font-semibold mb-4 text-center">
                        Trading Activity Table
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full bg-white border border-gray-500 shadow-xl">
                          <thead className="bg-primary text-white">
                            <tr className="text-center">
                              <th className="px-4 py-2">Trade ID</th>
                              <th className="px-4 py-2">Asset</th>
                              <th className="px-4 py-2">Trade Type</th>
                              <th className="px-4 py-2">Profit/Loss</th>
                              <th className="px-4 py-2">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.trading_history.map((trade) => (
                              <tr key={trade.trade_id} className="text-center">
                                <td className="px-4 py-2">{trade.trade_id}</td>
                                <td className="px-4 py-2">{trade.asset}</td>
                                <td className="px-4 py-2">
                                  {trade.trade_type}
                                </td>
                                <td
                                  className={`px-4 py-2 ${
                                    trade.profit_loss < 0
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  ${trade.profit_loss.toFixed(2)}
                                </td>
                                <td className="px-4 py-2">
                                  {new Date(trade.date_time).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === "pie" && (
                    <div className="mb-8  justify-center text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        Profit vs Loss Pie Chart
                      </h2>
                      <div className="overflow-hidden h-64">
                        <Pie data={pieData} />
                      </div>
                    </div>
                  )}

                  {activeTab === "bar" && (
                    <div className="mb-8 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        Trading Activity Bar Chart
                      </h2>
                      <div className="overflow-hidden w-full h-full">
                        <Bar data={barChartData} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center mt-4">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default AnalysisDashboard;
