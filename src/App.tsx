import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import CryptoTaxCalculator from '../src/components/Calculator/CryptoTaxCalculator';
import CryptoAssets from './components/Prices/CryptoAssets';
import PlatformFees from './components/Tools/PlatformFees';
import CryptoConverter from './components/Calculator/CryptoConverter';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import GameBoard from './components/Pages/GameBoard/GameBoard';
import Faqs from './components/Pages/Faqs/Faqs';
import BlogList from './components/Blogs/BlogList';
import Blogcontent from './components/Blogs/BlogContent';
import Stats from './components/Pages/Stats/Stats';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto-tax-calculator" element={<CryptoTaxCalculator />} />
        <Route path="/crypto-prices" element={<CryptoAssets />} />
        <Route path="/testing" element={<PlatformFees />} />
        <Route path='/crypto-caonverter' element={<CryptoConverter/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/games' element= {<GameBoard/>}/>
        <Route path='/blogs' element={<BlogList/>}/>
        <Route path='/faqs' element={<Faqs/>}/>
        <Route path='/stats' element={<Stats/>}/>
        <Route path="/why-paying-taxes-on-crypto-matters" element={<Blogcontent/>} />
      </Routes>
    </Router>
  );
};

export default App;
