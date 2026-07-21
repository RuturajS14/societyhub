import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaBuilding, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
     const res = await axios.post(
        "https://societyhub-back.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6 overflow-hidden relative">

      {/* Background */}
      <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="relative w-full max-w-6xl bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-14 text-white">

          <div>

            <div className="flex items-center gap-4 mb-16">

              <div className="bg-white p-5 rounded-2xl">
                <FaBuilding className="text-blue-700 text-4xl" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  SocietyHub
                </h1>

                <p className="text-blue-100">
                  Smart Society Management
                </p>

              </div>

            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Welcome Back
            </h2>

            <p className="text-blue-100 text-lg leading-8">
              Manage Residents, Visitors, Complaints,
              Maintenance, Staff, Notices and Amenities
              using one modern dashboard.
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
                99.9%
              </h2>
              <p>Uptime</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold">
                24/7
              </h2>
              <p>Support</p>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-white mb-2">
            Login
          </h2>

          <p className="text-slate-400 mb-10">
            Login to continue to your dashboard.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="relative">

              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

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
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-14 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
                        <div className="flex justify-end">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-8 text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-semibold hover:text-cyan-300"
            >
              Register
            </Link>
          </p>

          <div className="mt-10 border-t border-slate-700 pt-6">

            <div className="flex justify-center gap-8 text-center">

              <div>
                <h3 className="text-2xl font-bold text-cyan-400">
                  500+
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
                  Staff
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  24/7
                </h3>
                <p className="text-slate-400 text-sm">
                  Security
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

export default Login;