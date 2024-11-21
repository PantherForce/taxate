import React, { useState } from "react";
import axios from "axios";
import Button from "../Layout/Button/Button";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Heading from "../Layout/Heading/Heading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleJoinWishlist = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://taxate-backend.onrender.com", {
        name,
        email,
      });

      setLoading(false);
      setMessage("Successfully added to the wishlist!");
      setShowModal(false);

      toast.success("Successfully added to the wishlist!"); // Show success toast
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong. Please try again later.");
      toast.error("Something went wrong. Please try again later."); // Show error toast
    }
  };

  return (
    <ContentContainer>
      <section
        className="flex flex-col-reverse lg:flex-row items-center bg-cover bg-center h-[60vh]"
        style={{ backgroundImage: "url(/images/Background/background.svg)" }}
      >
        <ContentContainer>
          <div className="w-full flex flex-col gap-6 text-center lg:text-left">
            <Heading fontSize="xl" className="font-bold text-white">
              Simplifying crypto tax compliance and accounting for you
            </Heading>
            <Heading fontSize="lg" className=" text-white">
              Innovative tech for seamless crypto tax management.
            </Heading>
            <div>
              <Button
                fontSize="lg"
                className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
                onClick={handleJoinWishlist}
                disabled={loading}
              >
                {loading ? "Joining..." : "Join wishlist"}
              </Button>
            </div>
            {message && (
              <div className="mt-4 text-center text-white">
                <p>{message}</p>
              </div>
            )}
          </div>
        </ContentContainer>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Join Wishlist</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full p-2 mt-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
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
      <ToastContainer /> {/* Toast Container */}
    </ContentContainer>
  );
};

export default Hero;
