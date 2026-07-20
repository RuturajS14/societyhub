import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaTools,
  FaMoneyBillWave,
  FaCar,
  FaBullhorn,
  FaSwimmingPool,
  FaUserTie,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Residents", icon: <FaUsers />, path: "/dashboard/residents" },
    { name: "Complaints", icon: <FaTools />, path: "/dashboard/complaints" },
    { name: "Maintenance", icon: <FaMoneyBillWave />, path: "/dashboard/maintenance" },
    { name: "Visitors", icon: <FaCar />, path: "/dashboard/visitors" },
    { name: "Notices", icon: <FaBullhorn />, path: "/dashboard/notices" },
    { name: "Amenities", icon: <FaSwimmingPool />, path: "/dashboard/amenities" },
    { name: "Staff", icon: <FaUserTie />, path: "/dashboard/staff" },
    { name: "Reports", icon: <FaChartBar />, path: "/dashboard/reports" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        SocietyHub
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-gray-300"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-4 space-y-2">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <FaCog />
          Settings
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;