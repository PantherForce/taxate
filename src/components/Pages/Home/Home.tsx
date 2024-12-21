import { Helmet } from "react-helmet";
import SignupCard from "../../CTA/SingUpCard";
import FAQ from "../../Faq/Faq";
import Footer from "../../Footer/Footer";
import Freshsection from "../../Freshsection.tsx/FreshSection";
import CardsSection from "../../Home/Card";
import Hero from "../../Home/Hero";
import ImageSection from "../../Home/ImageSection";
import LogoMarqueeWithTitle from "../../Home/LogoMarqueeWithTitle";
import QuickIntegration from "../../Home/QuickIntegration";
import ContentContainer from "../../Layout/ContentContainer/ContentContainer";
import ImageGallery from "../../Motion/ImageGallery";
import Navbar from "../../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Crypto Tax Simplified | Taxate - Seamless Crypto Accounting |
        </title>
        <meta
          name="description"
          content="Simplify crypto tax compliance and accounting with Taxate. Our innovative technology ensures seamless crypto tax management, saving you time and effort."
        />
        <meta
          name="keywords"
          content="crypto tax, cryptocurrency accounting, crypto compliance, tax software, crypto tax management, simplify crypto taxes, blockchain taxes"
        />
        <meta name="author" content="Likhith Reddy" />
        <link rel="canonical" href="https://www.taxate.in/" />
      </Helmet>

      <Navbar />
      <Hero />
      <LogoMarqueeWithTitle />
      <Freshsection />
      <QuickIntegration />
      <CardsSection />
      <ImageGallery />
      <ImageSection />
      <ContentContainer>
        <FAQ />
      </ContentContainer>
      <SignupCard />
      <Footer />
    </>
  );
};

export default Home;
