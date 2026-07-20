import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    visitorName: "",
    residentName: "",
    flatNumber: "",
    purpose: "",
    status: "Inside",
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await api.get("/visitors");
      setVisitors(res.data);
    } catch (err) {
      toast.error("Failed to fetch visitors");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addVisitor = async (e) => {
    e.preventDefault();

    try {
      await api.post("/visitors", formData);

      toast.success("Visitor Added Successfully");

      setFormData({
        visitorName: "",
        residentName: "",
        flatNumber: "",
        purpose: "",
        status: "Inside",
      });

      fetchVisitors();
    } catch (err) {
      toast.error("Failed to Add Visitor");
    }
  };

  const markExit = async (id) => {
    try {
      await api.put(`/visitors/${id}`, {
        status: "Exited",
        exitTime: new Date(),
      });

      toast.success("Visitor Exited");
      fetchVisitors();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const deleteVisitor = async (id) => {
    try {
      await api.delete(`/visitors/${id}`);
      toast.success("Visitor Deleted");
      fetchVisitors();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.visitorName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      visitor.flatNumber
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Visitor Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all society visitors.
        </p>
      </div>

      {/* Dashboard */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Total Visitors</h2>
          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {visitors.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Inside</h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {visitors.filter(v => v.status === "Inside").length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Exited</h2>
          <p className="text-4xl font-bold text-red-400 mt-2">
            {visitors.filter(v => v.status === "Exited").length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Today's Visitors</h2>
          <p className="text-4xl font-bold text-purple-400 mt-2">
            {
              visitors.filter(
                v =>
                  new Date(v.createdAt).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </p>
        </div>

      </div>

      {/* Add Visitor */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6 mb-8">

        <form
          onSubmit={addVisitor}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            name="visitorName"
            placeholder="Visitor Name"
            value={formData.visitorName}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <input
            name="residentName"
            placeholder="Resident Name"
            value={formData.residentName}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <input
            name="flatNumber"
            placeholder="Flat Number"
            value={formData.flatNumber}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <input
            name="purpose"
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <button className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-xl py-3 font-semibold hover:scale-105 transition">
            Add Visitor
          </button>

        </form>

      </div>
            {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Visitor or Flat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Visitor Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">

            <tr>
              <th className="p-4 text-left">Visitor</th>
              <th className="p-4 text-left">Resident</th>
              <th className="p-4 text-left">Flat</th>
              <th className="p-4 text-left">Purpose</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (

                <tr
                  key={visitor._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="p-4 text-white">
                    {visitor.visitorName}
                  </td>

                  <td className="p-4 text-slate-300">
                    {visitor.residentName}
                  </td>

                  <td className="p-4 text-slate-300">
                    {visitor.flatNumber}
                  </td>

                  <td className="p-4 text-slate-300">
                    {visitor.purpose}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        visitor.status === "Inside"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {visitor.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      {visitor.status === "Inside" && (

                        <button
                          onClick={() => markExit(visitor._id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          Exit
                        </button>

                      )}

                      <button
                        onClick={() => deleteVisitor(visitor._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-slate-400"
                >
                  No visitors found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Visitors;