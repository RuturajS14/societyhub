import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    residents: 0,
    complaints: 0,
    maintenance: 0,
    visitors: 0,
    notices: 0,
    amenities: 0,
    staff: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Residents",
      value: stats.residents,
      color: "from-blue-600 to-cyan-500",
      icon: "🏠",
    },
    {
      title: "Complaints",
      value: stats.complaints,
      color: "from-red-600 to-pink-500",
      icon: "⚠️",
    },
    {
      title: "Maintenance",
      value: stats.maintenance,
      color: "from-green-600 to-emerald-500",
      icon: "💰",
    },
    {
      title: "Visitors",
      value: stats.visitors,
      color: "from-purple-600 to-violet-500",
      icon: "🚶",
    },
    {
      title: "Notices",
      value: stats.notices,
      color: "from-yellow-500 to-orange-500",
      icon: "📢",
    },
    {
      title: "Amenities",
      value: stats.amenities,
      color: "from-pink-600 to-rose-500",
      icon: "🏊",
    },
    {
      title: "Staff",
      value: stats.staff,
      color: "from-indigo-600 to-blue-500",
      icon: "👷",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Society Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome to your Smart Society Management Dashboard.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300`}
          >

            <div className="text-5xl mb-5">
              {card.icon}
            </div>

            <h2 className="text-lg font-medium text-white/90">
              {card.title}
            </h2>

            <p className="text-5xl font-bold mt-3">
              {card.value}
            </p>

          </div>

        ))}

      </div>

      {/* Welcome Card */}
      <div className="mt-10 bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          Welcome 👋
        </h2>

        <p className="text-slate-400 leading-7">
          Manage residents, complaints, maintenance, visitors,
          notices, amenities and staff from one modern dashboard.
          Everything is available in one place with a clean and
          professional interface.
        </p>

      </div>

    </div>
  );
};

export default Dashboard;