// @ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button"; // Adjust path based on your folder structure
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface JoinWishlistButtonProps {
  buttonText?: string;
  bgColor?: string;  // New prop for background color
}

const JoinWishlistButton: React.FC<JoinWishlistButtonProps> = ({ buttonText, bgColor = "#F4F1E6" }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  // Check if user details are already stored in localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedName && storedEmail) {
      setHasJoined(true); // User has already joined the wishlist
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  // Show the modal when the "Join Wishlist" button is clicked
  const handleJoinWishlist = () => {
    if (!hasJoined) {
      setShowModal(true);
    }
  };

  // Handle form submission for adding user
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

      // Store user details in localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      // Set hasJoined state to true to change button text
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
    <div>
      <Button
        fontSize="lg"
        className={`px-8 bg-primary font-semibold py-3 ${bgColor} text-white`}  // Use bgColor prop to set the background color
        onClick={handleJoinWishlist}
        disabled={loading || hasJoined} // Disable button when loading or if user has joined
      >
        {loading ? "Joining..." : hasJoined ? "Thanks for joining us" : buttonText || "Join wishlist"}
      </Button>

      {/* Modal for user information */}
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
                  onClick={() => setShowModal(false)} // Close modal on cancel
                >
                  Cancel
                </Button>
                <Button
                  fontSize="lg"
                  className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
                  type="submit"
                  disabled={loading} // Disable submit button during loading
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default JoinWishlistButton;