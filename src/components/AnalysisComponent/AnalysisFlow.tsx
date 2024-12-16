import React from "react";
import SectionLayout from "../Home/SectionLayout";

const AnalysisFlow: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <SectionLayout
        title="Seamlessly import your crypto trades and investments"
        description="Say goodbye to complex spreadsheets! Taxate AI analytics can automatically import your crypto transactions at no cost."
        imageSrc="/images/Imagegalery/one.svg"
      />

      <SectionLayout
        title="Gain insights into all your metrics with AI"
        description="Taxate Analytics AI provides a clear overview of all your trades, helping you understand them in one place."
        imageSrc="/images/Imagegalery/second.svg"
        reverse={true}
      />

      <SectionLayout
        title="Uncover and improve like never before"
        description="Discover areas for improvement and better understand how to optimize your crypto strategy."
        imageSrc="/images/Imagegalery/second.svg"
        blur={true} // Add blur prop here
      />
    </div>
  );
};

export default AnalysisFlow;
