import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaTools,
  FaMoneyBill,
  FaBullhorn,
  FaUserShield,
  FaSwimmingPool,
  FaChartBar,
  FaUserTie,
} from "react-icons/fa";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Residents",
      icon: <FaUsers size={32} />,
      color: "from-blue-500 to-cyan-500",
      path: "/admin/residents",
    },
    {
      title: "Complaints",
      icon: <FaTools size={32} />,
      color: "from-red-500 to-pink-500",
      path: "/admin/complaints",
    },
    {
      title: "Maintenance",
      icon: <FaMoneyBill size={32} />,
      color: "from-green-500 to-emerald-500",
      path: "/admin/maintenance",
    },
    {
      title: "Notices",
      icon: <FaBullhorn size={32} />,
      color: "from-yellow-400 to-orange-500",
      path: "/admin/notices",
    },
    {
      title: "Visitors",
      icon: <FaUserShield size={32} />,
      color: "from-purple-500 to-indigo-500",
      path: "/admin/visitors",
    },
    {
      title: "Amenities",
      icon: <FaSwimmingPool size={32} />,
      color: "from-pink-500 to-rose-500",
      path: "/admin/amenities",
    },
    {
      title: "Reports",
      icon: <FaChartBar size={32} />,
      color: "from-indigo-500 to-blue-500",
      path: "/admin/reports",
    },
    {
      title: "Staff",
      icon: <FaUserTie size={32} />,
      color: "from-cyan-500 to-sky-500",
      path: "/admin/staff",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">

      {/* Header */}
      <div className="mb-10 bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-white">
          👋 Welcome Admin
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage residents, complaints, visitors, maintenance,
          staff and reports from one powerful dashboard.
        </p>

      </div>

      {/* Cards */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className="group relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]"
          >
            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg mb-6`}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white">
              {card.title}
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Manage {card.title.toLowerCase()}
            </p>

            {/* Arrow */}
            <div className="mt-6 text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition">
              Open →
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default AdminDashboard;