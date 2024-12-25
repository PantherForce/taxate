// @ts-nocheck


import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Balance {
  asset: string;
  free: string;
}

const WalletBalance: React.FC = () => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await axios.get<Balance[]>('https://testdata-bh0z.onrender.com/api/wallet');
        setBalances(response.data);
      } catch (err) {
        setError('Error fetching wallet balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  if (loading) {
    return <div className="text-center py-4 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Binance Wallet Balance</h1>
      <ul className="space-y-2">
        {balances.map((balance) => (
          <li
            key={balance.asset}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <span className="font-medium">{balance.asset}</span>
            <span>{balance.free}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletBalance;
