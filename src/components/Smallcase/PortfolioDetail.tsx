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
import LoadingSpinner from "../Loader/LoadingSpinner";
import Metamask from "../WalletConnect/Metamask";

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
  investment_criteria: {
    minimum_investment: string;
    maximum_investment: string;
  };
  target_audience: string;
}

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [smallcase, setSmallcase] = useState<Smallcase | null>(null);
  const [activeTab, setActiveTab] = useState<string>("assets");
  const [assetPrices, setAssetPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (id) {
      axios
        .get(`https://testdata-bh0z.onrender.com/api/smallcase/${id}`)
        .then((response) => setSmallcase(response.data))
        .catch((error) => console.error("Error fetching smallcase details:", error));
    }
  }, [id]);

  useEffect(() => {
    const fetchAssetPrices = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const assets = response.data.data;
        const prices: { [key: string]: number } = {};

        assets.forEach((asset: { symbol: string; priceUsd: string }) => {
          prices[asset.symbol] = parseFloat(asset.priceUsd);
        });

        setAssetPrices(prices);
      } catch (error) {
        console.error("Error fetching asset prices:", error);
      }
    };

    fetchAssetPrices();
  }, []);

  if (!smallcase) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const assetNames = smallcase.assets.map((asset) => asset.name);
  const assetAllocations = smallcase.assets.map((asset) => asset.allocation_percentage);
  const assetColors = smallcase.assets.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

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
        tension: 0.4,
      },
    ],
  };

  const getLivePrice = (symbol: string): number | string => {
    return assetPrices[symbol] || "Fetching...";
  };

  return (
    <>
      <Navbar />
      <ContentContainer>
        <div className="p-4 md:p-6">
          <Metamask />
          <div className="bg-[#F4F1E6] p-4 md:p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{smallcase.basket_name}</h1>
            <p className="text-base md:text-lg text-black mt-2">{smallcase.basket_description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <h2 className="text-lg font-semibold">Investment Criteria</h2>
                <p className="text-black font-medium ">Minimum: {smallcase.investment_criteria.minimum_investment}</p>
                <p className="text-black font-medium ">Maximum: {smallcase.investment_criteria.maximum_investment}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Basket Type</h2>
                <p className="text-black font-medium ">{smallcase.basket_type}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Target Audience</h2>
                <p className="text-black font-medium ">{smallcase.target_audience}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            {[
              { id: "asset-allocation", label: "Asset Allocation" },
              { id: "performance", label: "Performance" },
              { id: "assets", label: "Assets Buy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "asset-allocation" && (
              <div className="w-full max-w-md mx-auto">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            )}

            {activeTab === "performance" && (
              <div className="w-full max-w-lg mx-auto">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            )}

            {activeTab === "assets" && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Asset Name</th>
                      <th className="px-4 py-2">Allocation (%)</th>
                      <th className="px-4 py-2">Live Price (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smallcase.assets.map((asset) => (
                      <tr key={asset.asset_id} className="text-center border-t">
                        <td className="px-4 py-2">{asset.name}</td>
                        <td className="px-4 py-2">{asset.allocation_percentage}</td>
                        <td className="px-4 py-2">{getLivePrice(asset.symbol)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default PortfolioDetail;
