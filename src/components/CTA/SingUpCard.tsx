// @ts-nocheck

import React, { useState, useEffect } from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Button from "../Layout/Button/Button";
import Signup from "../Singup/SignupModal";
import { FaTimes } from "react-icons/fa";

const SignupCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  // Check if the user details exist in localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedName && storedEmail) {
      setHasSignedUp(true); // User has already signed up
    }
  }, []);

  // Handle showing the modal when the "Get Started for FREE" button is clicked
  const handleGetStartedClick = () => {
    if (!hasSignedUp) {
      setShowModal(true); // Show the modal if the user hasn't signed up yet
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate storing the details (e.g., API request or form submission)
    setTimeout(() => {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      setLoading(false);
      setShowModal(false);
      setHasSignedUp(true); // Mark user as signed up
    }, 1000);
  };

  return (
    <ContentContainer>
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl bg-primary text-white p-6 md:p-12 rounded-xl shadow-lg space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src="/images/CTA\MessageSent.png"
              alt="Illustration"
              className="w-full md:w-60 h-60"
            />
          </div>

          <div className="text-center md:text-left max-w-3xl">
            <h2 className="text-lg md:text-4xl font-semibold mb-2">
              How to get started
            </h2>
            <p className="text-sm md:text-lg mb-4">
              You can sign up at Taxate for free. With our range of features
              that you can equip for free, Taxate allows you to be more educated
              and aware of your tax reports.
            </p>
            <Button
              fontColor="text-black"
              height="50px"
              width="60%"
              className="mt-4 text-sm md:text-lg bg-white font-semibold"
              onClick={handleGetStartedClick}
              disabled={hasSignedUp || loading} // Disable button if already signed up or loading
            >
              {loading ? "Signing up..." : hasSignedUp ? "Thanks for signing up" : "Get Started for FREE →"}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for user information */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-3/4 md:w-1/3">
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-bold ">Join wishlist</h3>
            <button  onClick={() => setShowModal(false)} ><FaTimes color="red"/></button>
            </div>
            <Signup/>
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export default SignupCard;
