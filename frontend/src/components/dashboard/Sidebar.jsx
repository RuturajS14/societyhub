import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  IndianRupee,
  UserRoundCheck,
  Bell,
  Building2,
  ClipboardList,
  UserCog,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Residents", path: "/residents", icon: <Users size={20} /> },
  { name: "Complaints", path: "/complaints", icon: <Wrench size={20} /> },
  { name: "Maintenance", path: "/maintenance", icon: <IndianRupee size={20} /> },
  { name: "Visitors", path: "/visitors", icon: <UserRoundCheck size={20} /> },
  { name: "Notices", path: "/notices", icon: <Bell size={20} /> },
  { name: "Amenities", path: "/amenities", icon: <Building2 size={20} /> },
  { name: "Staff", path: "/staff", icon: <UserCog size={20} /> },
  { name: "Reports", path: "/reports", icon: <ClipboardList size={20} /> },
];

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

      <div className="text-center py-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          SocietyHub
        </h1>
      </div>

      <div className="mt-6 px-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </div>

      <div className="absolute bottom-6 left-4 right-4">

        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition">

          <LogOut size={18} />
          Logout

        </button>

      </div>

    </div>
  );
};

export default Sidebar;