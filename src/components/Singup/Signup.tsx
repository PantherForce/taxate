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
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
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
      toast.success("Signup successful! Please check your email for OTP.", {
        position: "top-center",
        autoClose: 3000,
      });

      // Send OTP to the user's email
      await sendOtpToEmail(email);

      // Set OTP sent state
      setOtpSent(true);

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

  // Function to send OTP to user's email
  const sendOtpToEmail = async (email: string) => {
    try {
      await axios.post("https://testdata-bh0z.onrender.com/send_otp", { email });
      toast.success("OTP sent to your email!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("No email found in localStorage!");
        setLoading(false);
        return;
      }

      const response = await axios.post("https://testdata-bh0z.onrender.com/verify_otp", {
        email,
        otp,
      });

      if (response.data.message === "OTP verified successfully!") {
        setEmailVerified(true);
        toast.success("Email verified successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Navigate to dashboard or other page
        navigate("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }

      setLoading(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "OTP verification failed";
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
          {!otpSent ? (
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
          ) : (
            // OTP Verification Form
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <label className="block text-sm md:text-lg font-semibold text-gray-600">Enter OTP which is sent to your email id</label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="OTP"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-lg"
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>

        {/* ToastContainer should be used here */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
