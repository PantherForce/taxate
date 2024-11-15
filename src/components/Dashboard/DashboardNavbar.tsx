import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';  // React Icons
import Button  from '../Layout/Button/Button';  // Assuming Button component is in the same folder
import Text  from '../Layout/Text/Text';      // Assuming Text component is in the same folder

const user = {
  name: 'John Doe',
  profileImage: '/path/to/profile.jpg',
};

const DashboardNavbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-4">
      <div className="flex items-center space-x-3">
        {/* <img src="/path/to/logo.svg" alt="Logo" className="h-8" /> */}
        <Text fontSize="lg" className="font-semibold">Taxate</Text>
      </div>

      <div className="flex items-center w-1/2 max-w-lg space-x-2  px-4 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border-2 border-gray-400 text-sm h-12 text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-2"
        />
        <svg
          className="w-10 h-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.403-1.403M17.5 12a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
          />
        </svg>
      </div>

      <div className="flex items-center space-x-6">
        <FaBell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />

        <FaCog className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />

        <div className="flex items-center space-x-2">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <Text fontSize="md" className="font-medium">{user.name}</Text>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
