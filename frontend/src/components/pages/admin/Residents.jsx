import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Residents = () => {
  const [residents, setResidents] = useState([]);

  const fetchResidents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/residents"
      );
      setResidents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/residents/${id}`,
        { status }
      );
      fetchResidents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
          <FaUsers size={30} className="text-white" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">
            Resident Approval
          </h1>

          <p className="text-slate-400">
            Approve or reject resident registrations
          </p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-700">

              <tr className="text-white">

                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Flat</th>
                <th className="p-4 text-center">Family</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {residents.map((resident) => (

                <tr
                  key={resident._id}
                  className="border-b border-slate-700 hover:bg-slate-800 transition"
                >

                  <td className="p-4 text-white font-medium">
                    {resident.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {resident.email}
                  </td>

                  <td className="p-4 text-slate-300">
                    {resident.flatNumber}
                  </td>

                  <td className="p-4 text-center text-slate-300">
                    {resident.familyMembers}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        resident.status === "Approved"
                          ? "bg-green-600 text-white"
                          : resident.status === "Rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {resident.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          updateStatus(resident._id, "Approved")
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white transition"
                      >
                        <FaCheckCircle />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(resident._id, "Rejected")
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition"
                      >
                        <FaTimesCircle />
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Residents;