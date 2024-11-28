// @ts-nocheck
import React, { useState, useEffect } from "react";
import Heading from "../Layout/Heading/Heading";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API requests

type Exchange = {
  id: number;
  name: string;
  category: "Partners" | "Popular" | "Exchanges" | "Wallets" | "Blockchains";
  logo: string;
};

const Integration: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All integrations");
  const [searchTerm, setSearchTerm] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]); // State to store fetched exchanges

  // Fetch the exchange data when the component mounts
  useEffect(() => {
    axios
      .get("https://testdata-bh0z.onrender.com/get_exchanges")
      .then((response) => {
        console.log("API Response:", response.data); // Log the entire response to check structure

        // The data now has the 'exchanges' key, so we need to update how we access it
        if (response.data && Array.isArray(response.data.exchanges)) {
          setExchanges(response.data.exchanges); // Set the 'exchanges' array
        } else {
          toast.error("Invalid data structure received from the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange data:", error);
        toast.error("Failed to fetch exchange data.");
      });
  }, []);

  // Filter exchanges based on selected category and search term
  const filteredExchanges = exchanges.filter(
    (exchange) =>
      (selectedCategory === "All integrations" ||
        exchange.category === selectedCategory) &&
      exchange.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle CSV file upload
  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.type === "text/csv") {
        setCsvFile(file);
        setUploadStatus("Uploading...");

        Papa.parse(file, {
          complete: (result) => {
            localStorage.setItem("csvData", JSON.stringify(result.data));
            setUploadStatus("CSV file uploaded successfully!");
            toast.success("CSV file uploaded successfully!");
          },
          header: true,
          skipEmptyLines: true,
          error: (error) => {
            setUploadStatus("Error parsing CSV file.");
            toast.error("Error parsing CSV file.");
          },
        });
      } else {
        setUploadStatus("Please upload a valid CSV file.");
        toast.error("Please upload a valid CSV file.");
      }
    } else {
      setUploadStatus("No file selected.");
      toast.error("No file selected.");
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
        <Heading fontSize="xl" className="font-semibold">
          Add Integration
        </Heading>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search your wallets, exchanges & integrations..."
            className="w-full h-14 bg-gray-50 p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-6 border-dashed border-2 p-6 border-gray-300 rounded-lg flex justify-center items-center hover:bg-blue-50 hover:border-blue-300 transition duration-200 ease-in-out">
          <div className="text-center space-y-3">
            <label
              htmlFor="csv-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-lg text-gray-700 mt-2 font-semibold">
                Upload CSV
              </p>
            </label>
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
            {uploadStatus && (
              <p className="mt-1 text-sm text-gray-500">{uploadStatus}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "All integrations",
            "Partners",
            "Popular",
            "Exchanges",
            "Wallets",
            "Blockchains",
          ].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } focus:outline-none`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredExchanges.map((exchange) => (
            <div
              key={exchange.id}
              className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <img
                src={exchange.logo}
                alt={exchange.name}
                className="w-10 h-10 mb-2"
              />
              <p className="text-sm font-medium text-gray-800">
                {exchange.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Integration;
