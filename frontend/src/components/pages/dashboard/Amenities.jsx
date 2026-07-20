import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    residentName: "",
    flatNumber: "",
    amenityName: "Gym",
    bookingDate: "",
    status: "Pending",
  });

  const fetchAmenities = async () => {
    try {
      const res = await api.get("/amenities");
      setAmenities(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchAmenities();
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
        await api.put(`/amenities/${editingId}`, formData);
        toast.success("Booking Updated Successfully");
      } else {
        await api.post("/amenities", formData);
        toast.success("Booking Added Successfully");
      }

      setFormData({
        residentName: "",
        flatNumber: "",
        amenityName: "Gym",
        bookingDate: "",
        status: "Pending",
      });

      setEditingId(null);
      fetchAmenities();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const editBooking = (booking) => {
    setEditingId(booking._id);

    setFormData({
      residentName: booking.residentName,
      flatNumber: booking.flatNumber,
      amenityName: booking.amenityName,
      bookingDate: booking.bookingDate?.substring(0, 10),
      status: booking.status,
    });
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/amenities/${id}`);
      toast.success("Booking Deleted Successfully");
      fetchAmenities();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

  {/* Heading */}
  <div className="mb-6">
    <h1 className="text-4xl font-bold">
      Amenities Management
    </h1>
    <p className="text-slate-400">
      Book and manage society amenities.
    </p>
  </div>

  {/* Form */}
  <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-xl p-6 mb-8">

    <h2 className="text-2xl font-bold mb-6">
      {editingId ? "Update Booking" : "New Booking"}
    </h2>

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

      <select
        name="amenityName"
        value={formData.amenityName}
        onChange={handleChange}
        className="bg-slate-800 border border-slate-700 rounded-xl p-3"
      >
        <option>Swimming Pool</option>
        <option>Gym</option>
        <option>Club House</option>
        <option>Badminton Court</option>
        <option>Garden</option>
      </select>

      <input
        type="date"
        name="bookingDate"
        value={formData.bookingDate}
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
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      <button
        className={`rounded-xl py-3 font-semibold transition ${
          editingId
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105"
        }`}
      >
        {editingId ? "Update Booking" : "Book Amenity"}
      </button>

    </form>

  </div>

  {/* Search */}

  <input
    type="text"
    placeholder="Search Resident, Flat or Amenity..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6"
  />

  {/* Table */}

  <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl">

    <table className="w-full">

      <thead className="bg-green-600">

        <tr>
          <th className="p-4">Resident</th>
          <th className="p-4">Flat</th>
          <th className="p-4">Amenity</th>
          <th className="p-4">Booking Date</th>
          <th className="p-4">Status</th>
          <th className="p-4">Actions</th>
        </tr>

      </thead>

      <tbody>

        {amenities
          .filter(
            (a) =>
              a.residentName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              a.flatNumber
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              a.amenityName
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((booking) => (

            <tr
              key={booking._id}
              className="border-b border-slate-800 hover:bg-slate-800 transition"
            >

              <td className="p-4">{booking.residentName}</td>

              <td className="p-4">{booking.flatNumber}</td>

              <td className="p-4">{booking.amenityName}</td>

              <td className="p-4">
                {new Date(booking.bookingDate).toLocaleDateString()}
              </td>

              <td className="p-4">

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    booking.status === "Approved"
                      ? "bg-green-600"
                      : booking.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {booking.status}
                </span>

              </td>

              <td className="p-4 flex gap-2">

                <button
                  onClick={() => editBooking(booking)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBooking(booking._id)}
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

export default Amenities;