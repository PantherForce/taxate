import { useState, useEffect } from "react";
import axios from "axios";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

interface Basket {
  basket_1: CryptoAsset[];
  basket_2: CryptoAsset[];
  basket_3: CryptoAsset[];
}

const CryptoAsset = () => {
  const [baskets, setBaskets] = useState<Basket | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/crypto_baskets")
      .then((response) => setBaskets(response.data))
      .catch((error) => console.error(error));
  }, []);

  const renderBasket = (basketName: keyof Basket) => {
    return baskets ? (
      baskets[basketName].map((asset) => (
        <div key={asset.id} className="p-4 border border-gray-300 rounded-md">
          <h2 className="font-bold text-lg">{asset.name} ({asset.symbol})</h2>
          <p>Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
          <p>Market Cap: ${parseFloat(asset.marketCapUsd).toFixed(0)}</p>
          <p className={`text-sm ${parseFloat(asset.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'}`}>
            24h Change: {parseFloat(asset.changePercent24Hr).toFixed(2)}%
          </p>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Baskets</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Basket 1</h2>
          {renderBasket("basket_1")}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Basket 2</h2>
          {renderBasket("basket_2")}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Basket 3</h2>
          {renderBasket("basket_3")}
        </div>
      </div>
    </div>
  );
};

export default CryptoAsset;
