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
  FaClipboardList,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Resident Management",
      desc: "Manage residents, flats and owners efficiently.",
      icon: <FaUsers />,
      path: "/residents",
    },
    {
      title: "Complaint Tracking",
      desc: "Track complaints and resolve them quickly.",
      icon: <FaTools />,
      path: "/complaints",
    },
    {
      title: "Maintenance",
      desc: "Manage maintenance bills and payments.",
      icon: <FaMoneyBill />,
      path: "/maintenance",
    },
    {
      title: "Notice Board",
      desc: "Publish notices for all residents instantly.",
      icon: <FaBullhorn />,
      path: "/notices",
    },
    {
      title: "Visitor Management",
      desc: "Secure visitor entry and exit records.",
      icon: <FaUserShield />,
      path: "/visitors",
    },
    {
      title: "Amenities",
      desc: "Book society facilities online with ease.",
      icon: <FaSwimmingPool />,
      path: "/amenities",
    },
    {
      title: "Staff Management",
      desc: "Manage security guards and society staff.",
      icon: <FaUserTie />,
      path: "/staff",
    },
    {
      title: "Analytics",
      desc: "Powerful insights with real-time dashboards.",
      icon: <FaChartBar />,
      path: "/dashboard",
    },
    {
      title: "Reports",
      desc: "Generate reports anytime in one click.",
      icon: <FaClipboardList />,
      path: "/reports",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-28 bg-[#071226] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px]"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[180px]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 font-semibold mb-6">
            Our Features
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white">
            Everything You Need
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Powerful modules designed to simplify every aspect of
            modern society management.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <Link
              key={index}
              to={feature.path}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]"
            >

              {/* Icon */}

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl shadow-xl group-hover:scale-110 transition">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold text-white mt-7">

                {feature.title}

              </h3>

              <p className="text-gray-300 mt-4 leading-7">

                {feature.desc}

              </p>

              <div className="flex items-center text-blue-400 font-semibold mt-8 group-hover:translate-x-2 transition">

                Explore

                <FaArrowRight className="ml-3" />

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;