import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    visitorName: "",
    phone: "",
    residentName: "",
    flatNumber: "",
    purpose: "",
    checkIn: "",
    checkOut: "",
  });

  const fetchVisitors = async () => {
    try {
      const res = await api.get("/visitors");
      setVisitors(res.data);
    } catch (err) {
      toast.error("Failed to fetch visitors");
    }
  };

  useEffect(() => {
    fetchVisitors();
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
        await api.put(`/visitors/${editingId}`, formData);
        toast.success("Visitor Updated Successfully");
      } else {
        await api.post("/visitors", formData);
        toast.success("Visitor Added Successfully");
      }

      setFormData({
        visitorName: "",
        phone: "",
        residentName: "",
        flatNumber: "",
        purpose: "",
        checkIn: "",
        checkOut: "",
      });

      setEditingId(null);
      fetchVisitors();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const editVisitor = (visitor) => {
    setEditingId(visitor._id);

    setFormData({
      visitorName: visitor.visitorName,
      phone: visitor.phone,
      residentName: visitor.residentName,
      flatNumber: visitor.flatNumber,
      purpose: visitor.purpose,
      checkIn: visitor.checkIn,
      checkOut: visitor.checkOut,
    });
  };

  const deleteVisitor = async (id) => {
    try {
      await api.delete(`/visitors/${id}`);
      toast.success("Visitor Deleted Successfully");
      fetchVisitors();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Visitors Management
        </h1>

        <p className="text-slate-400">
          Manage society visitor entries and exits.
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Update Visitor" : "Add Visitor"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="visitorName"
            placeholder="Visitor Name"
            value={formData.visitorName}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

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
            type="text"
            name="residentName"
            placeholder="Resident Name"
            value={formData.residentName}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="flatNumber"
            placeholder="Flat Number"
            value={formData.flatNumber}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="checkIn"
            placeholder="Check In"
            value={formData.checkIn}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
            required
          />

          <input
            type="text"
            name="checkOut"
            placeholder="Check Out"
            value={formData.checkOut}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3"
          />

          <button
            type="submit"
            className={`rounded-xl py-3 font-semibold transition ${
              editingId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
            }`}
          >
            {editingId ? "Update Visitor" : "Add Visitor"}
          </button>

        </form>

      </div>

      <input
        type="text"
        placeholder="Search Visitor, Resident or Flat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6"
      />

      <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">

            <tr>
              <th className="p-4">Visitor</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Resident</th>
              <th className="p-4">Flat</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

          {visitors
      .filter(
        (v) =>
          v.visitorName.toLowerCase().includes(search.toLowerCase()) ||
          v.residentName.toLowerCase().includes(search.toLowerCase()) ||
          v.flatNumber.toLowerCase().includes(search.toLowerCase())
      )
      .map((visitor) => (
        <tr
          key={visitor._id}
          className="border-b border-slate-800 hover:bg-slate-800 transition"
        >
          <td className="p-4">{visitor.visitorName}</td>

          <td className="p-4">{visitor.phone}</td>

          <td className="p-4">{visitor.residentName}</td>

          <td className="p-4">{visitor.flatNumber}</td>

          <td className="p-4">{visitor.purpose}</td>

          <td className="p-4">{visitor.checkIn}</td>

          <td className="p-4">
            {visitor.checkOut || (
              <span className="text-green-400 font-semibold">
                Still Inside
              </span>
            )}
          </td>

          <td className="p-4 flex gap-2">

            <button
              onClick={() => editVisitor(visitor)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteVisitor(visitor._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
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

    export default Visitors;