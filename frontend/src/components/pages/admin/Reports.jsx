import React from "react";
import {
  FaUsers,
  FaTools,
  FaMoneyBill,
  FaBullhorn,
  FaFilePdf,
  FaFileExcel,
  FaDownload,
} from "react-icons/fa";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">

      {/* Heading */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Reports & Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          View society statistics and download reports.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <FaUsers className="text-cyan-400 text-4xl mb-4" />
          <h2 className="text-slate-400">Residents</h2>
          <h1 className="text-4xl font-bold text-white mt-2">
            250
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <FaTools className="text-red-400 text-4xl mb-4" />
          <h2 className="text-slate-400">Complaints</h2>
          <h1 className="text-4xl font-bold text-white mt-2">
            45
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <FaMoneyBill className="text-green-400 text-4xl mb-4" />
          <h2 className="text-slate-400">Maintenance</h2>
          <h1 className="text-4xl font-bold text-white mt-2">
            ₹2.5L
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <FaBullhorn className="text-yellow-400 text-4xl mb-4" />
          <h2 className="text-slate-400">Notices</h2>
          <h1 className="text-4xl font-bold text-white mt-2">
            18
          </h1>
        </div>

      </div>

      {/* Analytics */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl mb-10">

        <h2 className="text-2xl font-bold text-white mb-6">
          Society Analytics
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Complaint Resolution
            </h3>

            <div className="w-full bg-slate-700 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full w-4/5"></div>
            </div>

            <p className="text-slate-300 mt-3">
              80% Complaints Resolved
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Maintenance Collection
            </h3>

            <div className="w-full bg-slate-700 rounded-full h-4">
              <div className="bg-cyan-500 h-4 rounded-full w-3/4"></div>
            </div>

            <p className="text-slate-300 mt-3">
              75% Collection Completed
            </p>

          </div>

        </div>

      </div>

      {/* Download Reports */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-white mb-6">
          Download Reports
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition rounded-xl p-6 text-white flex flex-col items-center">
            <FaFilePdf size={40} />
            <span className="mt-4 font-semibold">
              Resident Report
            </span>
            <FaDownload className="mt-3" />
          </button>

          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition rounded-xl p-6 text-white flex flex-col items-center">
            <FaFileExcel size={40} />
            <span className="mt-4 font-semibold">
              Maintenance Report
            </span>
            <FaDownload className="mt-3" />
          </button>

          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition rounded-xl p-6 text-white flex flex-col items-center">
            <FaFilePdf size={40} />
            <span className="mt-4 font-semibold">
              Complaint Report
            </span>
            <FaDownload className="mt-3" />
          </button>

          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition rounded-xl p-6 text-white flex flex-col items-center">
            <FaFileExcel size={40} />
            <span className="mt-4 font-semibold">
              Society Summary
            </span>
            <FaDownload className="mt-3" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Reports;