// @ts-nocheck

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./components/Pages/Home/Home";
import CryptoTaxCalculator from "./components/Calculator/CryptoTaxCalculator";
import CryptoAssets from "./components/Prices/CryptoAssets";
import PlatformFees from "./components/Tools/PlatformFees";
import CryptoConverter from "./components/Calculator/CryptoConverter";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import GameBoard from "./components/Pages/GameBoard/GameBoard";
import Faqs from "./components/Pages/Faqs/Faqs";
import BlogList from "./components/Blogs/BlogList";
import Blogcontent from "./components/Blogs/BlogContent";
import Stats from "./components/Pages/Stats/Stats";
import { Analytics } from "@vercel/analytics/react";
import Naaskets from "./components/Pages/Baskets/Naaskets";
import FileUpload from "./components/Dashboard/FileUpload";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import CoinSets from "./components/Pages/CoinSets/CoinSets";
import BasketDetails from "./components/CoinSets/BasketDetails";
import Blockchain from "./components/Pages/Blockchain/Blockchain";
import Analysis from "./components/Pages/Analysis/Analysis";
import AnalysisPage from "./components/Pages/AnalysisPage/AnalysisPage";

const App: React.FC = () => {


  useEffect(() => {
    ReactGA.initialize("G-5ZV7QG0229");

    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/crypto-tax-calculator"
          element={<CryptoTaxCalculator />}
        />
        <Route path="/crypto-prices" element={<CryptoAssets />} />
        <Route path="/testing" element={<PlatformFees />} />
        <Route path="/crypto-caonverter" element={<CryptoConverter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<GameBoard />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/baskets" element={<Naaskets />} />
        <Route path="/add" element={<FileUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/coinsets" element={<CoinSets />} />
        <Route path="/basket/:basketId" element={<BasketDetails />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/analysis" element={<Analysis />} />/
        <Route path="/ai-analysis" element={<AnalysisPage />} />
        <Route
          path="/why-paying-taxes-on-crypto-matters"
          element={<Blogcontent />}
        />
      </Routes>
      <Analytics />
    </Router>
  );
};

export default App;
