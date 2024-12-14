// @ts-nocheck 
import React, { useState } from "react"; 
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

interface CsvUploadProps { 
  setActiveStep: React.Dispatch<React.SetStateAction<string>>; // Function to change the step 
}

const CsvUpload: React.FC<CsvUploadProps> = ({ setActiveStep }) => { 
  const [csvFile, setCsvFile] = useState<File | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);

  // Toastify notifications 
  const notifySuccess = (message: string) => toast.success(message); 
  const notifyError = (message: string) => toast.error(message);

  // Handle file change 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    if (event.target.files) { 
      setCsvFile(event.target.files[0]); 
    } 
  };

  // Handle file upload 
  const handleFileUpload = async () => { 
    if (!csvFile) { 
      notifyError("Please select a file first!"); 
      return; 
    } 

    const formData = new FormData(); 
    formData.append("file", csvFile);

    try { 
      setLoading(true); 
      const response = await axios.post( 
        "https://testdata-bh0z.onrender.com/upload_csv", 
        formData, 
        { 
          headers: { "Content-Type": "multipart/form-data" }, 
        } 
      ); 
      notifySuccess(response.data.message); // Show success toast 
      setLoading(false); 
      // Once upload is successful, change the step to "portfolio" 
      setActiveStep("portfolio"); 
    } catch (error) { 
      setLoading(false); 
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
        <label
            
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
        <button
          onClick={handleFileUpload}
          className="w-full max-w-md bg-primary text-white px-6 py-3 rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p>If you're unsure about the file format, download a sample CSV:</p>
        <a
          href="/File/deatils-1.csv" 
          download
          className="mt-2 inline-block border-2 border-black p-4 text-primary font-semibold"
        >
          Download Sample CSV
        </a>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default CsvUpload;
