// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Correct import of ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS
import Navbar from "../Navbar/Navbar";

interface SignupFormData {
  full_name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Signup Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send signup request to the backend
      const response = await axios.post(
        "https://testdata-bh0z.onrender.com/signup",
        formData
      );
      console.log("Signup successful:", response.data);

      // Assuming the response contains user_id, email, and full_name
      const { user_id, email, full_name } = response.data;

      // Store user details in localStorage
      localStorage.setItem("user_id", user_id);  // Store the user_id
      localStorage.setItem("email", email);      // Store the email
      localStorage.setItem("full_name", full_name); // Store the full_name

      // Show success toast
      toast.success("Signup successful! Please check your email.", {
        position: "top-center",
        autoClose: 3000,
      });

      // Navigate to dashboard or other page
      navigate("/games");
      setLoading(false);
    } catch (error: any) {
      // Handle errors
      const errorMessage = error.response?.data?.error || "Signup failed";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-white p-8 mx-4 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm md:text-lg font-semibold text-gray-600">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm md:text-lg font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm md:text-lg font-semibold text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* ToastContainer should be used here */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
