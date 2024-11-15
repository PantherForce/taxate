import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E0EAE8]  text-gray-700">
      <ContentContainer>
        <div className="flex flex-col p-6 md:flex-row justify-between items-center md:items-start">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="text-lg md:text-3xl font-bold mb-4">Taxate</div>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaFacebookF size={28} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaLinkedinIn size={28} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full md:w-auto text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-3 text-xl md:text-2xl">
                Resources
              </h4>
              <ul className="space-y-2 text-lg md:text-xl">
                <li>
                  <a href="/blogs" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="hover:text-gray-900">
                    Faqs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3  text-xl md:text-2xl">Tools</h4>
              <ul className="space-y-2 text-lg md:text-xl">
                {" "}
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Plugins
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    APIs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xl md:text-2xl">
                Company
              </h4>
              <ul className="space-y-2 text-lg md:text-xl">
                {" "}
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About Us
                  </a>  
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Careers <span className="text-indigo-600">( coming soon )</span>
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-3  text-xl md:text-2xl">
                Support
              </h4>
              <ul className="space-y-2 text-lg md:text-xl">
                {" "}
                <li>
                  <a href="#" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-semibold mb-3 text-xl md:text-2xl">
                Follow Us
              </h4>
              <ul className="space-y-2 text-lg md:text-xl">
                {" "}
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
