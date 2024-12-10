// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { FaFileAlt, FaFileInvoiceDollar, FaClipboardCheck, FaShoppingCart, FaMoneyBillWave, FaRegCreditCard, FaBalanceScale } from "react-icons/fa";
import Heading from "../Layout/Heading/Heading";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import html2pdf from 'html2pdf.js';


const Taxes: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Initially true to apply blur


  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://testdata-bh0z.onrender.com/get_transactions"
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false)
    }
  };

  const buySellData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.transaction_type === "Buy") acc.buy += 1;
      if (transaction.transaction_type === "Sell") acc.sell += 1;
      if (transaction.transaction_type === "Spot") acc.spot += 1;
      return acc;
    },
    { buy: 0, sell: 0, spot: 0 }
  );

  const transactionSummary = [
    { type: "Buy", count: buySellData.buy, icon: <FaShoppingCart /> },
    { type: "Sell", count: buySellData.sell, icon: <FaMoneyBillWave /> },
    { type: "Spot", count: buySellData.spot, icon: <FaRegCreditCard /> },
  ];

  const dateCapitalGainData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const capitalGain = parseFloat(transaction.capital_gain_usd || "0");

    if (capitalGain !== 0) {
      if (!acc[monthYear]) acc[monthYear] = 0;
      acc[monthYear] += capitalGain;
    }
    return acc;
  }, {});

  const months = Object.keys(dateCapitalGainData);
  const monthClasses = months.map((month) => {
    return dateCapitalGainData[month] < 0
      ? "bg-red-500 text-white"
      : "bg-green-500 text-white";
  });

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

  const capitalGains = months.map((month) => dateCapitalGainData[month]);


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

  const cryptoTaxRate = 0.15;
  const cryptoTax = totalTaxableAmount * cryptoTaxRate;

  return (
    <>
   
    <div className="px-4 bg-gray-50 sm:px-6 lg:px-8 py-6">
      <Heading fontSize="xl" className="font-semibold text-left mb-8">
        Taxes
      </Heading>

      <ContentContainer>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchTransactions}
          className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
        >
          Fetch Transactions
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white  text-black p-6  text-center">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold text-primary">₹{totalTaxableAmount.toFixed(2)}</p>
            <h4 className="text-xl font-semibold text-primary mb-4">Total Taxable Capital Gain</h4>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold text-primary">₹{cryptoTax.toFixed(2)}</p>
            <h4 className="text-xl font-semibold text-primary mb-4">Estimated Crypto Tax (30%)</h4>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-2xl text-primary font-bold">₹{totalTds.toFixed(2)}</p>
            <h4 className="text-xl font-semibold text-primary mb-4">Total TDS Deducted</h4>
          </div>
        </div>

        <div className="bg-primary text-white p-6 rounded-lg space-y-6 flex flex-col">
          <div className="flex items-center space-x-2">
            <FaFileAlt color="white" className="text-xl" />
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

      <div className="mt-8">
        <Heading fontSize="lg" className="font-semibold text-center mb-4">
          Transaction Type Summary
        </Heading>
        <div className="grid grid-cols-3 gap-4">
          {transactionSummary.map((transaction, index) => (
            <div
              key={index}
              className="bg-primary text-white p-4 text-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl ">{transaction.icon}</div>
              <p className="text-xl font-semibold">{transaction.type}</p>
              <p className="text-2xl font-medium">{transaction.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <Heading fontSize="md" className="font-semibold text-center mb-4">
            Realized Gains
          </Heading>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {months.map((month, index) => {
              const capitalGain = dateCapitalGainData[month];
              const isGain = capitalGain > 0;
              return (
                isGain && (
                  <div
                    key={index}
                    className="text-center p-4 transition-all duration-300 transform hover:scale-105"
                  >
                    <p className="text-lg">{month}</p>
                    <p className="text-xl font-semibold text-green-500">
                      ₹{capitalGain?.toFixed(2)}
                    </p>
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <Heading fontSize="md" className="font-semibold text-center mb-4">
            Realized Losses
          </Heading>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {months.map((month, index) => {
              const capitalGain = dateCapitalGainData[month];
              const isLoss = capitalGain <= 0;
              return (
                isLoss && (
                  <div
                    key={index}
                    className="text-center p-4 transition-all duration-300 transform hover:scale-105"
                  >
                    <p className="text-lg">{month}</p>
                    <p className="text-xl font-semibold text-red-500">
                      {capitalGain === 0 ? "N/A" : `₹${capitalGain?.toFixed(2)}`}
                    </p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      </ContentContainer>
    </div>
 
    </>
  );
};

export default Taxes;
