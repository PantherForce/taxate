import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  transactionType: string;
  date: string;
  depositType: string;
  fiatAmount: string;
  symbol: string;
  cryptoQuantity: string;
  transactionId: string;
}

const App: React.FC = () => {
  const [csvData, setCsvData] = useState<Transaction[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [transactionSummary, setTransactionSummary] = useState<any>({
    spot: 0,
    deposit: 0,
    withdrawal: 0,
    others: 0,
  });

  // Handle CSV file upload and parse
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setUploading(true);
      Papa.parse(file, {
        complete: (result) => {
          const transactions: Transaction[] = result.data.map((row: any) => ({
            transactionType: row['Transaction Type'],
            date: row['Date'],
            depositType: row['Deposit Type'],
            fiatAmount: row['Fiat Amount'],
            symbol: row['Symbol'],
            cryptoQuantity: row['Crypto Quantity'],
            transactionId: row['Transaction ID'],
          }));

          setCsvData(transactions);
          calculateTransactionSummary(transactions);
          setUploading(false);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  // Calculate the transaction summary
  const calculateTransactionSummary = (transactions: Transaction[]) => {
    let spot = 0;
    let deposit = 0;
    let withdrawal = 0;
    let others = 0;

    transactions.forEach((transaction) => {
      if (transaction.transactionType.toLowerCase().includes('spot')) {
        spot++;
      } else if (transaction.transactionType.toLowerCase().includes('deposit')) {
        deposit++;
      } else if (transaction.transactionType.toLowerCase().includes('withdrawal')) {
        withdrawal++;
      } else {
        others++;
      }
    });

    const total = spot + deposit + withdrawal + others;
    setTransactionSummary({
      spot: ((spot / total) * 100).toFixed(2),
      deposit: ((deposit / total) * 100).toFixed(2),
      withdrawal: ((withdrawal / total) * 100).toFixed(2),
      others: ((others / total) * 100).toFixed(2),
    });
  };

  // Data for pie charts
  const chartData = {
    labels: ['Spot', 'Deposit', 'Withdrawal', 'Others'],
    datasets: [
      {
        data: [
          parseFloat(transactionSummary.spot),
          parseFloat(transactionSummary.deposit),
          parseFloat(transactionSummary.withdrawal),
          parseFloat(transactionSummary.others),
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#FF5733'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#FF5733'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Settings Section */}
        <div className="p-6 border rounded-md shadow-md bg-white">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-2">
            <p><strong>Country:</strong> INDIA</p>
            <p><strong>Base Currency:</strong> INR</p>
            <p><strong>Calculation Method:</strong> First-in First-out (FIFO)</p>
          </div>
        </div>

        {/* Integrated Platform Section */}
        <div className="p-6 border rounded-md shadow-md bg-white flex items-center justify-start">
          <img src="https://via.placeholder.com/50" alt="Mudrex Logo" className="mr-4" />
          <span className="text-xl font-bold">Mudrex</span>
        </div>

        {/* Transaction Summary Section with Pie Charts */}
        <div className="p-6 border rounded-md shadow-md bg-white">
          <h2 className="text-xl font-bold mb-4">Transaction Summary</h2>
          <div className="flex flex-col items-center">
            {uploading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="w-full h-64">
                  <Pie data={chartData} />
                </div>
                <div className="mt-4 space-y-2">
                  <p><strong>Spot:</strong> {transactionSummary.spot}%</p>
                  <p><strong>Deposit:</strong> {transactionSummary.deposit}%</p>
                  <p><strong>Withdrawal:</strong> {transactionSummary.withdrawal}%</p>
                  <p><strong>Others:</strong> {transactionSummary.others}%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mt-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 px-4 py-2 border rounded-md bg-gray-100"
        />
      </div>
    </div>
  );
};

export default App;
