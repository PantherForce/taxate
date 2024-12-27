// @ts-nocheck

import React, { useState } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{
    products: boolean;
    resources: boolean;
  }>({
    products: false,
    resources: false,
  });

  const toggleDropdown = (section: "products" | "resources") => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <ContentContainer>
      <nav className="bg-white text-black flex items-center justify-between py-4 px-8 shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="font-semibold text-xl">
            Taxate
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-xl hover:text-primary transition duration-300"
          >
            Home
          </a>

          {/* Dropdown for Products */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown("products")}
            onMouseLeave={() => toggleDropdown("products")}
          >
            <a
              href="#"
              className="text-xl hover:text-primary transition duration-300"
            >
              Tools
            </a>
            {dropdownOpen.products && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                <a
                  href="/crypto-prices"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Crypto live prices
                </a>
                <a
                  href="/crypto-tax-calculator"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Tax Calculator
                </a>
                <a
                  href="/crypto-caonverter"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Crypto converter
                </a>
              </div>
            )}
          </div>

          {/* Dropdown for Resources */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown("resources")}
            onMouseLeave={() => toggleDropdown("resources")}
          >
            <a
              href="#"
              className="text-xl hover:text-primary transition duration-300"
            >
              Resources
            </a>
            {dropdownOpen.resources && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                <a
                  href="/Blogs"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Blog
                </a>
                <a
                  href="/stats"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Stats
                </a>
                <a
                  href="/faqs"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  FAQ
                </a>
              </div>
            )}
          </div>

          <a
            href="/games"
            className="text-xl hover:text-primary transition duration-300"
          >
            Learn with games
          </a>
          <a
            href="/baskets"
            className="text-xl hover:text-primary transition duration-300"
          >
            Baskets
          </a>
          <a
            href="/ai-analysis"
            className="text-xl hover:text-primary transition duration-300"
          >
            AI-Analytics
          </a>
        </div>

        <div className="hidden md:flex gap-8">
          <Link to="/signup">
            <button className="bg-primary rounded-xl px-4 py-2 text-lg text-white hover:bg-primary-dark transition duration-300">
              Sign up
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-primary rounded-xl px-4 py-2 text-lg text-white hover:bg-primary-dark transition duration-300">
              Login
            </button>
          </Link>

        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none"
          >
            {menuOpen ? (
              <span className="text-xl">✖</span> // Close icon
            ) : (
              <span className="text-xl">☰</span> // Menu icon
            )}
          </button>
        </div>

        {/* Mobile Menu - Slide In Animation */}
        {menuOpen && (
          <div className="absolute p-8 z-50 top-16 left-0 w-full bg-white text-black flex flex-col items-center gap-4 py-6 transition-transform duration-500 transform translate-x-0 md:hidden">
            {/* Home Link */}
            <div className="relative w-full">
              <a
                href="/"
                className="text-xl text-black hover:bg-gray-200 py-2 px-4 w-full text-center"
              >
                Home
              </a>
            </div>

            {/* Mobile Dropdown for Tools */}
            <div className="relative w-full">
              <a
                href="#"
                className="text-xl text-black hover:bg-gray-200 py-2 px-4 w-full text-center"
                onClick={() => toggleDropdown("products")}
              >
                Tools
              </a>
              {dropdownOpen.products && (
                <div className="flex flex-col items-center w-full mt-2 bg-white text-black rounded-md">
                  <a
                    href="/crypto-prices"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    Crypto live prices
                  </a>
                  <a
                    href="/crypto-tax-calculator"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    Tax Calculator
                  </a>
                  <a
                    href="/crypto-converter"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    Crypto converter
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Dropdown for Resources */}
            <div className="relative w-full">
              <a
                href="#"
                className="text-xl text-black hover:bg-gray-200 py-2 px-4 w-full text-center"
                onClick={() => toggleDropdown("resources")}
              >
                Resources
              </a>
              {dropdownOpen.resources && (
                <div className="flex flex-col items-center w-full mt-2 bg-white text-black rounded-md">
                  <a
                    href="/Blogs"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    Blog
                  </a>
                  <a
                    href="/stats"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    Stats
                  </a>
                  <a
                    href="/faqs"
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-center"
                  >
                    FAQ
                  </a>
                </div>
              )}
            </div>
            <div className="relative w-full">
              <a
                href="/games"
                className="text-xl text-black hover:bg-gray-200 py-2 px-4 w-full text-center"
              >
                Learn with games
              </a>
            </div>

            <div className="relative w-full">
              <a
                href="/baskets"
                className="text-xl text-black hover:bg-gray-200 py-2 px-4 w-full text-center"
              >
                Baskets
              </a>
            </div>
            <div className="flex flex-col gap-2">
          <Link to="/signup">
            <button className="bg-primary px-5 py-2 text-lg text-white hover:bg-primary-dark transition duration-300">
              Sign up
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-primary ml-2 px-5 py-2 text-lg text-white hover:bg-primary-dark transition duration-300">
              Login
            </button>
          </Link>

        </div>
            
          </div>
        )}
      </nav>
    </ContentContainer>
  );
};

export default Navbar;
