import React, { useEffect, useState } from "react";

type UserProps = {
  walletName: string;
  taxRate: number;
  userScore: number;
  additionalInfo: string;
};

const User: React.FC<UserProps> = ({
  walletName,
  taxRate,
  userScore,
  additionalInfo,
}) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Fetch name and email from localStorage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* User Info Header */}
        <div className="bg-primary p-6 text-white">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <p className="text-sm">Your personal information and settings</p>
        </div>

        {/* User Info Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Name */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Name</h3>
            <p className="text-xl font-bold text-gray-900">{name || "N/A"}</p>
          </div>

          {/* Email */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-xl font-bold text-gray-900">{email || "N/A"}</p>
          </div>

          {/* Wallet Name */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Connected Wallet</h3>
            <p className="text-xl font-bold text-gray-900">{walletName}</p>
          </div>

          {/* Tax Rate */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Tax Rate</h3>
            <p className="text-xl font-bold text-gray-900">{taxRate}%</p>
          </div>

          {/* User Score */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">User Score</h3>
            <p className="text-xl font-bold text-gray-900">{userScore}</p>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md col-span-2 sm:col-span-3">
            <h3 className="text-lg font-semibold text-gray-700">Additional Info</h3>
            <p className="text-gray-700">{additionalInfo}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end p-6 space-x-4">
          <button className="px-6 py-2 text-black rounded-md">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
