// @ts-nocheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import SignupCard from "../CTA/SingUpCard";
import LoadingSpinner from "../Loader/LoadingSpinner";
import Footer from "../Footer/Footer";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

const format24HrChange = (change: string) => {
  const changeValue = parseFloat(change);
  return (
    <span className={changeValue >= 0 ? "text-green-700" : "text-red-600"}>
      {changeValue >= 0 ? "+" : ""}
      {changeValue.toFixed(2)}%
    </span>
  );
};

const CryptoTable = ({ assets }: { assets: Asset[] }) => {
  return (
    <table className="w-full bg-white  shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-primary text-white">
        <tr className="">
          <th className="py-3 px-4 text-left text-xl font-medium">Name</th>
          <th className="py-3 px-4 text-left  text-xl font-medium">Symbol</th>
          <th className="py-3 px-4 text-left  text-xl font-medium">
            Price (USD)
          </th>
          <th className="py-3 px-4 text-left  text-xl font-medium">
            24h Change
          </th>
          <th className="py-3 px-4 text-center  text-xl font-medium">
            Market Cap (USD)
          </th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id} className="border-b p-3 hover:bg-gray-50">
            <td className="p-6 text-xl text-gray-800">{asset.name}</td>
            <td className="py-3 px-4 text-xl text-gray-800">{asset.symbol}</td>
            <td className="py-3 px-4 text-xl text-gray-800">
              ${parseFloat(asset.priceUsd).toFixed(2)}
            </td>
            <td className="py-3 px-4 text-xl text-gray-800">
              {format24HrChange(asset.changePercent24Hr)}
            </td>
            <td className="py-3 px-4 text-xl text-center text-gray-800">
              ${parseFloat(asset.marketCapUsd).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CryptoAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((response) => {
        setAssets(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <ContentContainer>
        <div className="">
          <Heading
            fontSize="xl"
            fontColor="text-gray-900"
            className="mb-8 font-semibold"
          >
            Cryptocurrency price trends and market capital figures.
          </Heading>
          {loading && !error ? (
            <LoadingSpinner />
          ) : error ? (
            <Text fontSize="md" className="text-center text-red-600">
              {error}
            </Text>
          ) : (
            <div className="overflow-x-auto">
              <CryptoTable assets={assets} />
            </div>
          )}
        </div>
        <SignupCard />
      </ContentContainer>
      <Footer />
    </>
  );
};

export default CryptoAssets;
