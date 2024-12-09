// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { FaBullhorn } from "react-icons/fa6";

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
  const { basketId } = useParams<{ basketId: string }>();
  const [basket, setBasket] = useState<BasketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pie");
  const [isLocked, setIsLocked] = useState<boolean>(true); // Controls content blur
  const [showModal, setShowModal] = useState<boolean>(false); // Controls modal visibility

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

  const handleUnlockClick = () => {
    setShowModal(true); // Show modal when "Unlock now" is clicked
  };

  const handleAgree = () => {
    setIsLocked(false); // Unblur the content
    setShowModal(false); // Close the modal
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
    <>
      <ContentContainer>
        <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
          {/* Basket Title and Description */}
          <div className="flex flex-col rounded-xl p-6 bg-[#F4F1E6]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={`/images/Baskets/page/assets/${1}.png`} // Dynamically set image path
                  alt={`Basket ${basket.basket_id}`}
                  className="object-contain w-16 h-16"
                />
                <h2 className="text-xl sm:text-3xl font-medium text-black">
                  {basket.name}
                </h2>
              </div>

              <div className="flex flex-row mt-4 gap-4">
                <p className="text-lg sm:text-xl text-black font-medium">
                  Min Investment:{" "}
                  <span className="text-primary">{basket.min_investments}</span>
                </p>

                <p className="text-lg sm:text-xl text-black font-semibold">
                  Min Amount:{" "}
                  <span className="text-primary">{basket.min_amount}</span>
                </p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 mt-3">
              {basket.description}
            </p>

            {basket.description_points && (
              <div className="mt-4 text-gray-600 space-y-2">
                {basket.description_points.map((point, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span>
                      <FaBullhorn />
                    </span>
                    <p className="text-sm font-normal sm:text-base">{point}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-start">
              <button className="bg-white text-primary font-medium py-3 px-6">
                Subscribe now
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mt-6 flex justify-center gap-6">
            <button
              className={`py-2 px-6 rounded-lg font-semibold ${
                activeTab === "pie"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("pie")}
            >
              Asset Allocation
            </button>
            <button
              className={`py-2 px-6 rounded-lg font-semibold ${
                activeTab === "bar"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("bar")}
            >
              Asset Performance
            </button>
            <button
              className={`py-2 px-6 rounded-lg font-semibold ${
                activeTab === "assets"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("assets")}
            >
              Assets List
            </button>
          </div>

          {/* Tabs Content */}
          <div className="mt-6 relative">
            {isLocked && (
              <div className="absolute inset-0 z-50 flex justify-center items-center">
                <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4">
                  <span className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold text-center">
                    UNDERSTANDING METRICS
                  </span>

                  <span className="text-gray-600 text-sm sm:text-lg md:text-xl font-normal text-center">
                    Unlock live performance and returns of smallcases
                  </span>

                  <button
                    className="w-full sm:w-auto py-3 px-6 bg-primary text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-primary-dark transition duration-300"
                    onClick={handleUnlockClick}
                  >
                    Unlock now
                  </button>
                </div>
              </div>
            )}

            <div
              className={`transition-all duration-300 ${isLocked ? "blur-sm" : ""}`}
              style={{ zIndex: isLocked ? -1 : 0 }}
            >
              {activeTab === "pie" && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Asset Allocation
                  </h3>
                  <div className="flex h-[40vh] justify-center mt-4">
                    <Pie data={pieChartData} options={{ responsive: true }} />
                  </div>
                </div>
              )}

              {activeTab === "bar" && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Asset Performance Comparison
                  </h3>
                  <div className="flex h-[40vh] justify-center mt-4">
                    <Bar data={barChartData} options={{ responsive: true }} />
                  </div>
                </div>
              )}

              {activeTab === "assets" && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Assets
                  </h3>
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3 text-left">Token</th>
                          <th className="p-3 text-left">Allocation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.assets.map((asset, index) => (
                          <tr key={index}>
                            <td className="p-3">{asset.token}</td>
                            <td className="p-3">{asset.allocation}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default BasketDetails;
