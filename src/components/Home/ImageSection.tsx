// src/App.tsx
import React from "react";
import SectionLayout from "../Home/SectionLayout";

const ImageSection: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      {/* First Layout (Title and Description on Left, Image on Right) */}
      <SectionLayout
        title="Easily import your crypto trades"
        description="No more crazy spreadsheets! Koinly is a crypto tax calculator that imports your crypto transactions for free. Binance, WazirX, CoinDCX, Coinswitch? Koinly supports them all! Simply connect your exchanges, wallets, and blockchains and let Koinly calculate your crypto tax liability."
        imageSrc="/images/Imagegalery/1.png"
      />

      {/* Second Layout (Reverse Layout with row-reverse) */}
      <SectionLayout
        title="Download your crypto tax report"
        description="Your crypto tax calculations are ready to download as a comprehensive report. Simply sign up for an affordable plan, download your report, and file with the Income Tax Department!."
        imageSrc="/images/Imagegalery/2.png"
        reverse={true}
      />

      {/* Third Layout (Back to Normal Layout) */}
      <SectionLayout
        title="Preview your crypto income for free"
        description="Taxate super power? We understand India's crypto tax rules! Koinly knows if a transaction was income, a loss, or a non-taxable event. And the best part? Koinly calculates your Income Tax, for free!."
        imageSrc="/images/Imagegalery/3.svg"
      />
    </div>
  );
};

export default ImageSection;
