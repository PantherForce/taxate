import AnalysisComponent from "../../AnalysisComponent/AnalysisComponent";
import AnalysisFlow from "../../AnalysisComponent/AnalysisFlow";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import AnalysisCards from "./AnalysisCards";

const AnalysisPage = () => {
  return (
    <>
      <Navbar />
      <AnalysisComponent />
      <AnalysisCards/>
      <AnalysisFlow/>
      <Footer />
    </>
  );
};

export default AnalysisPage;
