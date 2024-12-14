import React, { useState } from "react";
import axios from "axios";

interface Transactions {
  deposits: any[];
  withdrawals: any[];
  trades: any[];
}

const Kucoin: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [apiPassphrase, setApiPassphrase] = useState<string>("");
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://testdata-bh0z.onrender.com/kucoin-transactions", {
        api_key: apiKey,
        api_secret: apiSecret,
        api_passphrase: apiPassphrase,
      });

      setTransactions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">KuCoin Transactions</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="apiKey">
              API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="apiSecret">
              API Secret
            </label>
            <input
              id="apiSecret"
              type="text"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="apiPassphrase">
              API Passphrase
            </label>
            <input
              id="apiPassphrase"
              type="text"
              value={apiPassphrase}
              onChange={(e) => setApiPassphrase(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Transactions"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {transactions && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="mt-4">
              <h3 className="font-medium">Deposits:</h3>
              <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(transactions.deposits, null, 2)}</pre>
            </div>
            <div className="mt-4">
              <h3 className="font-medium">Withdrawals:</h3>
              <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(transactions.withdrawals, null, 2)}</pre>
            </div>
            <div className="mt-4">
              <h3 className="font-medium">Trades:</h3>
              <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(transactions.trades, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kucoin;
