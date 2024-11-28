// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
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
import Heading from "../Layout/Heading/Heading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TransactionsContent: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://testdata-bh0z.onrender.com/get_transactions"
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const buySellData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.transaction_type === "Buy") acc.buy += 1;
      if (transaction.transaction_type === "Sell") acc.sell += 1;
      return acc;
    },
    { buy: 0, sell: 0 }
  );

  const buySellChartData = {
    labels: ["Buy", "Sell"],
    datasets: [
      {
        data: [buySellData.buy, buySellData.sell],
        backgroundColor: ["#1C3F3A", "#F4F1E6"],
        hoverBackgroundColor: ["#4E8BE0", "#FF4D6E"],
      },
    ],
  };

  const dateAmountData = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    const amount = parseFloat(transaction.amount_in_crypto);
    if (!acc[date]) acc[date] = { buy: 0, sell: 0 };
    if (transaction.transaction_type === "Buy") acc[date].buy += amount;
    if (transaction.transaction_type === "Sell") acc[date].sell += amount;
    return acc;
  }, {});

  const dates = Object.keys(dateAmountData);
  const buyAmounts = dates.map((date) => dateAmountData[date].buy);
  const sellAmounts = dates.map((date) => dateAmountData[date].sell);

  const dateAmountChartData = {
    labels: dates,
    datasets: [
      {
        label: "Buy Amount (BTC)",
        data: buyAmounts,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Sell Amount (BTC)",
        data: sellAmounts,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  const totalTds = transactions.reduce(
    (acc, transaction) => acc + parseFloat(transaction.tds_deducted_usd),
    0
  );
  const totalTaxableAmount = transactions.reduce(
    (acc, transaction) =>
      acc +
      (transaction.transaction_type === "Sell"
        ? parseFloat(transaction.capital_gain_usd)
        : 0),
    0
  );

  const cryptoTaxRate = 0.3;
  const cryptoTax = totalTaxableAmount * cryptoTaxRate;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Heading fontSize="xl" className="font-semibold text-left mb-8">
        Transactions
      </Heading>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchTransactions}
          className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
        >
          Fetch Transactions
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {/* Card for Total TDS Deducted */}
        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">
            Total TDS Deducted
          </h4>
          <p className="text-2xl text-primary  font-bold">
            ₹{totalTds.toFixed(2)}
          </p>
        </div>

        {/* Card for Total Taxable Capital Gain */}
        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">
            Total Taxable Capital Gain
          </h4>
          <p className="text-2xl font-bold text-primary">
            ₹{totalTaxableAmount.toFixed(2)}
          </p>
        </div>

        {/* Card for Estimated Crypto Tax */}
        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">
            Estimated Crypto Tax (15%)
          </h4>
          <p className="text-2xl font-bold text-primary">
            ₹{cryptoTax.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex gap-8 flex-row">
        <div className="mt-8">
          <Heading fontSize="lg" className="font-semibold  text-center p-2 ">
            Buy/Sell Transaction Percentage
          </Heading>
          <div className="max-w-xs mx-auto">
            <Pie data={buySellChartData} />
          </div>
        </div>

        <div className="mb-6">
          <Heading
            fontSize="lg"
            className="font-semibold  text-center p-4 mt-4"
          >
            Transaction Amounts by Date
          </Heading>
          <div className="max-w-4xl mx-auto">
            <Bar data={dateAmountChartData} />
          </div>
        </div>
      </div>
      {/* 
      {transactions.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 mb-8">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Crypto Asset</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Transaction Type</th>
                <th className="px-6 py-3 text-left">Price per Unit (USD)</th>
                <th className="px-6 py-3 text-left">Total Value (USD)</th>
                <th className="px-6 py-3 text-left">Fees (USD)</th>
                <th className="px-6 py-3 text-left">Capital Gain (USD)</th>
                <th className="px-6 py-3 text-left">TDS Deducted (USD)</th>
                <th className="px-6 py-3 text-left">Holding Period (Days)</th>
                <th className="px-6 py-3 text-left">Platform</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.transaction_id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">{transaction.transaction_id}</td>
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.crypto_asset}</td>
                  <td className="px-6 py-4">{transaction.amount_in_crypto}</td>
                  <td className="px-6 py-4">{transaction.transaction_type}</td>
                  <td className="px-6 py-4">
                    {transaction.price_per_unit_usd}
                  </td>
                  <td className="px-6 py-4">{transaction.total_value_usd}</td>
                  <td className="px-6 py-4">{transaction.fees_usd}</td>
                  <td className="px-6 py-4">{transaction.capital_gain_usd}</td>
                  <td className="px-6 py-4">{transaction.tds_deducted_usd}</td>
                  <td className="px-6 py-4">
                    {transaction.holding_period_days}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.transaction_platform}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
};

export default TransactionsContent;
