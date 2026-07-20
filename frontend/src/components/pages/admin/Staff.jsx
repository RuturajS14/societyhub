import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    work: "Security",
    phone: "",
    salary: "",
    status: "Active",
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get("/staff");
      setStaff(res.data);
    } catch (err) {
      toast.error("Failed to fetch staff");
    }
  };

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
        await api.put(`/staff/${editingId}`, formData);
        toast.success("Staff Updated Successfully");
      } else {
        await api.post("/staff", formData);
        toast.success("Staff Added Successfully");
      }

      setFormData({
        name: "",
        work: "Security",
        phone: "",
        salary: "",
        status: "Active",
      });

      setEditingId(null);
      fetchStaff();
    } catch (err) {
      toast.error("Operation Failed");
    }
  };

  const editStaff = (member) => {
    setEditingId(member._id);

    setFormData({
      name: member.name,
      work: member.work,
      phone: member.phone,
      salary: member.salary,
      status: member.status,
    });
  };

  const deleteStaff = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      toast.success("Staff Deleted");
      fetchStaff();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.work.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Staff Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all society staff members.
        </p>
      </div>

      {/* Dashboard */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Total Staff</h2>
          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {staff.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Active Staff</h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {staff.filter((s) => s.status === "Active").length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">Inactive Staff</h2>
          <p className="text-4xl font-bold text-red-400 mt-2">
            {staff.filter((s) => s.status === "Inactive").length}
          </p>
        </div>

      </div>

      {/* Form */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6 mb-8">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Staff Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <select
            name="work"
            value={formData.work}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
          >
            <option>Security</option>
            <option>Housekeeping</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Gardener</option>
            <option>Manager</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            className={`rounded-xl text-white font-semibold transition hover:scale-105 ${
              editingId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-cyan-500 to-blue-700"
            }`}
          >
            {editingId ? "Update Staff" : "Add Staff"}
          </button>

        </form>

      </div>
            {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Staff Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Work</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Salary</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (

                <tr
                  key={member._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="p-4 text-white">
                    {member.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {member.work}
                  </td>

                  <td className="p-4 text-slate-300">
                    {member.phone}
                  </td>

                  <td className="p-4 text-cyan-400 font-semibold">
                    ₹{member.salary}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        member.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {member.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => editStaff(member)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStaff(member._id)}
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
                  No staff members found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Staff;