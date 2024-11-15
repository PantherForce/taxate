import React, { useState, useEffect } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import Button from "../Layout/Button/Button";
import Footer from "../Footer/Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingSpinner from "../Loader/LoadingSpinner";
import FAQ from "../Faq/Faq";

const CryptoConverter: React.FC = () => {
  const [inputAmountUSD, setInputAmountUSD] = useState<number | "">("");
  const [outputAmountCrypto, setOutputAmountCrypto] = useState<number | "">("");
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generativeAI = new GoogleGenerativeAI(
    "AIzaSyDj1d-KGQHhn7S4bCKz4021Do4Y6HAmTAw"
  );

  const fetchCryptoPrice = async (crypto: string) => {
    setLoading(true); // Start loading state
    setError(""); // Reset any previous errors
    try {
      const prompt = `What is the current price of ${crypto} in USD?`;
      const response = await generativeAI.query({
        model: "gemini-1.5-flash",
        prompt,
      });

      const price = parseFloat(
        response?.text?.trim().replace(/[^\d.-]/g, "") || "0"
      );

      if (!price) {
        throw new Error("Price not found");
      }

      setConversionRate(price);
      setError("");
    } catch (err) {
      setError("Failed to fetch the price. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    fetchCryptoPrice(selectedCrypto);
  }, [selectedCrypto]);

  const handleConvert = () => {
    if (
      inputAmountUSD &&
      !isNaN(Number(inputAmountUSD)) &&
      conversionRate > 0
    ) {
      const result = Number(inputAmountUSD) / conversionRate;
      setOutputAmountCrypto(result);
    } else {
      setError("Invalid input or no conversion rate found.");
    }
  };

  const handleCryptoChange = (crypto: string) => {
    setSelectedCrypto(crypto);
    setOutputAmountCrypto(""); // Reset output when changing crypto
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmountUSD(Number(e.target.value));
    setOutputAmountCrypto(""); // Reset output when changing USD amount
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
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="ADA">Cardano (ADA)</option>
                <option value="SOL">Solana (SOL)</option>
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

            {error && (
              <div className="mt-4 text-red-600 text-center">
                <Text>{error}</Text>
              </div>
            )}

            {loading && (
              <LoadingSpinner/>
            )}

            {/* <div className="flex justify-center mt-8">
              <Button
                fontSize="lg"
                fontColor="text-white"
                height="50px"
                width="50%"
                className="bg-primary font-semibold"
                onClick={handleConvert}
              >
                Convert
              </Button>
            </div> */}
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

        <FAQ/>

      </ContentContainer>

      <Footer />
    </>
  );
};

export default CryptoConverter;
