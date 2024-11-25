import React, { useState } from 'react';
import ContentContainer from '../Layout/ContentContainer/ContentContainer';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ products: boolean; resources: boolean }>({
    products: false,
    resources: false,
  });

  const toggleDropdown = (section: 'products' | 'resources') => {
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
          <a href="/" className="font-semibold text-xl">Taxate</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-xl hover:text-primary transition duration-300">Home</a>

          {/* Dropdown for Products */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown('products')}
            onMouseLeave={() => toggleDropdown('products')}
          >
            <a href="#" className="text-xl hover:text-primary transition duration-300">
              Tools
            </a>
            {dropdownOpen.products && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                <a href="/crypto-prices" className="block px-4 py-2 text-black hover:bg-gray-100">Crypto live prices</a>
                <a href="/crypto-tax-calculator" className="block px-4 py-2 text-black hover:bg-gray-100">Tax Calculator</a>
                <a href="/crypto-caonverter" className="block px-4 py-2 text-black hover:bg-gray-100">Crypto converter</a>
              </div>
            )}
          </div>

          {/* Dropdown for Resources */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown('resources')}
            onMouseLeave={() => toggleDropdown('resources')}
          >
            <a href="#" className="text-xl hover:text-primary transition duration-300">
              Resources
            </a>
            {dropdownOpen.resources && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                <a href="/Blogs" className="block px-4 py-2 text-black hover:bg-gray-100">Blog</a>
                <a href="/stats" className="block px-4 py-2 text-black hover:bg-gray-100">Stats</a>
                <a href="/faqs" className="block px-4 py-2 text-black hover:bg-gray-100">FAQ</a>
              </div>
            )}
          </div>

          <a href="/games" className="text-xl hover:text-primary transition duration-300">Learn with games</a>
          <a href="/baskets" className="text-xl hover:text-primary transition duration-300">Baskets</a>
        </div>

        <div className="hidden md:flex gap-8">
          <button className="bg-primary rounded-xl px-4 py-3 text-xl text-white hover:bg-primary-dark transition duration-300">
            Sign up
          </button>
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
          <div
            className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center gap-4 py-6 transition-transform duration-500 transform translate-x-0 md:hidden"
          >
            <a href="/" className="text-xl text-white hover:bg-gray-800 py-2 px-4 w-full text-center">Home</a>
            
            {/* Mobile Dropdown for Tools */}
            <div className="relative w-full">
              <a
                href="#"
                className="text-xl text-white hover:bg-gray-800 py-2 px-4 w-full text-center"
                onClick={() => toggleDropdown('products')}
              >
                Tools
              </a>
              {dropdownOpen.products && (
                <div className="flex flex-col items-center w-full mt-2 bg-white text-black rounded-md">
                  <a href="/crypto-prices" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">Crypto live prices</a>
                  <a href="/crypto-tax-calculator" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">Tax Calculator</a>
                  <a href="/crypto-caonverter" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">Crypto converter</a>
                </div>
              )}
            </div>

            {/* Mobile Dropdown for Resources */}
            <div className="relative w-full">
              <a
                href="#"
                className="text-xl text-white hover:bg-gray-800 py-2 px-4 w-full text-center"
                onClick={() => toggleDropdown('resources')}
              >
                Resources
              </a>
              {dropdownOpen.resources && (
                <div className="flex flex-col items-center w-full mt-2 bg-white text-black rounded-md">
                  <a href="/Blogs" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">Blog</a>
                  <a href="/stats" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">Stats</a>
                  <a href="/faqs" className="block px-4 py-2 hover:bg-gray-100 w-full text-center">FAQ</a>
                </div>
              )}
            </div>

            <a href="/games" className="text-xl text-white hover:bg-gray-800 py-2 px-4 w-full text-center">Learn with games</a>
            <a href="/baskets" className="text-xl text-white hover:bg-gray-800 py-2 px-4 w-full text-center">Baskets</a>

            <a
              href="#"
              className="border border-white rounded-full px-4 py-2 mt-2 hover:bg-white hover:text-black transition duration-300"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </ContentContainer>
  );
};

export default Navbar;
