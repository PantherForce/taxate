// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Correct import for toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS
import Navbar from "../Navbar/Navbar";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Hook to navigate after login

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://testdata-bh0z.onrender.com/login",
        formData
      );
      console.log("Login successful:", response.data);

      // Show success toast
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000, // Toast will disappear after 3 seconds
      });

      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed";

      // Show error toast
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
      localStorage.setItem("email");
      localStorage.setItem("full_name");

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-[70vh]">
    <div className="bg-white p-8 mx-4 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-2xl w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>

  {/* ToastContainer to render the toast notifications */}
  <ToastContainer />
</div>
</>

  );
};

export default Login;
