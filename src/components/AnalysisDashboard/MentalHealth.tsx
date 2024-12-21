// @ts-nocheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, parseISO } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TradingHistory {
  trade_id: string;
  asset: string;
  trade_type: string;
  entry_price: number;
  exit_price: number;
  leverage: number;
  quantity: number;
  profit_loss: number;
  date_time: string;
  stop_loss: number | null;
  take_profit: number;
  trade_duration: string;
  fees_paid: number;
  risk_category?: string;
  strategy: string;
}

interface Portfolio {
  current_balance: number;
  initial_balance: number;
  open_positions: {
    asset: string;
    entry_price: number;
    current_price: number;
    leverage: number;
    quantity: number;
    unrealized_profit_loss: number;
  }[];
}

interface ApiResponse {
  user_id: string;
  trading_history: TradingHistory[];
  portfolio: Portfolio;
  market_data: { sentiment: string }[];
}

const WalletHealthScore: React.FC<{ tradingHistory: TradingHistory[] }> = ({
  tradingHistory,
}) => {
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const totalTrades = tradingHistory.length;
    const totalProfitLoss = tradingHistory.reduce(
      (acc, trade) => acc + trade.profit_loss,
      0
    );

    const diversificationScore = totalTrades > 5 ? 30 : 10;
    const volatilityScore = totalProfitLoss < -1000 ? 15 : 30;
    const riskScore = totalProfitLoss < 0 ? 20 : 40;
    const performanceScore = totalProfitLoss > 0 ? 30 : 20;

    const calculatedScore =
      diversificationScore + volatilityScore + riskScore + performanceScore;
    setScore(Math.min(calculatedScore, 100));

    const recs = [];
    if (volatilityScore < 20) recs.push("Consider adding more stablecoins.");
    if (riskScore > 25) recs.push("Reduce high-risk asset exposure.");
    setRecommendations(recs);
  }, [tradingHistory]);

  const angle = (score / 100) * 180;

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Wallet Health Score</h2>
      <p className="text-lg mt-2">
        Your current score is: <strong>{score}</strong> / 100
      </p>

      <div className="flex flex-row gap-8">
        <div className="mt-6 flex justify-center items-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#e0e0e0"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke={score >= 50 ? "green" : "red"}
              strokeWidth="15"
              fill="none"
              strokeDasharray={`${angle} 180`}
              strokeDashoffset="0"
              transform="rotate(-90, 100, 100)"
              style={{ transition: "stroke-dasharray 0.3s ease" }}
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="black"
              strokeWidth="3"
              transform={`rotate(${angle}, 100, 100)`}
              style={{ transition: "transform 0.3s ease" }}
            />
          </svg>
          <div className="absolute text-2xl font-semibold">{score}</div>
        </div>

        <div className="flex flex-row mt-10 gap-8">
          <div className="flex flex-col">
            <h3 className="font-semibold">Score Breakdown:</h3>
            <ul className="list-disc pl-5">
              <li>
                Diversification: {score >= 30 ? "Good" : "Needs Improvement"}
              </li>
              <li>
                Volatility Exposure: {score >= 30 ? "Stable" : "High Risk"}
              </li>
              <li>Risk Level: {score >= 25 ? "Moderate" : "High"}</li>
              <li>
                Overall Performance: {score >= 25 ? "Profitable" : "Loss"}
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold mt-4">Recommendations:</h3>
            <ul className="list-disc pl-5">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 ">
            <h3 className="text-lg font-semibold">Gratitude Reminder</h3>
            <p>You’ve grown your portfolio by 20% in the last 6 months!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TradingStrategyPerformance: React.FC<{ tradingHistory: TradingHistory[] }> = ({
    tradingHistory,
  }) => {
    const [strategyPerformance, setStrategyPerformance] = useState<{ [key: string]: number }>({
      "Day Trading": 0,
      "Swing Trading": 0,
      "Scalping": 0,
      "HODLing": 0,
      "Trend Following": 0,
    });
  
    useEffect(() => {
      const performanceMap: { [key: string]: number } = {};
  
      tradingHistory.forEach((trade) => {
        if (!performanceMap[trade.strategy]) {
          performanceMap[trade.strategy] = 0;
        }
        performanceMap[trade.strategy] += trade.profit_loss;
      });
  
      setStrategyPerformance(performanceMap);
    }, [tradingHistory]);
  
    return (
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Trading Strategy Performance</h2>
        <ul className="list-disc pl-5">
          {Object.entries(strategyPerformance).map(([strategy, performance], index) => (
            <li key={index} className="text-lg">
              <span className={`font-semibold ${performance >= 0 ? "text-green-600" : "text-red-600"}`}>
                {strategy}: {performance >= 0 ? `+${performance}` : performance}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

const LossSpikeGraph: React.FC<{ tradingHistory: TradingHistory[] }> = ({
  tradingHistory,
}) => {
  const labels = tradingHistory.map((trade) =>
    new Date(trade.date_time).toLocaleString("default", {
      year: "numeric",
      month: "short",
    })
  );
  const data = tradingHistory.map((trade) => trade.profit_loss);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Profit/Loss over Time",
        data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Calculate max number of intervals (7 intervals)
  const maxIntervals = 7;
  const totalDataPoints = labels.length;
  const intervalSpacing = totalDataPoints > maxIntervals ? Math.ceil(totalDataPoints / maxIntervals) : 1;

  const chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: maxIntervals, // Limit to 7 ticks
          stepSize: intervalSpacing,  // Adjust tick spacing
        },
      },
    },
  };

  return (
    <div className="bg-white w-full p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Loss Spike Graph</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};


const TradingTimeInsights: React.FC<{ tradingHistory: TradingHistory[] }> = ({
  tradingHistory,
}) => {
  const [mostProfitableTime, setMostProfitableTime] = useState<string>("");
  const [leastProfitableTime, setLeastProfitableTime] = useState<string>("");
  const [mostProfitableAmount, setMostProfitableAmount] = useState<number>(0);
  const [leastProfitableAmount, setLeastProfitableAmount] = useState<number>(0);

  useEffect(() => {
    if (tradingHistory.length === 0) {
      // If there are no trades, don't process and show a default message
      setMostProfitableTime(
        "No trades such data available based upon your data"
      );
      setLeastProfitableTime(
        "No trades such data available based upon your data"
      );
      setMostProfitableAmount(0);
      setLeastProfitableAmount(0);
      return;
    }

    const timeProfitMap: { [key: string]: number } = {};

    // Loop through each trade and group them by hour of the day
    tradingHistory.forEach((trade) => {
      const tradeDate = new Date(trade.date_time);
      const hour = tradeDate.getHours(); // Extract hour
      const timeRange = `${hour}:00 - ${hour + 1}:00`; // Create a time range (e.g., 14:00 - 15:00)

      // Sum the profit/loss for that time range
      if (!timeProfitMap[timeRange]) {
        timeProfitMap[timeRange] = 0;
      }
      timeProfitMap[timeRange] += trade.profit_loss;
    });

    // Initialize variables to find max and min profit
    let maxProfit = null;
    let minProfit = null;
    let mostProfitable = "";
    let leastProfitable = "";

    // Loop through the timeProfitMap to find the most and least profitable times
    for (const timeRange in timeProfitMap) {
      const profitLoss = timeProfitMap[timeRange];

      if (maxProfit === null || profitLoss > maxProfit) {
        maxProfit = profitLoss;
        mostProfitable = timeRange;
      }
      if (minProfit === null || profitLoss < minProfit) {
        minProfit = profitLoss;
        leastProfitable = timeRange;
      }
    }

    // Set the results to state
    setMostProfitableTime(mostProfitable);
    setLeastProfitableTime(leastProfitable);
    setMostProfitableAmount(maxProfit || 0); // In case maxProfit is null
    setLeastProfitableAmount(minProfit || 0); // In case minProfit is null
  }, [tradingHistory]);

  return (
    <div className="p-4 rounded-lg">
      <h3 className="text-lg font-semibold">Trading Time Insights</h3>
      <p>
        Most profitable time: {mostProfitableTime} with{" "}
        {mostProfitableAmount >= 0
          ? `+${mostProfitableAmount}`
          : mostProfitableAmount}
      </p>
      <p>
        Least profitable time: {leastProfitableTime} with{" "}
        {leastProfitableAmount <= 0
          ? `${leastProfitableAmount}`
          : `+${leastProfitableAmount}`}
      </p>
    </div>
  );
};

const GainsLossesCalendar: React.FC<{ tradingHistory: TradingHistory[] }> = ({
  tradingHistory,
}) => {
  const [value, setValue] = useState<Date>(new Date());
  const [events, setEvents] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const dateMap: { [key: string]: number } = {};

    tradingHistory.forEach((trade) => {
      const tradeDate = format(parseISO(trade.date_time), "yyyy-MM-dd");
      if (!dateMap[tradeDate]) {
        dateMap[tradeDate] = 0;
      }
      dateMap[tradeDate] += trade.profit_loss;
    });

    setEvents(dateMap);
  }, [tradingHistory]);

  const tileContent = ({ date }: any) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const gainLoss = events[dateStr];
    if (gainLoss !== undefined) {
      return (
        <div
          className={`p-2 text-xs font-semibold ${
            gainLoss > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {gainLoss > 0 ? `+${gainLoss}` : gainLoss}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
      Trading Gains/Losses Calendar
    </h2>
    <div className="react-calendar-wrapper">
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
        className="react-calendar w-full"
      />
    </div>
    <div className="mt-4 flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold">
        Selected Day: {format(value, "MMMM dd, yyyy")}
      </h3>
      <div className="text-sm text-center sm:text-left">
        {events[format(value, "yyyy-MM-dd")] ? (
          <p>
            Profit/Loss:{" "}
            {events[format(value, "yyyy-MM-dd")] > 0
              ? `+${events[format(value, "yyyy-MM-dd")]}` 
              : events[format(value, "yyyy-MM-dd")]}
          </p>
        ) : (
          <p>No transactions for this day.</p>
        )}
      </div>
    </div>
  </div>
  
  );
};

const MentalHealth: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://testdata-bh0z.onrender.com/data"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <WalletHealthScore tradingHistory={data.trading_history} />
      <TradingStrategyPerformance tradingHistory={data.trading_history} />
      <div className="text-black p-4 rounded-lg">
        <p>Focus on long-term goals, not short-term fluctuations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
        {/* Trading Time Insights */}
        <div className="col-span-1">
          <TradingTimeInsights tradingHistory={[]} />
        </div>

        {/* Current Streak */}
        <div className="p-4 flex flex-col gap-8 rounded-lg col-span-1">
          <h3 className="text-lg font-semibold">
            Current Streak:{" "}
            {data.trading_history.filter((t) => t.profit_loss > 0).length} days
          </h3>
          <button className="px-4 py-2 bg-gray-500 text-white rounded w-full">
            Pause Market Updates
          </button>
        </div>

        {/* Portfolio Sentiment */}
        <div className="w-full flex flex-col justify-center items-center col-span-1">
          <div
            className={`w-20 h-20 ${
              data.market_data[0].sentiment === "negative"
                ? "bg-red-500"
                : "bg-green-500"
            } text-white rounded-full flex items-center justify-center`}
          >
            <span>{data.market_data[0].sentiment.toUpperCase()}</span>
          </div>
          <p className="font-semibold text-lg mt-2">
            Portfolio Sentiment: {data.market_data[0].sentiment}
          </p>
        </div>
      </div>

      <div className="flex flex-row">
        <GainsLossesCalendar tradingHistory={data.trading_history} />
        <LossSpikeGraph tradingHistory={data.trading_history} />
      </div>
    </div>
  );
};

export default MentalHealth;
