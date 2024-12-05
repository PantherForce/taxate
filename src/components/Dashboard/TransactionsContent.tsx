// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { FaFileAlt, FaFileInvoiceDollar, FaClipboardCheck } from 'react-icons/fa';
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
import html2pdf from 'html2pdf.js';
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

  const dateCapitalGainData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const capitalGain = parseFloat(transaction.capital_gain_usd || "0");

    if (capitalGain > 0) {
      if (!acc[monthYear]) acc[monthYear] = 0;
      acc[monthYear] += capitalGain;
    }
    return acc;
  }, {});

  const months = Object.keys(dateCapitalGainData);
  const capitalGains = months.map((month) => dateCapitalGainData[month]);

  const dateCapitalGainChartData = {
    labels: months,
    datasets: [
      {
        label: "Capital Gain (USD)",
        data: capitalGains,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const totalTds = transactions.reduce(
    (acc, transaction) => acc + parseFloat(transaction.tds_deducted_usd || "0"),
    0
  );

  const totalTaxableAmount = transactions.reduce(
    (acc, transaction) =>
      transaction.transaction_type === "Sell"
        ? acc + parseFloat(transaction.capital_gain_usd || "0")
        : acc,
    0
  );

  const cryptoTaxRate = 0.30;
  const cryptoTax = totalTaxableAmount * cryptoTaxRate;

  const generatePDF = () => {
    const reportHTML = `
      <div class="font-sans p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        
        <!-- Title Section -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-gray-800">Taxate Transaction Report</h1>
        </div>
  
        <!-- Total TDS Deducted Section -->
        <div class="mb-8 p-6 rounded-xl">
          <h2 class="text-2xl font-semibold text-primary mb-3">Total TDS Deducted</h2>
          <p class="text-2xl text-gray-800 mb-3">₹${totalTds.toFixed(2)}</p>
          <p class="text-sm text-black leading-relaxed">This is the total Tax Deducted at Source (TDS) deducted on your cryptocurrency transactions during the given period. This amount will be adjusted when filing your tax returns.</p>
        </div>
  
        <!-- Total Taxable Capital Gain Section -->
        <div class="mb-8 p-6 rounded-xl">
          <h2 class="text-2xl font-semibold text-primary  mb-3">Total Taxable Capital Gain</h2>
          <p class="text-2xl text-gray-800 mb-3">₹${totalTaxableAmount.toFixed(2)}</p>
          <p class="text-sm text-black leading-relaxed">This represents the total taxable capital gain derived from your cryptocurrency holdings for the specified period. It is the amount on which tax will be calculated.</p>
        </div>
  
        <!-- Estimated Crypto Tax Section -->
        <div class="mb-8 p-6 rounded-xl">
          <h2 class="text-2xl font-semibold text-primary  mb-3">Estimated Crypto Tax (30%)</h2>
          <p class="text-2xl text-gray-800 mb-3">₹${cryptoTax.toFixed(2)}</p>
          <p class="text-sm text-black leading-relaxed">This is the estimated tax liability on your crypto capital gains, calculated at the rate of 30%. Please note that this is an approximation and may vary based on actual taxable income.</p>
        </div>
  
        <!-- Buy/Sell Transactions Section -->
        <div class="mb-8 p-6 rounded-xl">
          <h2 class="text-2xl font-semibold text-primary  mb-3">Buy/Sell Transactions</h2>
          <p class="text-xl text-gray-800 mb-3">Buy Transactions: <strong>${buySellData.buy}</strong> | Sell Transactions: <strong>${buySellData.sell}</strong></p>
          <p class="text-sm text-black leading-relaxed">These are the total numbers of buy and sell transactions recorded during the period. This data is essential to calculate your capital gains and tax obligations.</p>
        </div>
  
        <!-- Capital Gain by Date Section -->
        <div class="mb-8 p-6  mt-60 rounded-xl">
          <h2 class="text-2xl font-semibold text-primary  mb-3">Capital Gain by Date</h2>
          <ul class="text-xl text-gray-800 space-y-3">
            ${months.map((month, index) => {
              return `
                <li class="flex justify-between border-b pb-3">
                  <span>${month}</span>
                  <span>₹${capitalGains[index].toFixed(2)}</span>
                </li>`;
            }).join("")}
          </ul>
          <p class="text-sm text-gray-500 mt-4">This section breaks down the capital gains by each month. You can use this data to understand how your crypto holdings have appreciated over time.</p>
        </div>
  
        <!-- Footer Section -->
        <div class="text-center mt-12 text-lg text-gray-500 border-t pt-8">
          <p><strong class="text-primary">Crypto Tax Summary</strong> | <strong class="text-primary">Crypto TDS Summary</strong> | <strong class="text-primary">Reports Needed to File ITR</strong></p>
          <p class="text-sm text-gray-400">Please ensure all your crypto transactions are accounted for in the tax filing process.</p>
        </div>
        
      </div>
    `;
  
    // Create the HTML element
    const element = document.createElement('div');
    element.innerHTML = reportHTML;
    document.body.appendChild(element);
  
    // Generate the PDF and remove the element from DOM after saving
    html2pdf()
      .from(element)
      .save("crypto_transaction_reports.pdf")
      .then(() => document.body.removeChild(element));
  };
  
  
  

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

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">Total TDS Deducted</h4>
          <p className="text-2xl text-primary font-bold">₹{totalTds.toFixed(2)}</p>

          <div className="mt-4">
          <p className="text-base text-gray-600">
            The total TDS deducted on your crypto transactions for the period. This value reflects the total amount of tax withheld at source and is applicable to your tax filing.
          </p>
        </div>

        </div>

        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">Total Taxable Capital Gain</h4>
          <p className="text-2xl font-bold text-primary">₹{totalTaxableAmount.toFixed(2)}</p>
          <div className="mt-4">
          <p className="text-base text-gray-600">
            This represents the total taxable capital gain from your cryptocurrency holdings, which will be used to calculate the overall tax liability.
          </p>
        </div>
        </div>

        <div className="bg-white text-black p-6 border-2 border-primary text-center">
          <h4 className="text-xl font-semibold text-primary mb-4">Estimated Crypto Tax (15%)</h4>
          <p className="text-2xl font-bold text-primary">₹{cryptoTax.toFixed(2)}</p>
          <div className="mt-4">
          <p className="text-base text-gray-600">
            This is the estimated crypto tax at a rate of 30%. It is an approximation based on your taxable gains and will give you a rough idea of your tax obligation.
          </p>
        </div>
        </div>

        <div className="bg-primary text-white p-6 rounded-lg space-y-6 flex flex-col">
          <div className="flex items-center space-x-2">
            <FaFileAlt className="text-xl" />
            <span className="text-lg font-medium">Crypto Tax Summary</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaFileInvoiceDollar className="text-xl" />
            <span className="text-lg font-medium">Crypto TDS Summary</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClipboardCheck className="text-xl" />
            <span className="text-lg font-medium">Reports needed to file ITR</span>
          </div>
          <button onClick={generatePDF} className="bg-white text-primary py-2 px-4 rounded-lg mt-4 hover:bg-gray-200">
            Download Reports
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-8">
        <div className="w-full sm:w-1/2 flex flex-col justify-center lg:w-1/2">
          <Heading fontSize="lg" className="font-semibold text-center p-4 mt-4">
            Buy/Sell Transaction Percentage
          </Heading>
          <div className="max-w-xs mx-auto">
            <Pie data={buySellChartData} />
          </div>
        </div>

        <div className="w-full sm:w-1/2 flex flex-col justify-center lg:w-3/4">
          <Heading fontSize="lg" className="font-semibold text-center p-4 mt-4">
            Transaction Amounts by Date
          </Heading>
          <div className="">
            <Bar data={dateCapitalGainChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsContent;
