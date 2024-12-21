import React from 'react';
import ContentContainer from '../Layout/ContentContainer/ContentContainer';
import { Link } from 'react-router-dom';

const ResponsiveCard: React.FC = () => {
  return (
    <ContentContainer>

       
    <div className="flex items-start gap-8">
    <Link to='/why-paying-taxes-on-crypto-matters'>
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
      </Link>

      <Link to='/GST-news'>

      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
       
       <img
         src="/images/Features/Chasing Money 2.png"
         alt="Beautiful Nature"
         className="w-full h-60 object-cover"
       />
       
       {/* Card Content */}
       <div className="p-4">
         <h3 className="text-base md:text-xl font-semibold text-gray-800">Comprehensive Guide to GST in India: Everything You Need to Know</h3>
         <p className="text-gray-600 mt-2 text-base">
         Discover the key aspects of GST in India, including its types, benefits, and compliance requirements. Understand why GST is essential for businesses and consumers in the modern tax system.</p>
       </div>
     </div>
     </Link>
    </div>
  
    </ContentContainer>
  );
};

export default ResponsiveCard;
