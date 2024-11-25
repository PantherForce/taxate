import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import Basket from '../../Products/Basket'
import TaxateCoinSets from '../../Products/TaxateCoinSets'
import 'react-awesome-slider/dist/styles.css';
import SecuritySection from '../../Products/SecuritySection';



const Naaskets = () => {
  return (
    <>
    <Navbar/>
    <Basket/>
    <SecuritySection/>
    <TaxateCoinSets/>
    <Footer/></>
  )
}

export default Naaskets