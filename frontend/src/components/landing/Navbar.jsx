import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaEnvelope,
  FaUserCircle,
  FaBuilding,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto mt-6 px-6">

        {/* Glass Navbar */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">

          <div className="flex items-center justify-between h-20 px-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <FaBuilding size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  SocietyHub
                </h1>

                <p className="text-xs text-gray-300">
                  Smart Society Management
                </p>
              </div>
            </Link>

            {/* Menu */}
            <div className="hidden lg:flex items-center gap-8">

              <a
                href="#home"
                className="flex items-center gap-2 text-white hover:text-blue-300 transition"
              >
                <FaHome />
                Home
              </a>

              <a
                href="#features"
                className="flex items-center gap-2 text-white hover:text-blue-300 transition"
              >
                <FaThLarge />
                Features
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 text-white hover:text-blue-300 transition"
              >
                <FaEnvelope />
                Contact
              </a>

            </div>

            {/* Right Side */}
            {user ? (
              <div className="flex items-center gap-4">

                <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2">

                  <FaUserCircle
                    size={30}
                    className="text-blue-300"
                  />

                  <div>
                    <h3 className="text-white font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-300">
                      {user.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex gap-4">

                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;