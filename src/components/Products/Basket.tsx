import React from "react";
import Button from "../Layout/Button/Button";

const Basket: React.FC = () => {
  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8 max-w-lg mx-4 md:max-w-4xl">
        <img
          src="/images/Baskets/baskets.png"
          alt="Placeholder"
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-1/2 md:h-1/2 rounded-full"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
        Optimize your taxes and grow your wealth with Taxate Coin Sets—your secure path to diversified crypto exposure        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-6">
        Invest smartly with theme-based crypto baskets, designed to maximize growth and minimize risk.        </p>
       

        <div className="flex justify-center">
          {" "}
          <Button
            fontSize="xl"
            fontColor="text-black"
            height="50px"
            width="100%"
            className="bg-primary text-white font-semibold"
          >
            Get Started
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default Basket;
