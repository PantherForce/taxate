// @ts-nocheck

import React, { useState } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Heading from "../Layout/Heading/Heading";
import Text from "../Layout/Text/Text";
import Button from "../Layout/Button/Button";
import FAQ from "../Faq/Faq";
import Footer from "../Footer/Footer";
import FAQS from "../Faq/Faqs";

const CryptoTaxCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number | "">(1);
  const [salePrice, setSalePrice] = useState<number | "">("");
  const [expenses, setExpenses] = useState<number | "">("");
  const [otherIncome, setOtherIncome] = useState<number | "">("");

  const totalProfit = (salePrice || 0) - (purchasePrice || 0) - (expenses || 0);
  const cryptoTax = totalProfit > 0 ? totalProfit * 0.3 : 0;

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
            Free Crypto Tax Calculator - India
          </Heading>
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row gap-8">
          <div className="bg-white p-8 w-full">
            <div className="mb-4">
              {/* <Text
                className="font-semibold"
                fontSize="xl"
                fontColor="text-gray-700"
              >
                Country
              </Text> */}
              {/* <div className="flex items-center mt-2">
                <span className="mr-2 text-2xl">🇮🇳</span>
                <select
                  className="p-2 border border-gray-300 rounded-md w-full"
                  disabled
                >
                  <option>India</option>
                </select>
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-10 mb-6">
              <div>
                <Text
                  className="font-semibold"
                  fontSize="xl"
                  fontColor="text-gray-700"
                >
                  Enter Purchase Price of The Crypto
                </Text>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
                  placeholder="₹ Enter amount"
                />
              </div>
              <div>
                <Text
                  className="font-semibold"
                  fontSize="xl"
                  fontColor="text-gray-700"
                >
                  Enter Sale Price of The Crypto
                </Text>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
                  placeholder="₹ Enter amount"
                />
              </div>
              <div>
                <Text
                  className="font-semibold"
                  fontSize="xl"
                  fontColor="text-gray-700"
                >
                  Enter Your Expenses
                </Text>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
                  placeholder="₹ Enter amount"
                />
              </div>
              <div>
                <Text
                  className="font-semibold"
                  fontSize="xl"
                  fontColor="text-gray-700"
                >
                  Enter Other Income
                </Text>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value))}
                  className="mt-2 p-2 border bg-gray-100 h-16 border-gray-300 rounded-md w-full"
                  placeholder="₹ Enter amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 mt-12 gap-4">
              <div className="p-4 bg-[#E0EAE8] rounded-md text-center">
                <Text
                  fontSize="xl"
                  fontColor="text-[#2A3D3B]"
                  className="font-semibold"
                >
                  Total Profit
                </Text>
                <Heading fontSize="2xl" fontColor="text-[#2A3D3B]">
                  <p className="text-[#2A3D3B] mt-2 font-bold">
                    ₹
                    {parseFloat(totalProfit.toFixed(2)).toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </p>
                </Heading>
              </div>
              <div className="p-4 bg-[#F4F1E6] rounded-md text-center">
                <Text
                  fontSize="xl"
                  fontColor="text-[#2D2D2D]"
                  className="font-semibold"
                >
                  Crypto Tax You Need To Pay*
                </Text>
                <Heading fontSize="2xl" fontColor="text-[#2D2D2D]">
                  <p className="text-[#2A3D3B] mt-2 font-bold">
                    ₹
                    {parseFloat(cryptoTax.toFixed(2)).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </Heading>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary flex flex-col items-center justify-center w-full rounded-xl md:w-[600px] h-[30vh] text-white rounded-md text-center">
            <Heading
              className="font-semibold"
              fontSize="lg"
              fontColor="text-white"
            >
              Join wishlist
            </Heading>
            <Text fontSize="md" fontColor="text-white" className="mt-2">
              With our range of features that you can equip for free, taxate
              allows you to be more educated and aware of your tax reports.
            </Text>
            <Button
              fontSize="xl"
              fontColor="text-black"
              height="50px"
              width="80%"
              className="mt-4 bg-white font-semibold"
            >
              Get Started for FREE →
            </Button>
          </div>
        </div>{" "}
        <div className="p-2 md:p-8">
          <FAQS />
        </div>
      </ContentContainer>

      <Footer />
    </>
  );
};

export default CryptoTaxCalculator;
