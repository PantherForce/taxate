// @ts-nocheck

import React, { useEffect, useState } from "react";
import Switch from "react-switch";
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
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

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
    setIsBlurred(checked);
  };

  const handleAgree = () => {
    setShowModal(false);
    setIsBlurred(false);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <>
      <ContentContainer>
        <div className={`w-full ${isBlurred ? "bg-opacity-50" : ""}`}>
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-4xl font-semibold text-center">
              Crypto Baskets
            </h1>
          </div>

          <ContentContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {baskets.length > 0 ? (
                baskets.map((basket, index) => (
                  <div
                    key={basket.basket_id}
                    className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center sm:items-start">
                      <div className="">
                        <img
                          src={`/images/Baskets/page/assets/${index + 1}.png`}
                          alt={`Basket ${basket.basket_id}`}
                          className="object-contain w-16 h-16"
                        />
                      </div>

                      <Link
                        to={`/basket/${basket.basket_id}`}
                        className="w-full sm:w-auto"
                      >
                        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left mt-3">
                          {basket.name}
                        </h2>
                      </Link>
                    </div>

                    <p className="text-lg text-gray-600 font-medium text-left mb-6">
                      {basket.description}
                    </p>

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
                        <thead>
                          <tr>
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

          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-4/5 sm:w-1/3">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Terms and Conditions
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  It depicts the actual and verifiable returns generated by the
                  portfolios of SEBI registered entities. Live performance does
                  not include any backtested data or claim and does not
                  guarantee future returns.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  By proceeding, you understand that investments are subjected
                  to market risks and agree that returns shown on the platform
                  were not used as an advertisement or promotion to influence
                  your investment decisions.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white py-2 px-4 rounded"
                    onClick={handleAgree}
                  >
                    Agree
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentContainer>
    </>
  );
};

export default HomeCoinSets;
