import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    noticeDate: "",
    important: false,
  });

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices");
      setNotices(res.data);
    } catch (err) {
      toast.error("Failed to fetch notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
        toast.success("Notice Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
        category: "General",
        noticeDate: "",
        important: false,
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
      noticeDate: notice.noticeDate?.substring(0, 10),
      important: notice.important,
    });
  };

  const deleteNotice = async (id) => {
    try {
      await api.delete(`/notices/${id}`);
      toast.success("Notice Deleted Successfully");
      fetchNotices();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

 return (
  <div className="min-h-screen bg-slate-950 text-white p-6">

    {/* Heading */}
    <div className="mb-6">
      <h1 className="text-4xl font-bold">
        Notices Management
      </h1>
      <p className="text-slate-400">
        Create and manage society notices.
      </p>
    </div>

    {/* Form */}
    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
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
          className="bg-slate-800 border border-slate-700 rounded-xl p-3"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-xl p-3"
        >
          <option>General</option>
          <option>Meeting</option>
          <option>Maintenance</option>
          <option>Emergency</option>
        </select>

        <textarea
          name="description"
          placeholder="Notice Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:col-span-2"
          rows="4"
          required
        />

        <input
          type="date"
          name="noticeDate"
          value={formData.noticeDate}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-xl p-3"
          required
        />

        <label className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4">
          <input
            type="checkbox"
            name="important"
            checked={formData.important}
            onChange={handleChange}
          />
          Important Notice
        </label>

        <button
          className={`rounded-xl py-3 font-semibold transition ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
          }`}
        >
          {editingId ? "Update Notice" : "Publish Notice"}
        </button>

      </form>

    </div>

    {/* Search */}

    <input
      type="text"
      placeholder="Search Notice..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6"
    />

    {/* Table */}

    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600">

          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Date</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Actions</th>
          </tr>

        </thead>

        <tbody>

          {notices
            .filter((notice) =>
              notice.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((notice) => (

              <tr
                key={notice._id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="p-4">
                  {notice.title}
                </td>

                <td className="p-4">
                  {notice.category}
                </td>

                <td className="p-4">
                  {new Date(notice.noticeDate).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-4 py-1 rounded-full text-sm ${
                      notice.important
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {notice.important
                      ? "Important"
                      : "Normal"}
                  </span>

                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => editNotice(notice)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
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