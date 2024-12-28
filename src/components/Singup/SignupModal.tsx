// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupFormData {
  full_name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    full_name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
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

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // Handle Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://testdata-bh0z.onrender.com/signup",
        formData
      );
      const { user_id, email, full_name } = response.data;

      localStorage.setItem("user_id", user_id);
      localStorage.setItem("email", email);
      localStorage.setItem("full_name", full_name);

      toast.success("Signup successful! Check your email for the OTP.", {
        position: "top-center",
        autoClose: 3000,
      });

      setOtpSent(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Signup failed";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("email");
      if (!email) throw new Error("No email found!");

      const response = await axios.post("https://testdata-bh0z.onrender.com/verify_otp", {
        email,
        otp,
      });

      if (response.data.message === "OTP verified successfully!") {
        toast.success("Email verified successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/games");
      } else {
        throw new Error("Invalid OTP.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Verification failed.";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="bg-white p-3 md:p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {!otpSent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm md:text-lg font-semibold text-gray-600">
                Full Name
              </label>
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
              <label className="block text-sm md:text-lg font-semibold text-gray-600">
                Email
              </label>
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
              <label className="block text-sm md:text-lg font-semibold text-gray-600">
                Password
              </label>
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
              className={`w-full bg-primary text-white py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <label className="block text-sm md:text-lg font-semibold text-gray-600">
                Enter OTP sent to your email
              </label>
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
              className={`w-full bg-primary text-white py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
