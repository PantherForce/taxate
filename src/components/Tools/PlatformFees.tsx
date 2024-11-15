import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Exchange {
  id: string;
  name: string;
  fee: number; // Simulating transaction fee in percentage
}

interface Coin {
  id: string;
  name: string;
}


const PlatformFees: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedSendingExchange, setSelectedSendingExchange] = useState<string>('');
  const [selectedReceivingExchange, setSelectedReceivingExchange] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [transactionFee, setTransactionFee] = useState<number | null>(null);
  const [bestExchange, setBestExchange] = useState<Exchange | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Setup generative AI model
  const generativeAI = new GoogleGenerativeAI({
    apiKey: 'AIzaSyDj1d-KGQHhn7S4bCKz4021Do4Y6HAmTAw', // Your Google API key here
  });

  useEffect(() => {
    // Mock fetch exchanges and coins data
    const fetchExchanges = async () => {
      const mockExchanges = [
        { id: '1', name: 'Gemini', fee: 0.5 },
        { id: '2', name: 'Binance', fee: 0.2 },
        { id: '3', name: 'Coinbase', fee: 0.4 },
      ];
      setExchanges(mockExchanges);
    };

    const fetchCoins = async () => {
      const mockCoins = [
        { id: 'btc', name: 'Bitcoin' },
        { id: 'eth', name: 'Ethereum' },
        { id: 'xrp', name: 'Ripple' },
      ];
      setCoins(mockCoins);
    };

    fetchExchanges();
    fetchCoins();
  }, []);

  const calculateTransactionFee = async (sendingExchangeId: string, receivingExchangeId: string, coinId: string) => {
    setLoading(true);
    try {
      // Interact with the Google Generative AI API to suggest the best exchange
      const response = await generativeAI.predict({
        model: 'gemini-1.5-flash',  // Change this to the relevant model
        prompt: `Calculate the transaction fee for sending ${coinId} from ${sendingExchangeId} to ${receivingExchangeId}. Suggest the best exchange for sending and receiving ${coinId} with the lowest fees.`,
      });

      const bestExchangeResponse = response?.text ?? 'Unable to get suggestion.';
      const bestExchangeSuggested = exchanges.find((exchange) => bestExchangeResponse.includes(exchange.name));

      // Find the transaction fee for the selected pair (simulating transaction fee data here)
      const sendingExchange = exchanges.find((exchange) => exchange.id === sendingExchangeId);
      const receivingExchange = exchanges.find((exchange) => exchange.id === receivingExchangeId);

      setTransactionFee(sendingExchange?.fee ?? 0); // You can extend this to calculate based on both exchanges
      setBestExchange(bestExchangeSuggested || null);

    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Cryptocurrency Transaction Fee Calculator</h1>

      {/* Dropdown for Sending Exchange */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Sending Exchange</label>
        <select
          className="mt-2 p-2 w-full border rounded-md"
          onChange={(e) => setSelectedSendingExchange(e.target.value)}
        >
          <option value="">Select Sending Exchange</option>
          {exchanges.map((exchange) => (
            <option key={exchange.id} value={exchange.id}>
              {exchange.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for Receiving Exchange */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Receiving Exchange</label>
        <select
          className="mt-2 p-2 w-full border rounded-md"
          onChange={(e) => setSelectedReceivingExchange(e.target.value)}
        >
          <option value="">Select Receiving Exchange</option>
          {exchanges.map((exchange) => (
            <option key={exchange.id} value={exchange.id}>
              {exchange.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for Coin */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Coin</label>
        <select
          className="mt-2 p-2 w-full border rounded-md"
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="">Select a Coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Transaction Fee */}
      {transactionFee !== null && !loading && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Estimated Transaction Fee: {transactionFee}%
          </p>
        </div>
      )}

      {/* Suggested Best Exchange */}
      {bestExchange && (
        <div className="mt-6 bg-green-100 p-4 rounded-md">
          <p className="text-lg font-semibold">Best Exchange for Transaction: {bestExchange.name}</p>
          <p className="text-sm">Fee: {bestExchange.fee}%</p>
        </div>
      )}
    </div>
  );
};

export default PlatformFees;
