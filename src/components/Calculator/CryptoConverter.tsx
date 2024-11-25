import React, { useState, useEffect } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import Button from "../Layout/Button/Button";
import Footer from "../Footer/Footer";
import LoadingSpinner from "../Loader/LoadingSpinner";
import FAQ from "../Faq/Faq";

const API_URL = "https://api.coincap.io/v2/assets";

const CryptoConverter: React.FC = () => {
  const [inputAmountUSD, setInputAmountUSD] = useState<number | "">(""); // User input in USD
  const [outputAmountCrypto, setOutputAmountCrypto] = useState<number | "">(""); // Converted amount of selected crypto
  const [conversionRateCrypto, setConversionRateCrypto] = useState<number>(0); // Price of selected crypto in USD
  const [conversionRateUSDT, setConversionRateUSDT] = useState<number>(1); // Price of USDT in USD (typically 1, as USDT = USD)
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin"); // Default to Bitcoin
  const [error, setError] = useState<string>(""); // Error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [cryptos, setCryptos] = useState<any[]>([]); // List of all cryptos

  // Fetch all available cryptocurrencies from the CoinCap API
  const fetchCryptos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok && data.data) {
        setCryptos(data.data);
      } else {
        setError("Failed to fetch cryptocurrency data.");
      }
    } catch (err) {
      console.error("Error fetching cryptocurrencies:", err);
      setError("Failed to fetch cryptocurrencies.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch price for selected cryptocurrency in USD
  const fetchCryptoPrice = async (crypto: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${crypto}`);
      const data = await response.json();
      
      if (response.ok && data.data && data.data.priceUsd) {
        const price = parseFloat(data.data.priceUsd);
        if (!isNaN(price)) {
          setConversionRateCrypto(price);
          setError(""); // Clear any previous errors
        } else {
          setError("Invalid price data for cryptocurrency.");
        }
      } else {
        setError("Failed to fetch the price data.");
      }
    } catch (err) {
      console.error("Error fetching price for crypto:", err);
      setError("Failed to fetch the price for selected cryptocurrency.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the price for USDT to use as USD reference (typically 1 USDT = 1 USD)
  const fetchUSDTPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.coincap.io/v2/assets/usdt");
      const data = await response.json();
      
      if (response.ok && data.data && data.data.priceUsd) {
        const price = parseFloat(data.data.priceUsd);
        setConversionRateUSDT(price); // Typically, USDT is 1 USD, but fetching for accuracy
      } else {
        setError("Failed to fetch USDT price.");
      }
    } catch (err) {
      console.error("Error fetching USDT price:", err);
      setError("Failed to fetch USDT price.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all necessary data on page load
  useEffect(() => {
    fetchCryptos(); // Fetch available cryptocurrencies
    fetchUSDTPrice(); // Fetch USDT price
  }, []);

  // Fetch price for the selected crypto whenever it changes
  useEffect(() => {
    if (selectedCrypto) {
      fetchCryptoPrice(selectedCrypto);
    }
  }, [selectedCrypto]);

  // Handle conversion logic (USD to crypto)
  const handleConvert = () => {
    if (inputAmountUSD && !isNaN(Number(inputAmountUSD)) && conversionRateCrypto > 0) {
      const usdAmountInUSDT = Number(inputAmountUSD) / conversionRateUSDT; // Convert USD into USDT
      const cryptoAmount = usdAmountInUSDT / conversionRateCrypto; // Convert USDT to selected crypto
      setOutputAmountCrypto(cryptoAmount);
    } else {
      setError("Invalid input or no conversion rate found.");
    }
  };

  // Handle crypto selection change
  const handleCryptoChange = (crypto: string) => {
    setSelectedCrypto(crypto);
    setOutputAmountCrypto(""); // Clear the previous result
    fetchCryptoPrice(crypto); // Fetch the new crypto's price
  };

  // Handle USD input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmountUSD(Number(e.target.value));
    if (Number(e.target.value) && conversionRateCrypto > 0 && conversionRateUSDT > 0) {
      const usdAmountInUSDT = Number(e.target.value) / conversionRateUSDT; // Convert USD into USDT
      const cryptoAmount = usdAmountInUSDT / conversionRateCrypto; // Convert USDT to selected crypto
      setOutputAmountCrypto(cryptoAmount); // Update the result dynamically
    }
  };

  return (
    <>
      <Navbar />
      <ContentContainer>
        <div className="text-center flex justify-center items-center">
          <Heading
            fontSize="xl"
            fontColor="text-gray-900"
            className="text-center mb-4 font-bold"
          >
            Free Crypto Converter - Convert USD to Cryptos
          </Heading>
        </div>

        <div className="flex flex-col justify-center items-center md:flex-row gap-8">
          <div className="bg-white p-8 w-full">
            <div className="mb-4">
              <Text
                className="font-semibold"
                fontSize="xl"
                fontColor="text-gray-700"
              >
                Select Cryptocurrency
              </Text>
              <select
                value={selectedCrypto}
                onChange={(e) => handleCryptoChange(e.target.value)}
                className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
              >
                {cryptos.map((crypto) => (
                  <option key={crypto.id} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-10 mb-6">
              <div>
                <Text
                  className="font-semibold"
                  fontSize="xl"
                  fontColor="text-gray-700"
                >
                  Enter Amount in USD
                </Text>
                <input
                  type="number"
                  value={inputAmountUSD}
                  onChange={handleAmountChange}
                  className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
                  placeholder={`Enter amount in USD`}
                />
              </div>
            </div>

            <div className="">
              <div className="p-4 bg-[#E0EAE8] rounded-md text-center">
                <Text
                  fontSize="xl"
                  fontColor="text-[#2A3D3B]"
                  className="font-semibold"
                >
                  Equivalent in {selectedCrypto}
                </Text>
                <Heading fontSize="2xl" fontColor="text-[#2A3D3B]">
                  <p className="text-[#2A3D3B] mt-2 font-bold">
                    {outputAmountCrypto === "" ? (
                      `${selectedCrypto} 0`
                    ) : (
                      <>
                        <span className="font-bold">
                          {outputAmountCrypto.toLocaleString("en-US", {
                            maximumFractionDigits: 6,
                          })}
                        </span>{" "}
                        {selectedCrypto}
                      </>
                    )}
                  </p>
                </Heading>
              </div>
            </div>

            {/* {error && (
              <div className="mt-4 text-red-600 text-center">
                <Text>{error}</Text>
              </div>
            )} */}

            {loading && <LoadingSpinner />}
          </div>

          <div className=" p-4 bg-primary flex flex-col items-center justify-center w-full rounded-xl md:w-[600px] h-[30vh] text-white rounded-md text-center">
            <Heading
              className="font-semibold"
              fontSize="lg"
              fontColor="text-white"
            >
              Start Converting Today!
            </Heading>
            <Text fontSize="md" fontColor="text-white" className="mt-2">
              Use our crypto converter tool to easily convert between USD and
              cryptocurrencies.
            </Text>
            <Button
              fontSize="xl"
              fontColor="text-black"
              height="50px"
              width="80%"
              className="mt-4 bg-white font-semibold"
            >
              Get Started →
            </Button>
          </div>
        </div>

        <FAQ />
      </ContentContainer>

      <Footer />
    </>
  );
};

export default CryptoConverter;
