// @ts-nocheck

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for toggle button
import Switch from "react-switch"; // Import react-switch for switch component
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { Link } from "react-router-dom";

interface Asset {
  allocation: number;
  token: string;
}

interface BasketData {
  basket_id: string;
  name: string;
  description: string;
  assets: Asset[];
}

interface ApiResponse {
  baskets: BasketData[];
}

const HomeCoinSets: React.FC = () => {
  const [baskets, setBaskets] = useState<BasketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({}); // Track open state for each modal

  useEffect(() => {
    fetch("https://testdata-bh0z.onrender.com/api/baskets")
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setBaskets(data.baskets);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const handleToggleChange = (basketId: string, checked: boolean) => {
    setOpenModals((prev) => ({ ...prev, [basketId]: checked }));
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <ContentContainer>
      <div className="w-full">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-4xl font-semibold text-center">Crypto Baskets</h1>
        </div>

        <ContentContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {baskets.length > 0 ? (
              baskets.map((basket) => (
                <div
                  key={basket.basket_id}
                  className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
                >
                  <Link to={`/basket/${basket.basket_id}`}>
                    <h2 className="text-2xl font-semibold text-center mb-4">
                      {basket.name}
                    </h2>
                  </Link>
                  <p className="text-lg text-gray-600 text-center mb-6">
                    {basket.description}
                  </p>

                  {/* Show All Assets Switch */}
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-lg">Show All Assets</span>
                    <Switch
                      onChange={(checked) =>
                        handleToggleChange(basket.basket_id, checked)
                      }
                      checked={openModals[basket.basket_id] || false}
                      offColor="#D1D5DB"
                      onColor="#4CAF50"
                      height={30}
                      width={60}
                      className="react-switch"
                    />
                  </div>

                  {/* Show modal button */}
                  {openModals[basket.basket_id] && (
                    <p
                      className="text-center text-blue-500 mt-4"
                      onClick={() =>
                        setOpenModals((prev) => ({
                          ...prev,
                          [basket.basket_id]: !prev[basket.basket_id],
                        }))
                      }
                    >
                      {openModals[basket.basket_id]
                        ? "Hide Assets"
                        : "View More"}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-lg text-gray-500">
                No baskets available.
              </div>
            )}
          </div>
        </ContentContainer>

        {/* Modals for each basket */}
        {baskets.map((basket) =>
          openModals[basket.basket_id] ? (
            <div
              key={basket.basket_id}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
                <button
                  onClick={() =>
                    setOpenModals((prev) => ({
                      ...prev,
                      [basket.basket_id]: false,
                    }))
                  }
                  className="absolute top-4 right-4 text-2xl text-gray-500"
                >
                  &times;
                </button>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium">All Assets:</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-left border-collapse">
                      <thead className="">
                        <tr className="">
                          <th className="px-4 py-2 text-xl font-semibold text-gray-600">
                            Token
                          </th>
                          <th className="px-4 py-2 text-xl font-semibold text-gray-600">
                            Allocation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.assets.map((asset, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-100"
                          >
                            <td className="px-4 py-2 text-lg text-gray-800">
                              {asset.token}
                            </td>
                            <td className="px-4 py-2 text-lg text-gray-800">
                              {asset.allocation}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </ContentContainer>
  );
};

export default HomeCoinSets;
