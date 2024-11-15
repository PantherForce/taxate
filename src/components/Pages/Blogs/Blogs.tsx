import HeroBlogSection from "../../Blogs/HeroBlogSection";
import AlphabetFilter from "../../Blogs/AlphabetFilter";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


const Blogs = () => {
  return (
    <>
      <Navbar />
      <HeroBlogSection />
      <AlphabetFilter />
  
      <Footer />
    </>
  );
};

export default Blogs;
