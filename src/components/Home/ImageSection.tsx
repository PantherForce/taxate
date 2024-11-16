import React from "react";
import SectionLayout from "../Home/SectionLayout";

const ImageSection: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      {/* First Layout (Title and Description on Left, Image on Right) */}
      <SectionLayout
        title="Easily import your crypto trades"
        description="No more crazy spreadsheets! Taxate is a crypto tax calculator that imports your crypto transactions for free. Binance, WazirX, CoinDCX, Coinswitch? Taxate supports them all! Simply connect your exchanges, wallets, and blockchains and let Taxate calculate your crypto tax liability."
        imageSrc="/images/Imagegalery/one.svg"
      />

      {/* Second Layout (Reverse Layout with row-reverse) */}
      <SectionLayout
        title="Download your crypto tax report"
        description="Your crypto tax calculations are ready to download as a comprehensive report. Simply sign up for an affordable plan, download your report, and file with the Income Tax Department!."
        imageSrc="/images/Imagegalery/second.svg"
        reverse={true}
      />

      {/* Third Layout (Back to Normal Layout with Blur effect on image) */}
      <SectionLayout
        title="Preview your crypto income for free"
        description="Taxate super power? We understand India's crypto tax rules! Taxate knows if a transaction was income, a loss, or a non-taxable event. And the best part? Taxate calculates your Income Tax, for free!."
        imageSrc="/images/Imagegalery/second.svg"
        blur={true}  // Add blur prop here
      />
    </div>
  );
};

export default ImageSection;
