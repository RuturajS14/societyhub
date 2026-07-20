import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import {
  FaSwimmingPool,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const Amenities = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    residentName: "",
    email: "",
    flatNumber: "",
    amenity: "Club House",
    bookingDate: "",
    timeSlot: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/amenities");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createBooking = async (e) => {
    e.preventDefault();

    try {
      await api.post("/amenities", formData);

      toast.success("Booking Created Successfully");

      setFormData({
        residentName: "",
        email: "",
        flatNumber: "",
        amenity: "Club House",
        bookingDate: "",
        timeSlot: "",
      });

      fetchBookings();
    } catch (err) {
      toast.error("Booking Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/amenities/${id}`, { status });

      toast.success(`Booking ${status}`);

      fetchBookings();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/amenities/${id}`);

      toast.success("Booking Deleted");

      fetchBookings();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.residentName.toLowerCase().includes(search.toLowerCase()) ||
      b.flatNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Amenity Booking Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all society amenity bookings
        </p>
      </div>

      {/* Dashboard */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <FaSwimmingPool size={35} className="mb-4" />
          <p>Total Bookings</p>
          <h2 className="text-4xl font-bold">
            {bookings.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <FaClock size={35} className="mb-4" />
          <p>Pending</p>
          <h2 className="text-4xl font-bold">
            {bookings.filter(
              (b) => b.status === "Pending"
            ).length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <FaCheckCircle size={35} className="mb-4" />
          <p>Approved</p>
          <h2 className="text-4xl font-bold">
            {bookings.filter(
              (b) => b.status === "Approved"
            ).length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <FaTimesCircle size={35} className="mb-4" />
          <p>Rejected</p>
          <h2 className="text-4xl font-bold">
            {bookings.filter(
              (b) => b.status === "Rejected"
            ).length}
          </h2>
        </div>

      </div>

      {/* Booking Form */}

      <form
        onSubmit={createBooking}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8 grid md:grid-cols-2 gap-4"
      >

        <input
          name="residentName"
          placeholder="Resident Name"
          value={formData.residentName}
          onChange={handleChange}
          required
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <input
          name="flatNumber"
          placeholder="Flat Number"
          value={formData.flatNumber}
          onChange={handleChange}
          required
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <select
          name="amenity"
          value={formData.amenity}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
        >
          <option>Club House</option>
          <option>Swimming Pool</option>
          <option>Gym</option>
          <option>Garden</option>
          <option>Community Hall</option>
        </select>

        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <input
          name="timeSlot"
          placeholder="Time Slot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-600 text-white rounded-xl py-3 font-semibold transition hover:scale-105"
        >
          Create Booking
        </button>

      </form>
            {/* Search */}

      <input
        type="text"
        placeholder="Search by Resident or Flat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">

              <th className="p-4">Resident</th>
              <th className="p-4">Flat</th>
              <th className="p-4">Amenity</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.length > 0 ? (

              filteredBookings.map((booking) => (

                <tr
                  key={booking._id}
                  className="border-b border-slate-700 hover:bg-slate-800 transition"
                >

                  <td className="p-4 text-white font-semibold">
                    {booking.residentName}
                  </td>

                  <td className="p-4 text-slate-300">
                    {booking.flatNumber}
                  </td>

                  <td className="p-4 text-slate-300">
                    {booking.amenity}
                  </td>

                  <td className="p-4 text-slate-300">
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-slate-300">
                    {booking.timeSlot}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        booking.status === "Approved"
                          ? "bg-green-600 text-white"
                          : booking.status === "Rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          booking._id,
                          "Approved"
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          booking._id,
                          "Rejected"
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center text-slate-400 py-8"
                >
                  No bookings found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Amenities;