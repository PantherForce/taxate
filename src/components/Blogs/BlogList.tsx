import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BlogCard from "./BlogCard";
import AlphabetFilter from "./AlphabetFilter";
import Navbar from "../Navbar/Navbar";
import HeroBlogSection from "./HeroBlogSection";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { Link } from "react-router-dom";
import ResponsiveCard from "./ResponsiveCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

const blogPosts: Blog[] = [
  // Blog posts with id "1" and "2" have been removed.
  // Add more dummy blogs here if needed
];

const BlogList: React.FC = () => {
  const [filteredLetter, setFilteredLetter] = useState<string | null>(null);
  const filteredBlogs = filteredLetter
    ? blogPosts.filter((blog) => blog.title[0].toUpperCase() === filteredLetter)
    : blogPosts;

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
        <meta name="twitter:site" content="@taxatehq" />
        <meta name="twitter:title" content="Taxate Blogs - Stay Updated on Crypto, Tax Optimization & Wealth Management" />
        <meta name="twitter:description" content="Explore the latest insights and articles on cryptocurrency, tax optimization, wealth management, and investment strategies at Taxate. Stay updated with expert advice to grow your wealth and optimize taxes." />
        <meta name="twitter:image" content="URL_TO_IMAGE" />
      </Helmet>
      <Navbar />
      <HeroBlogSection />
      <ContentContainer>
        <div className="">
          <AlphabetFilter onSelectLetter={setFilteredLetter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                />
              </Link>
            ))}
          </div>
        </div>

        <ResponsiveCard />
      </ContentContainer>
    </>
  );
};

export default BlogList;
