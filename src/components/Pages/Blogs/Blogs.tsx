// @ts-nocheck

import { Helmet } from "react-helmet";
import HeroBlogSection from "../../Blogs/HeroBlogSection";
import AlphabetFilter from "../../Blogs/AlphabetFilter";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const Blogs = () => {
  return (
    <>
      <Helmet>
        <title>Taxate Blogs - Stay Updated on Crypto, Tax Optimization & Wealth Management</title>
        <meta
          name="description"
          content="Explore the latest insights and articles on cryptocurrency, tax optimization, wealth management, and investment strategies at Taxate. Stay updated with expert advice to grow your wealth and optimize taxes."
        />
        <meta name="author" content="Likhith Reddy" />
        <meta name="keywords" content="Tax optimization, Cryptocurrency, Crypto tax planning, Wealth management, Taxate, Crypto investing, Tax strategies, Digital asset management, Blockchain tax, Investment tips, Tax savings, Portfolio diversification, Taxation on crypto, Crypto tax solutions, Tax compliance, Cryptocurrency portfolio, AI-powered tax planning, Wealth growth, Crypto tax reporting, Investment planning, Tax-efficient portfolios, Cryptocurrency news, Blockchain technology, Crypto trading, Tax reform, Financial planning, Taxate insights, Crypto tax tools, Crypto wealth management, Cryptocurrency market trends, Tax-loss harvesting, Retirement planning, Digital wealth, Financial freedom, Tax benefits of crypto, Tax strategies for investors, Cryptocurrency taxes, Taxate blog, Portfolio management, Investment tax strategies, Passive income, AI for tax optimization, Tax software, Tax advice, Crypto tax solutions, Cryptocurrency taxation guide, Wealth preservation, Financial security, Crypto trading strategies, Taxate articles" />
        <meta property="og:title" content="Taxate Blogs - Stay Updated on Crypto, Tax Optimization & Wealth Management" />
        <meta property="og:description" content="Explore the latest insights and articles on cryptocurrency, tax optimization, wealth management, and investment strategies at Taxate. Stay updated with expert advice to grow your wealth and optimize taxes." />
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta property="og:url" content="https://www.taxate.com/blogs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@taxate" />
        <meta name="twitter:title" content="Taxate Blogs - Stay Updated on Crypto, Tax Optimization & Wealth Management" />
        <meta name="twitter:description" content="Explore the latest insights and articles on cryptocurrency, tax optimization, wealth management, and investment strategies at Taxate. Stay updated with expert advice to grow your wealth and optimize taxes." />
        <meta name="twitter:image" content="URL_TO_IMAGE" />
      </Helmet>
      <Navbar />
      <HeroBlogSection />
      <AlphabetFilter />
      <Footer />
    </>
  );
};

export default Blogs;
