import React from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-80">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        {/* Notification */}
        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-blue-600" />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h2 className="font-semibold">
              Ruturaj
            </h2>

            <p className="text-sm text-gray-500">
              Resident
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;