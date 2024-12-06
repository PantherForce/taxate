// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the basket ID from the URL
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
import ContentContainer from "../Layout/ContentContainer/ContentContainer";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Asset {
  allocation: number;
  token: string;
}

interface BasketData {
  basket_id: string;
  name: string;
  description: string;
  description_points: Array<string>;
  min_investments: string;

  min_amount: string;
  assets: Asset[];
}

const BasketDetails: React.FC = () => {
  const { basketId } = useParams<{ basketId: string }>(); // Get basketId from URL
  const [basket, setBasket] = useState<BasketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://testdata-bh0z.onrender.com/api/baskets/${basketId}`)
      .then((response) => response.json())
      .then((data) => {
        setBasket(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch basket details");
        setLoading(false);
      });
  }, [basketId]);

  // Chart data for Pie chart (Asset Allocation)
  const pieChartData = {
    labels: basket?.assets.map((asset) => asset.token) || [],
    datasets: [
      {
        data: basket?.assets.map((asset) => asset.allocation) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Chart data for Bar chart (Performance Comparison)
  const barChartData = {
    labels: basket?.assets.map((asset) => asset.token) || [],
    datasets: [
      {
        label: "Asset Performance",
        data: basket?.assets.map((asset) => asset.allocation) || [],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!basket) {
    return (
      <div className="text-center text-lg text-red-500">Basket not found</div>
    );
  }

  return (
    <ContentContainer>
      <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Basket Title and Description */}

        <div className="flex flex-col rounded-xl p-6 bg-primary shadow-lg hover:shadow-xl transition-shadow duration-300">
  <h2 className="text-3xl sm:text-4xl font-semibold text-white">
    {basket.name}
  </h2>
  
  <p className="text-lg sm:text-xl text-white mt-3">
    {basket.description}
  </p>
  
  <p className="text-lg sm:text-xl text-white mt-4 font-semibold">
    Min Investment: <span className="text-yellow-400">{basket.min_investments}</span>
  </p>
  
  <p className="text-lg sm:text-xl text-white mt-2 font-semibold">
    Min Amount: <span className="text-yellow-400">{basket.min_amount}</span>
  </p>
  
  {basket.description_points && (
    <div className="mt-4 text-white space-y-2">
      {basket.description_points.map((point, index) => (
        <div key={index} className="flex items-start">
          <span className="text-lg text-yellow-400 mr-2">•</span>
          <p className="text-sm sm:text-base">{point}</p>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Pie Chart Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Asset Allocation
            </h3>
            <div className="flex h-[40vh] justify-center mt-4">
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Asset Performance Comparison
            </h3>
            <div className="flex h-[40vh] justify-center mt-4">
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        {/* Asset List */}
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Assets
          </h3>
          <ul className="mt-4 space-y-4">
            {basket.assets.map((asset, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-lg sm:text-xl text-gray-800"
              >
                <span>{asset.token}</span>
                <span>{asset.allocation}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentContainer>
  );
};

export default BasketDetails;
