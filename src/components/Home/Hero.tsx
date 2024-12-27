// @ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Layout/Button/Button";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Heading from "../Layout/Heading/Heading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedName && storedEmail) {
      setHasJoined(true);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  const handleJoinWishlist = () => {
    if (!hasJoined) {
      setShowModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://testdata-bh0z.onrender.com/add_user",
        {
          name,
          email,
        }
      );

      setLoading(false);
      setMessage("Successfully added to the wishlist!");
      setShowModal(false);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      setHasJoined(true);
      toast.success("Successfully added to the wishlist!");
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong. Please try again later.");
      setShowModal(true);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <ContentContainer>
      <section
        className="flex flex-col-reverse lg:flex-row items-center bg-cover bg-center h-[42vh] md:h-[60vh]"
        style={{ backgroundImage: "url(/images/Background/background.svg)" }}
      >
        <ContentContainer>
          <div className="w-full flex flex-col gap-6 text-center lg:text-left">
            <Heading
              fontSize=""
              className="font-semibold md:font-bold text-2xl md:text-4xl text-white"
            >
              Simplifying crypto tax compliance and accounting for you
            </Heading>
            <Heading fontSize="" className=" text-white text-lg md:text-2xl">
              Innovative tech for seamless crypto tax management.
            </Heading>
            <div>
              <Button
                fontSize="lg"
                className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
                onClick={handleJoinWishlist}
                disabled={loading || hasJoined}
              >
                {loading
                  ? "Joining..."
                  : hasJoined
                  ? "Thanks for joining us"
                  : "Join wishlist"}
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-3/4 md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Join Wishlist</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full border-2 border-black p-2 mt-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border-2 border-black p-2 mt-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3 md:flex-row justify-between">
                <Button
                  fontSize="lg"
                  className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fontSize="lg"
                  className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div className="flex justify-end">
              <Button
                fontSize="lg"
                className=" bg-[#F4F1E6] text-black rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                onClick={() => setShowTokenModal(false)}
              >
                <FaTimes />
              </Button>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-center">
              Welcome to Taxate Beta!
            </h3>
            <p className="text-xl mb-4 text-center">
              We're excited to have you on board as we improve our crypto tax
              compliance platform. Join our exclusive Wishlist Program today and
              receive a special Taxate token!
            </p>
            <Link to="/beta-program">
              <div className="flex justify-center mb-2">
                <button className="px-8 py-3 bg-primary text-white font-semibold rounded-md ">
                  Visit Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </ContentContainer>
  );
};

export default Hero;
