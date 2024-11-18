import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4"; // Import react-ga4

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

const App: React.FC = () => {
  const location = useLocation();

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
        <Route
          path="/why-paying-taxes-on-crypto-matters"
          element={<Blogcontent />}
        />
      </Routes>
    </Router>
  );
};

export default App;
