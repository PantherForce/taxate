import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import HomeCoinSets from "../../CoinSets/HomeCponSets";
import Summary from "./Summary";

const CoinSets = () => {
  return (
    <>
      <Helmet>
        <title>Taxate Coin Sets - Optimize Your Taxes and Grow Your Wealth</title>
        <meta
          name="Taxate coinsets"
          content="Optimize your taxes and grow your wealth with Taxate Coin Sets—your secure path to diversified crypto exposure. Invest smartly with theme-based crypto baskets, designed to maximize growth and minimize risk."
        />
        <meta name="author" content="Likhith Reddy" />
        <meta name="keywords" content="Cryptocurrency investment, Tax optimization, Diversified crypto exposure, Crypto assets, Digital wealth management, Crypto baskets, Investment strategy, Risk management, Crypto portfolio, Blockchain investments, Tax-efficient investing, Cryptocurrency growth, Crypto diversification, Wealth growth, Crypto taxes, Investment tax strategies, Crypto market trends, Digital asset management, Crypto risk reduction, Tax-saving strategies, Crypto tax planning, Portfolio management, Crypto exchange, Cryptocurrency security, Crypto tax tools, Crypto fund, Financial freedom, Crypto trading strategies, Passive income, Tax-advantaged investments, Thematic crypto investments, Cryptocurrency ETFs, Crypto investment funds, Cryptocurrency risk assessment, Crypto tax report, Digital currency diversification, Investment portfolio, Tax loss harvesting, Tax-efficient portfolios, Crypto retirement savings, Cryptocurrency wealth building, Cryptocurrency financial planning, Blockchain-based investments, Long-term crypto growth, Digital portfolio allocation, Crypto tax reporting software, Crypto market analysis, Secure crypto investment, Alternative investments, Crypto wealth management"
        />
        <meta property="og:title" content="Taxate Coin Sets - Optimize Your Taxes and Grow Your Wealth" />
        <meta property="og:description" content="Invest smartly with theme-based crypto baskets, designed to maximize growth and minimize risk." />
        <meta property="og:image" content="E" />
        <meta property="og:url" content="https://www.taxate.com/coinsets" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@taxatehq" />
        <meta name="twitter:title" content="Taxate Coin Sets - Optimize Your Taxes and Grow Your Wealth" />
        <meta name="twitter:description" content="Invest smartly with theme-based crypto baskets, designed to maximize growth and minimize risk." />
        <meta name="twitter:image" content="URL_TO_IMAGE" />
      </Helmet>
      <Navbar />
      <HomeCoinSets />
      <Summary />
      <Footer />
    </>
  );
};

export default CoinSets;
