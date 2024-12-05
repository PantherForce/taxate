// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CsvUploadProps {
  setActiveStep: React.Dispatch<React.SetStateAction<string>>;
}

const Overview: React.FC<CsvUploadProps> = ({ setActiveStep }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Toastify notifications
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCsvFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!csvFile) {
      notifyError("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await axios.post(
        "https://testdata-bh0z.onrender.com/upload_csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      notifySuccess(response.data.message); // Show success toast
      setActiveStep("transactions"); // Move to transactions step after uploading CSV
    } catch (error) {
      notifyError("Error uploading the file!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-black mb-8">
        Upload Your CSV
      </h2>

      {/* File Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full max-w-md p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleFileUpload}
          className="w-full max-w-md bg-primary text-white px-6 py-3 rounded-lg shadow-md"
        >
          Upload CSV
        </button>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Overview;
