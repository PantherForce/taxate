import React from 'react';
import ContentContainer from '../Layout/ContentContainer/ContentContainer';
import { Link } from 'react-router-dom';

const ResponsiveCard: React.FC = () => {
  return (
    <ContentContainer>

        <Link to='/why-paying-taxes-on-crypto-matters'>
    <div className="flex items-start">
   
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
       
        <img
          src="/images/Features/Chasing Money 2.png"
          alt="Beautiful Nature"
          className="w-full h-60 object-cover"
        />
        
        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-base md:text-xl font-semibold text-gray-800">Why Paying Taxes on Crypto Matters</h3>
          <p className="text-gray-600 mt-2 text-base">
          Learn why paying taxes on your cryptocurrency gains is essential for supporting infrastructure, innovation, and community growth. Discover how your contributions help create a more equitable financial system
          </p>
        </div>
      </div>
    </div>
    </Link>
    </ContentContainer>
  );
};

export default ResponsiveCard;
