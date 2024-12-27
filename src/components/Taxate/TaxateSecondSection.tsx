// @ts-nocheck  
import React from 'react'; 
import { Helmet } from 'react-helmet';  

const securityItems = [   
  {     
    icon: '/images/Baskets/1.png', // Add appropriate icon path for this item     
    title: "Discount on crypto tax filing",     
    description: "Get a special discount on crypto tax filing by assessing your investment preferences and risk profile with Taxate.",   
  },   
  {     
    icon: '/images/Baskets/2.png', // Add appropriate icon path for this item     
    title: "Free crypto wallet tracking",     
    description: "Track your crypto wallet effortlessly by integrating your existing platform API or uploading a CSV file with your data.",   
  },   
  {     
    icon: '/images/Baskets/3.png', // Add appropriate icon path for this item     
    title: "More features coming soon",     
    description: "Taxate AI will continue to enhance your portfolio by offering customized Coin Sets based on your evolving data.",   
  }, 
];  

const TaxateSecondSection: React.FC = () => {   
  return (     
    <>       
      <Helmet>         
        <meta charSet="utf-8" />         
        <title>Taxate beta program</title>         
        <meta           
          name="description"           
          content="Taxate beta program: Register for free and earn Taxate tokens."         
        />         
        <meta           
          name="keywords"           
          content="crypto tax, cryptocurrency accounting, coin sets, risk profile evaluation, taxate, portfolio management, crypto tax software"         
        />         
        <meta name="author" content="Taxate" />         
        <link rel="canonical" href="https://www.taxate.in/coin-sets" />       
      </Helmet>        

      <section className="bg-white py-12 px-6">         
        <h2 className="text-lg md:text-4xl font-bold text-center mb-10">Why Taxate Coin Sets?</h2>         
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">           
          {securityItems.map((item, index) => (             
            <div               
              key={index}               
              className="bg-primary rounded-lg shadow-lg p-6 flex flex-col items-center max-w-sm w-full"             
            >               
              <img src={item.icon} alt={item.title} className="w-24 h-24 mb-4" />               
              <h3 className="text-xl text-white font-semibold mb-2 text-center">{item.title}</h3>               
              <p className="text-gray-600 text-center text-white">{item.description}</p>             
            </div>           
          ))}         
        </div>       
      </section>     
    </>   
  ); 
};  

export default TaxateSecondSection; 
