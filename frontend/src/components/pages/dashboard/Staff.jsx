import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "Security Guard",
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
        role: "Security Guard",
        phone: "",
        salary: "",
        status: "Active",
      });

      setEditingId(null);
      fetchStaff();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const editStaff = (member) => {
    setEditingId(member._id);

    setFormData({
      name: member.name,
      role: member.role,
      phone: member.phone,
      salary: member.salary,
      status: member.status,
    });
  };

  const deleteStaff = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      toast.success("Staff Deleted Successfully");
      fetchStaff();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Staff Management
        </h1>

        <p className="text-slate-400">
          Manage society staff details.
        </p>
      </div>

      {/* Form */}
      <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Update Staff" : "Add Staff"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Staff Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <option>Security Guard</option>
            <option>Cleaner</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Gardener</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            type="submit"
            className={`rounded-xl py-3 font-semibold transition ${
              editingId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
            }`}
          >
            {editingId ? "Update Staff" : "Add Staff"}
          </button>

        </form>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6"
      />

      {/* Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">

            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {staff
              .filter(
                (member) =>
                  member.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  member.role
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((member) => (
                <tr
                  key={member._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="p-4">{member.name}</td>

                  <td className="p-4">{member.role}</td>

                  <td className="p-4">{member.phone}</td>

                  <td className="p-4 text-green-400 font-semibold">
                    ₹{member.salary}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        member.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => editStaff(member)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStaff(member._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Staff;