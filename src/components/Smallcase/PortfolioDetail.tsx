// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registering the chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Asset {
  asset_id: string;
  name: string;
  symbol: string;
  allocation_percentage: number;
  current_price: number;
}

interface Smallcase {
  basket_id: string;
  basket_name: string;
  basket_type: string;
  basket_description: string;
  assets: Asset[];
  basket_performance: {
    "1_month_return": string;
    "3_month_return": string;
    "6_month_return": string;
    "1_year_return": string;
  };
  rebalancing: {
    frequency: string;
    rules: string;
  };
  investment_criteria: {
    minimum_investment: string;
    maximum_investment: string;
  };
  target_audience: string;
}

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [smallcase, setSmallcase] = useState<Smallcase | null>(null);
  const [activeTab, setActiveTab] = useState<string>("performance"); // Tab state to switch between Pie and Line chart

  useEffect(() => {
    if (id) {
      axios
        .get(`https://testdata-bh0z.onrender.com/api/smallcase/${id}`)
        .then((response) => {
          setSmallcase(response.data); // The response should contain the smallcase details
        })
        .catch((error) => {
          console.error("Error fetching smallcase details:", error);
        });
    }
  }, [id]);

  if (!smallcase) {
    return <div>Loading...</div>;
  }

  // Prepare Pie Chart data for asset allocation
  const assetNames = smallcase.assets.map((asset) => asset.name);
  const assetAllocations = smallcase.assets.map(
    (asset) => asset.allocation_percentage
  );
  const assetColors = smallcase.assets.map(
    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  ); // Random colors for each asset

  // Pie Chart Data
  const pieData = {
    labels: assetNames,
    datasets: [
      {
        data: assetAllocations,
        backgroundColor: assetColors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Prepare Line Chart data for Performance
  const performanceLabels = ["1 Month", "3 Months", "6 Months", "1 Year"];
  const performanceValues = [
    parseFloat(smallcase.basket_performance["1_month_return"]),
    parseFloat(smallcase.basket_performance["3_month_return"]),
    parseFloat(smallcase.basket_performance["6_month_return"]),
    parseFloat(smallcase.basket_performance["1_year_return"]),
  ];

  const lineData = {
    labels: performanceLabels,
    datasets: [
      {
        label: "Performance (%)",
        data: performanceValues,
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.2)",
        fill: true,
        tension: 0.4, // smoothness of the line
      },
    ],
  };

  return (
    <>
      <Navbar />
      <ContentContainer>
        <div className="p-6">
          <div className="bg-[#F4F1E6] p-6 rounded-lg shadow-lg h-[24vh]">
            <h1 className="text-3xl font-semibold text-gray-900">
              {smallcase.basket_name}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {smallcase.basket_description}
            </p>

            <div className="flex justify-between mt-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Investment Criteria:
                </h2>
                <p className="text-gray-700 mt-2">
                  Minimum Investment{" "}
                  {smallcase.investment_criteria.minimum_investment}
                </p>
                <p className="text-gray-700 mt-2">
                  Maximum Investment:{" "}
                  {smallcase.investment_criteria.maximum_investment}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-black text-xl mt-2">
                  Basket Type
                </p>
                <p className="text-gray-700 text-base"> {smallcase.basket_type}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                  Target Audience
                </h2>
                <p className="text-gray-700 mt-2">
                  {smallcase.target_audience}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setActiveTab("asset-allocation")}
              className={`px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ${
                activeTab === "asset-allocation"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Asset Allocation
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ${
                activeTab === "performance"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Performance
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center w-full">
            {activeTab === "asset-allocation" ? (
              <div className="flex flex-col items-center w-full max-w-3xl p-4">
                <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
                  <Pie data={pieData} options={{ responsive: true }} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full max-w-3xl p-4">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Performance Over Time
                </h2>
                <div className="w-full h-[300px] md:h-[400px] lg:h-[600px]">
                  <Line data={lineData} options={{ responsive: true }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default PortfolioDetail;
