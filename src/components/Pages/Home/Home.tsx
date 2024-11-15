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
      <Navbar />
      <Hero />

      <LogoMarqueeWithTitle />
<Freshsection/>
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
