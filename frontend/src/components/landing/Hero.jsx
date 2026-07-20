import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 pt-32">

        <div className="max-w-3xl">

          <span className="inline-block px-5 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white font-semibold">
             Smart Society Management
          </span>

          <h1 className="mt-8 text-4xl lg:text-6xl font-black leading-tight text-white">
            One Platform
            <br />

            <span className="text-blue-400">
              For Your Entire Society
            </span>

          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-200 max-w-2xl">
            Manage residents, complaints, maintenance, visitors,
            notices, amenities and staff from one modern,
            secure and easy-to-use dashboard.
          </p>

          <div className="flex flex-wrap gap-5 mt-12">

            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold flex items-center gap-3 transition duration-300 shadow-2xl"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition duration-300"
            >
              Login
            </Link>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-10 mt-20 max-w-xl">

            <div>
              <h2 className="text-4xl font-black text-white">
                500+
              </h2>
              <p className="text-gray-300 mt-2">
                Residents
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">
                50+
              </h2>
              <p className="text-gray-300 mt-2">
                Buildings
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white">
                24/7
              </h2>
              <p className="text-gray-300 mt-2">
                Security
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;