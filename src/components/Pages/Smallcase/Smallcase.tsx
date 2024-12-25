// @ts-nocheck

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PortfolioCard from '../../Smallcase/PortfolioCard';
import Navbar from '../../Navbar/Navbar';
import Faqs from '../Faqs/Faqs';
import ContentContainer from '../../Layout/ContentContainer/ContentContainer';

interface Smallcase {
  basket_id: string;
  basket_name: string;
  basket_description: string;
  basket_type: string;
  investment_criteria: {
    minimum_investment: string;
    maximum_investment: string;
  };
  target_audience: string;
  rebalancing: {
    frequency: string;
    rules: string;
  };
}

const Smallcase: React.FC = () => {
  const [smallcases, setSmallcases] = useState<Smallcase[]>([]);

  useEffect(() => {
    axios.get('https://testdata-bh0z.onrender.com/api/smallcase')
      .then((response) => {
        setSmallcases(response.data.smallcases);
      })
      .catch((error) => {
        console.error('Error fetching smallcases:', error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <ContentContainer>
    <div className="flex justify-center items-center mb-8">
            <h1 className="text-4xl font-bold text-center">
              Crypto Coin-sets
            </h1>
          </div>

    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {smallcases.map((smallcase) => (
        <Link to={`/smallcase/${smallcase.basket_id}`} key={smallcase.basket_id}>
          <PortfolioCard smallcase={smallcase} />
        </Link>
      ))}
    </div>
    </ContentContainer>
    <Faqs/>
    </>
  );
};

export default Smallcase;
