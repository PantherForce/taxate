// src/components/BinanceWallet.tsx
import React, { useState } from 'react';
import axios from 'axios';

const BinanceWallet: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWallet = async () => {
    if (!apiKey || !secretKey) {
      setError('API Key and Secret Key are required');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      // Send API Key and Secret Key to Flask backend via POST request
      const response = await axios.post('https://testdata-bh0z.onrender.com/bwallet', {
        apiKey,  // This should be the correct API key
        secretKey, // This should be the correct secret key
      });
  
      setWalletInfo(response.data.wallet);
    } catch (err: any) {
      // Capture error response from backend and show error
      console.error('Error response:', err.response);
      setError('Error fetching wallet data: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Binance Wallet Info</h1>

        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">Binance API Key</label>
          <input
            type="text"
            id="apiKey"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter Binance API Key"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">Binance Secret Key</label>
          <input
            type="text"
            id="secretKey"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter Binance Secret Key"
          />
        </div>

        <button
          onClick={handleFetchWallet}
          className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Fetch Wallet Info'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {walletInfo && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Wallet Details:</h2>
            <ul className="mt-4 space-y-2">
              {walletInfo.map((asset: any) => (
                <li key={asset.asset} className="p-2 border-b border-gray-300">
                  <strong>{asset.asset}:</strong> Free: {asset.free}, Locked: {asset.locked}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinanceWallet;
