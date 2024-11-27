// @ts-nocheck

import React, { useState } from "react";

interface Transaction {
  transaction_type: string;
  date: string;
  deposit_type: string;
  fiat_amount: string;
  symbol: string;
  crypto_quantity: string;
  transaction_id: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setError("");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://testdata-bh0z.onrender.com/upload_csv",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        setError(data.error || "An error occurred while uploading the file.");
      }
    } catch (err) {
      setError("Network error or server issue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-5 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload CSV File</h2>

      {/* File Input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block mb-4"
      />

      <button
        onClick={handleFileUpload}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Error or Success Message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* Display Transactions */}
      {transactions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <table className="min-w-full mt-3 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Transaction Type</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Deposit Type</th>
                <th className="border p-2">Fiat Amount</th>
                <th className="border p-2">Symbol</th>
                <th className="border p-2">Crypto Quantity</th>
                <th className="border p-2">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border p-2">{transaction.transaction_type}</td>
                  <td className="border p-2">{transaction.date}</td>
                  <td className="border p-2">{transaction.deposit_type}</td>
                  <td className="border p-2">{transaction.fiat_amount}</td>
                  <td className="border p-2">{transaction.symbol}</td>
                  <td className="border p-2">{transaction.crypto_quantity}</td>
                  <td className="border p-2">{transaction.transaction_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
