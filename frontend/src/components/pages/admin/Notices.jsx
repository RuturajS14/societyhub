import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import {
  FaBullhorn,
  FaClipboardList,
  FaExclamationTriangle,
} from "react-icons/fa";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices");
      setNotices(res.data);
    } catch (err) {
      toast.error("Failed to fetch notices");
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
        await api.put(`/notices/${editingId}`, formData);
        toast.success("Notice Updated Successfully");
      } else {
        await api.post("/notices", formData);
        toast.success("Notice Created Successfully");
      }

      setFormData({
        title: "",
        description: "",
        category: "General",
      });

      setEditingId(null);
      fetchNotices();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const editNotice = (notice) => {
    setEditingId(notice._id);

    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
    });
  };

  const deleteNotice = async (id) => {
    try {
      await api.delete(`/notices/${id}`);
      toast.success("Notice Deleted");
      fetchNotices();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Notice Management
        </h1>

        <p className="text-slate-400 mt-2">
          Create and manage society notices
        </p>
      </div>

      {/* Dashboard */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
          <FaBullhorn size={34} className="mb-3" />
          <p>Total Notices</p>
          <h2 className="text-4xl font-bold">
            {notices.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <FaClipboardList size={34} className="mb-3" />
          <p>General Notices</p>
          <h2 className="text-4xl font-bold">
            {notices.filter(n => n.category === "General").length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
          <FaExclamationTriangle size={34} className="mb-3" />
          <p>Emergency</p>
          <h2 className="text-4xl font-bold">
            {notices.filter(n => n.category === "Emergency").length}
          </h2>
        </div>

      </div>

      {/* Form */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6 mb-8">

        <h2 className="text-2xl text-white font-bold mb-6">
          {editingId ? "Update Notice" : "Create Notice"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Notice Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option>General</option>
            <option>Maintenance</option>
            <option>Emergency</option>
            <option>Event</option>
          </select>

          <textarea
            name="description"
            rows="4"
            placeholder="Notice Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            className={`md:w-56 rounded-xl py-3 text-white font-semibold transition hover:scale-105 ${
              editingId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-cyan-500 to-blue-700"
            }`}
          >
            {editingId ? "Update Notice" : "Create Notice"}
          </button>

        </form>

      </div>
            {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search Notice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-slate-900 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">

            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Posted By</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredNotices.map((notice) => (

              <tr
                key={notice._id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="p-4 text-white font-medium">
                  {notice.title}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      notice.category === "Emergency"
                        ? "bg-red-500 text-white"
                        : notice.category === "Maintenance"
                        ? "bg-yellow-500 text-black"
                        : notice.category === "Event"
                        ? "bg-purple-600 text-white"
                        : "bg-cyan-600 text-white"
                    }`}
                  >
                    {notice.category}
                  </span>

                </td>

                <td className="p-4 text-slate-300">
                  {notice.postedBy}
                </td>

                <td className="p-4 text-slate-300">
                  {new Date(
                    notice.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() => editNotice(notice)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition px-4 py-2 rounded-lg text-white font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition px-4 py-2 rounded-lg text-white font-semibold"
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

export default Notices;