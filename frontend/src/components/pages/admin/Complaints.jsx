import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, {
        status,
      });

      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.residentName.toLowerCase().includes(search.toLowerCase()) ||
      item.flatNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-8">

  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-4xl font-bold text-white">
        Complaint Management
      </h1>
      <p className="text-slate-400 mt-2">
        Manage and resolve resident complaints
      </p>
    </div>
  </div>

  {/* Dashboard Cards */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
      <p className="text-sm">Total Complaints</p>
      <h2 className="text-4xl font-bold mt-2">
        {complaints.length}
      </h2>
    </div>

    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
      <p className="text-sm">Pending</p>
      <h2 className="text-4xl font-bold mt-2">
        {complaints.filter(c => c.status === "Pending").length}
      </h2>
    </div>

    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
      <p className="text-sm">In Progress</p>
      <h2 className="text-4xl font-bold mt-2">
        {complaints.filter(c => c.status === "In Progress").length}
      </h2>
    </div>

    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
      <p className="text-sm">Resolved</p>
      <h2 className="text-4xl font-bold mt-2">
        {complaints.filter(c => c.status === "Resolved").length}
      </h2>
    </div>

  </div>

  {/* Search & Filter */}

  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4">

    <input
      type="text"
      placeholder="Search Resident or Flat..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
    >
      <option>All</option>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Resolved</option>
    </select>

  </div>

  {/* Table */}

  <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-lg overflow-hidden">

    <table className="w-full">

      <thead className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">

        <tr>
          <th className="p-4 text-left">Resident</th>
          <th className="p-4 text-left">Flat</th>
          <th className="p-4 text-left">Category</th>
          <th className="p-4 text-left">Priority</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-center">Action</th>
        </tr>

      </thead>

      <tbody>

        {filteredComplaints.map((item) => (

          <tr
            key={item._id}
            className="border-b border-slate-700 hover:bg-slate-800 transition"
          >

            <td className="p-4 text-white font-medium">
              {item.residentName}
            </td>

            <td className="p-4 text-slate-300">
              {item.flatNumber}
            </td>

            <td className="p-4 text-slate-300">
              {item.category}
            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  item.priority === "High"
                    ? "bg-red-500 text-white"
                    : item.priority === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.priority}
              </span>

            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  item.status === "Resolved"
                    ? "bg-green-600 text-white"
                    : item.status === "In Progress"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {item.status}
              </span>

            </td>

            <td className="p-4">

              <div className="flex justify-center gap-3">

                <button
                  onClick={() =>
                    updateStatus(item._id, "In Progress")
                  }
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition"
                >
                  Start
                </button>

                <button
                  onClick={() =>
                    updateStatus(item._id, "Resolved")
                  }
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                >
                  Resolve
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
    
  );
};

export default Complaints;