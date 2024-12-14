// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  FaFileAlt,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaTimes,
} from "react-icons/fa";
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
import html2pdf from "html2pdf.js";
import Heading from "../Layout/Heading/Heading";
import Blockchain from "../Pages/Blockchain/Blockchain";

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
  const [loading, setLoading] = useState<boolean>(true); // Initially true to apply blur
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://testdata-bh0z.onrender.com/get_transactions"
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
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

  const cryptoTaxRate = 0.3;
  const cryptoTax = totalTaxableAmount * cryptoTaxRate;

  const generatePDF = async () => {
    try {
      const response = await axios.get("https://testdata-bh0z.onrender.com/download_all_pages_pdf", {
        responseType: "blob", // Important for downloading files
      });
  
      // Create a download link and simulate a click to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "all_pages.pdf"; // Set the name for the downloaded file
      a.click();
      window.URL.revokeObjectURL(url); // Cleanup the object URL after download
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };
  

  return (
    <div className={`px-4 sm:px-6 lg:px-8 py-6 transition-all duration-500}`}>
      <Heading fontSize="xl" className="font-semibold text-left mb-8">
        Transactions
      </Heading>

      <div className="flex justify-center mb-6 blur-none">
        <button
          onClick={fetchTransactions}
          className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
        >
          Fetch Transactions
        </button>
      </div>
      <div
        className={`px-4 sm:px-6 lg:px-8 py-6 transition-all duration-500 ${
          loading ? "blur-sm" : ""
        }`}
      >
        {/* Wrap the content inside this div and apply blur based on loading state */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white text-black p-6 border-2 border-primary text-center">
            <h4 className="text-xl font-semibold text-primary mb-4">
              Total TDS Deducted
            </h4>
            <p className="text-2xl text-primary font-bold">
              ₹{totalTds.toFixed(2)}
            </p>

            <div className="mt-4">
              <p className="text-base text-gray-600">
                The total TDS deducted on your crypto transactions for the
                period. This value reflects the total amount of tax withheld at
                source and is applicable to your tax filing.
              </p>
            </div>
          </div>

          <div className="bg-white text-black p-6 border-2 border-primary text-center">
            <h4 className="text-xl font-semibold text-primary mb-4">
              Total Taxable Capital Gain
            </h4>
            <p className="text-2xl font-bold text-primary">
              ₹{totalTaxableAmount.toFixed(2)}
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-600">
                This represents the total taxable capital gain from your
                cryptocurrency holdings, which will be used to calculate the
                overall tax liability.
              </p>
            </div>
          </div>

          <div className="bg-white text-black p-6 border-2 border-primary text-center">
            <h4 className="text-xl font-semibold text-primary mb-4">
              Estimated Crypto Tax (15%)
            </h4>
            <p className="text-2xl font-bold text-primary">
              ₹{cryptoTax.toFixed(2)}
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-600">
                This is the estimated crypto tax at a rate of 30%. It is an
                approximation based on your taxable gains and will give you a
                rough idea of your tax obligation.
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
              <span className="text-lg font-medium">
                Reports needed to file ITR
              </span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-primary py-2 px-4 rounded-lg mt-4 hover:bg-gray-200"
            >
              Pay for full tax report
            </button>
            <button
              onClick={generatePDF}
              className="bg-primary text-white border-2 border-white py-2 px-4 rounded-lg mt-4 "
            >
              Download Reports
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-8">
          <div className="w-full sm:w-1/2 flex flex-col justify-center lg:w-1/2">
            <Heading
              fontSize="lg"
              className="font-semibold text-center p-4 mt-4"
            >
              Buy/Sell Transaction Percentage
            </Heading>
            <div className="max-w-xs mx-auto">
              <Pie data={buySellChartData} />
            </div>
          </div>

          <div className="w-full sm:w-1/2 flex flex-col justify-center lg:w-3/4">
            <Heading
              fontSize="lg"
              className="font-semibold text-center p-4 mt-4"
            >
              Transaction Amounts by Date
            </Heading>
            <div className="">
              <Bar data={dateCapitalGainChartData} />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-4/5 sm:w-1/3">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold text-primary">
                Crypto Tax Payment
              </h1>
              <button className="" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <Blockchain />

            <div className=""></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsContent;
