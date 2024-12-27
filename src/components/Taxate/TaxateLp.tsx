// @ts-nocheck

import React from "react";
import Button from "../Layout/Button/Button";
import { Link } from "react-router-dom";

const TaxateLp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="flex flex-col items-center justify-center p-8 max-w-lg mx-4 md:max-w-7xl bg-white ">
        <img
          src="/images/Baskets/baskets.png"
          alt="Taxate Beta"
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-1/2 md:h-1/2 rounded-full mb-6"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Join the Taxate Beta Program
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-6">
          Sign up now to be part of the Taxate Beta program and unlock exclusive early bird benefits! 
          Earn Taxate tokens which you can redeem for crypto tax filing services, discounts on coinsets, 
          wallet tracking, and much more.
        </p>

        <div className="flex justify-center w-full">
          <Link to="/signup">
            <Button
              fontSize="lg"
              className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition"
            >
              Register now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaxateLp;
