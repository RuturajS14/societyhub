import React from "react";
import {
  Bell,
  Search,
  UserCircle2,
  Settings,
} from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-20 bg-white shadow-sm flex items-center justify-between px-8 ml-64">

      {/* Search */}

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={24} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        <Settings
          size={24}
          className="cursor-pointer hover:text-blue-600"
        />

        <div className="flex items-center gap-3 cursor-pointer">

          <UserCircle2
            size={42}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">
              Ruturaj Sonawane
            </h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Topbar;