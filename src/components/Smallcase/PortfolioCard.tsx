// @ts-nocheck
import React from 'react';
import ContentContainer from '../Layout/ContentContainer/ContentContainer';

interface InvestmentCriteria {
  minimum_investment: string;
  maximum_investment: string;
}

interface Rebalancing {
  frequency: string;
  rules: string;
}

interface Smallcase {
  basket_id: string;
  basket_name: string;
  basket_description: string;
  basket_type: string;
  investment_criteria: InvestmentCriteria;
  target_audience: string;
  rebalancing: Rebalancing;
  rebalance_flag?: boolean;
}

interface PortfolioCardProps {
  smallcase: Smallcase;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ smallcase }) => {
  return (
    <div className="bg-white border-2 border-primary p-4 flex flex-col justify-between h-full">
      <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-gray-900 mb-2">
        {smallcase.basket_name}
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        {smallcase.basket_description}
      </p>

      <div className="flex flex-col space-y-4 flex-grow">
        <div className="flex items-center">
          <span className="text-sm md:text-base font-medium text-gray-700">Basket Type:</span>
          <span className="text-sm md:text-base text-gray-500 ml-2">{smallcase.basket_type}</span>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm md:text-base font-medium text-gray-700">Investment Criteria:</span>
          <div className="text-sm md:text-base text-gray-500">
            <p>Min: {smallcase.investment_criteria.minimum_investment}</p>
            <p>Max: {smallcase.investment_criteria.maximum_investment}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-base font-medium text-gray-700">Target Audience:</span>
          <span className="text-sm md:text-base text-gray-500">{smallcase.target_audience}</span>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm md:text-base font-medium text-gray-700">Rebalancing:</span>
          <div className="text-sm md:text-base text-gray-500">
            <p>Frequency: {smallcase.rebalancing.frequency}</p>
            <p>Rules: {smallcase.rebalancing.rules}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {smallcase.rebalance_flag && (
          <div className='flex justify-center itme-center'>
          <button className="px-4 w-40 py-2 bg-[#F4F1E6] text-primary text-sm md:text-base font-semibold rounded-lg transition duration-300 w-full hover:bg-warning-dark">
            Rebalance
          </button>
          </div>
        )}
        <button className="px-4 py-2 bg-primary text-white text-sm md:text-base font-semibold rounded-lg transition duration-300 w-full hover:bg-primary-dark mt-2">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
