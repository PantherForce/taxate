import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

type CSVData = {
  date: string;
  amount: number;
  category: "Profit" | "Loss";
};

const Overview: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVData[]>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalLoss, setTotalLoss] = useState<number>(0);

  useEffect(() => {
    const storedCsvData = localStorage.getItem("csvData");
    if (storedCsvData) {
      const parsedData = JSON.parse(storedCsvData);
      const formattedData = parsedData.map((item: any) => ({
        date: item.date,
        amount: parseFloat(item.amount),
        category: item.category === "Profit" ? "Profit" : "Loss",
      }));

      setCsvData(formattedData);
      calculateTotals(formattedData);
    }
  }, []);

  const calculateTotals = (data: CSVData[]) => {
    const profit = data.filter((item) => item.category === "Profit").reduce((acc, item) => acc + item.amount, 0);
    const loss = data.filter((item) => item.category === "Loss").reduce((acc, item) => acc + item.amount, 0);
    setTotalProfit(profit);
    setTotalLoss(loss);
  };

  const profitLossChartData = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        label: "Profit/Loss",
        data: [totalProfit, totalLoss],
        backgroundColor: ["#38A169", "#E53E3E"],
        borderColor: ["#38A169", "#E53E3E"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: csvData.map((item) => item.date),
    datasets: [
      {
        label: "Amount Over Time",
        data: csvData.map((item) => item.amount),
        fill: false,
        borderColor: "#4299E1",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 rounded-xl shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">CSV Data Overview</h1>
      
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 text-center">Profit/Loss Distribution</h2>
          <Pie data={profitLossChartData} options={{ responsive: true }} />
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 text-center">Amount Over Time</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((item, index) => (
              <tr key={index} className={`${item.category === "Profit" ? "bg-green-50" : "bg-red-50"} hover:bg-gray-100`}>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">₹{item.amount.toFixed(2)}</td>
                <td className="px-4 py-3">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 text-lg font-semibold">
        <div className="text-green-600">Total Profit: ₹{totalProfit.toFixed(2)}</div>
        <div className="text-red-600">Total Loss: ₹{totalLoss.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Overview;
