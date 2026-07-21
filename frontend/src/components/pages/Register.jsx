import React, { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flatNumber: "",
    familyMembers: 0,
    password: "",
    role: "resident",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/register",
        formData
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen  bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6 py- overflow-hidden relative">
      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20"></div>

      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white p-8">

          <div>

            <div className="flex items-center gap-4 mb-14">

              <div className="bg-white p-5 rounded-2xl">
                <FaBuilding
                  className="text-blue-700"
                  size={38}
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  SocietyHub
                </h1>

                <p className="text-blue-100">
                  Smart Society Management
                </p>

              </div>

            </div>

            <h2 className="text-4xl font-bold mb-6">
              Join SocietyHub
            </h2>

            <p className="text-blue-100 text-lg leading-8">
              Create your account and manage residents,
              visitors, maintenance, complaints, staff,
              notices and amenities from one dashboard.
            </p>

          </div>

          <div className="grid grid-cols-3 gap-5">

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold">
                1200+
              </h2>
              <p>Residents</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold">
                50+
              </h2>
              <p>Societies</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold">
                24/7
              </h2>
              <p>Support</p>
            </div>

          </div>

        </div>

        {/* Right Side */}

       <div className="p-6 lg:p-7 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-slate-400 mb-8">
            Register your SocietyHub account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
                      <div className="relative">

              <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="relative">

              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="relative">

                <FaHome className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="flatNumber"
                  placeholder="Flat Number"
                  value={formData.flatNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="relative">

                <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="number"
                  name="familyMembers"
                  placeholder="Family Members"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div className="relative">

              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-14 pr-14 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <input type="hidden" name="role" value="resident" />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-8 text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 font-semibold hover:text-cyan-300"
            >
              Login
            </Link>
          </p>

          <div className="mt-10 border-t border-slate-700 pt-6">

            <div className="flex justify-center gap-8 text-center">

              <div>
                <h3 className="text-2xl font-bold text-cyan-400">
                  1200+
                </h3>
                <p className="text-slate-400 text-sm">
                  Residents
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-400">
                  50+
                </h3>
                <p className="text-slate-400 text-sm">
                  Societies
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  24/7
                </h3>
                <p className="text-slate-400 text-sm">
                  Support
                </p>
              </div>

            </div>

            <p className="text-center text-slate-500 text-sm mt-8">
              © 2026 SocietyHub • Smart Society Management System
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;