import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    residentName: "",
    flatNumber: "",
    category: "Electrical",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      toast.error("Failed to fetch complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/complaints/${editingId}`, formData);
        toast.success("Complaint Updated Successfully");
      } else {
        await api.post("/complaints", formData);
        toast.success("Complaint Added Successfully");
      }

      setFormData({
        residentName: "",
        flatNumber: "",
        category: "Electrical",
        description: "",
        priority: "Medium",
        status: "Pending",
      });

      setEditingId(null);
      fetchComplaints();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const editComplaint = (complaint) => {
    setEditingId(complaint._id);

    setFormData({
      residentName: complaint.residentName,
      flatNumber: complaint.flatNumber,
      category: complaint.category,
      description: complaint.description,
      priority: complaint.priority,
      status: complaint.status,
    });
  };

  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/complaints/${id}`);
      toast.success("Complaint Deleted Successfully");
      fetchComplaints();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-8">

          <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
            🛠 Complaint Management
          </span>

          <h1 className="text-4xl font-bold text-white mt-4">
            Complaints Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and track resident complaints efficiently.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
            <p className="text-gray-400">Total</p>
            <h2 className="text-4xl font-bold text-white mt-2">
              {total}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
            <p className="text-gray-400">Pending</p>
            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {pending}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
            <p className="text-gray-400">In Progress</p>
            <h2 className="text-4xl font-bold text-blue-400 mt-2">
              {progress}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
            <p className="text-gray-400">Resolved</p>
            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {resolved}
            </h2>
          </div>

        </div>

        {/* Form */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="residentName"
              placeholder="Resident Name"
              value={formData.residentName}
              onChange={handleChange}
              required
              className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
            />

            <input
              type="text"
              name="flatNumber"
              placeholder="Flat Number"
              value={formData.flatNumber}
              onChange={handleChange}
              required
              className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-xl p-3 text-white"
            >
              <option className="text-black">Electrical</option>
              <option className="text-black">Plumbing</option>
              <option className="text-black">Security</option>
              <option className="text-black">Cleaning</option>
              <option className="text-black">Other</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-xl p-3 text-white"
            >
              <option className="text-black">Low</option>
              <option className="text-black">Medium</option>
              <option className="text-black">High</option>
            </select>

                        <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-xl p-3 text-white"
            >
              <option className="text-black">Pending</option>
              <option className="text-black">In Progress</option>
              <option className="text-black">Resolved</option>
            </select>

            <textarea
              name="description"
              placeholder="Complaint Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="md:col-span-2 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className={`md:col-span-2 py-3 rounded-xl font-semibold transition ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {editingId ? "Update Complaint" : "Add Complaint"}
            </button>

          </form>

        </div>

        {/* Complaint List */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

          <input
            type="text"
            placeholder="Search by Resident or Flat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 mb-6 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400"
          />

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600/80 text-white">

                <tr>
                  <th className="py-3 px-4">Resident</th>
                  <th className="py-3 px-4">Flat</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>

              </thead>

              <tbody>

                {complaints
                  .filter(
                    (complaint) =>
                      complaint.residentName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      complaint.flatNumber
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((complaint) => (

                    <tr
                      key={complaint._id}
                      className="border-b border-white/10 hover:bg-white/5 transition text-gray-200"
                    >

                      <td className="py-3 px-4">
                        {complaint.residentName}
                      </td>

                      <td className="py-3 px-4">
                        {complaint.flatNumber}
                      </td>

                      <td className="py-3 px-4">
                        {complaint.category}
                      </td>

                      <td className="py-3 px-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            complaint.priority === "High"
                              ? "bg-red-500/20 text-red-300 border border-red-400"
                              : complaint.priority === "Medium"
                              ? "bg-orange-500/20 text-orange-300 border border-orange-400"
                              : "bg-green-500/20 text-green-300 border border-green-400"
                          }`}
                        >
                          {complaint.priority}
                        </span>

                      </td>

                      <td className="py-3 px-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            complaint.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400"
                              : complaint.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-400"
                              : "bg-green-500/20 text-green-300 border border-green-400"
                          }`}
                        >
                          {complaint.status}
                        </span>

                      </td>

                      <td className="py-3 px-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() => editComplaint(complaint)}
                            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteComplaint(complaint._id)}
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                          >
                            Delete
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

    </section>
  );
};

export default Complaints;