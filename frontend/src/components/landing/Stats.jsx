import React from "react";
import {
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaSmileBeam,
} from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      number: "500+",
      title: "Residents",
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "1200+",
      title: "Visitors",
      icon: <FaUserShield />,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "350+",
      title: "Complaints Solved",
      icon: <FaCheckCircle />,
      color: "from-red-500 to-pink-500",
    },
    {
      number: "99%",
      title: "Customer Satisfaction",
      icon: <FaSmileBeam />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-white">
            Trusted by Modern Societies
          </h2>

          <p className="text-gray-300 mt-4 text-lg">
            Helping societies manage everything efficiently and securely.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:scale-105 hover:bg-white/20 transition-all duration-300"
            >

              <div
                className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-4xl shadow-lg`}
              >
                {item.icon}
              </div>

              <h1 className="text-5xl font-extrabold text-white mt-6">
                {item.number}
              </h1>

              <p className="text-gray-300 mt-3 text-lg">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Stats;