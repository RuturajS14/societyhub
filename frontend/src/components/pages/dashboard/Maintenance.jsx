import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Maintenance = () => {
  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    residentName: "",
    email: "",
    flatNumber: "",
    month: "",
    amount: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/maintenance");
      setRecords(res.data);
    } catch (err) {
      toast.error("Failed to fetch records");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createBill = async (e) => {
    e.preventDefault();

    try {
      await api.post("/maintenance", formData);

      toast.success("Maintenance Bill Created");

      setFormData({
        residentName: "",
        email: "",
        flatNumber: "",
        month: "",
        amount: "",
        dueDate: "",
      });

      fetchRecords();
    } catch (err) {
      toast.error("Failed to create bill");
    }
  };

  const markPaid = async (id) => {
    try {
      await api.put(`/maintenance/${id}/pay`);

      toast.success("Bill Marked as Paid");

      fetchRecords();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  const filteredRecords = records.filter((record) => {
    return (
      record.residentName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      record.flatNumber
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const paidBills = records.filter(
    (r) => r.status === "Paid"
  ).length;

  const unpaidBills = records.filter(
    (r) => r.status === "Unpaid"
  ).length;

  const totalCollection = records
    .filter((r) => r.status === "Paid")
    .reduce((sum, r) => sum + Number(r.amount), 0);
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Maintenance Management</h1>
          <p className="text-slate-400">
            Manage society maintenance bills and payments.
          </p>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 shadow-xl">
            <h2 className="text-slate-200">Total Bills</h2>
            <p className="text-4xl font-bold mt-2">{records.length}</p>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 shadow-xl">
            <h2 className="text-slate-200">Paid Bills</h2>
            <p className="text-4xl font-bold mt-2">{paidBills}</p>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-pink-500 rounded-2xl p-6 shadow-xl">
            <h2 className="text-slate-200">Unpaid Bills</h2>
            <p className="text-4xl font-bold mt-2">{unpaidBills}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-xl">
            <h2 className="text-slate-200">Collection</h2>
            <p className="text-4xl font-bold mt-2">₹{totalCollection}</p>
          </div>

        </div>

        {/* Form */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Create Maintenance Bill
          </h2>

          <form
            onSubmit={createBill}
            className="grid md:grid-cols-3 gap-4"
          >

            <input
              name="residentName"
              placeholder="Resident Name"
              value={formData.residentName}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <input
              name="flatNumber"
              placeholder="Flat Number"
              value={formData.flatNumber}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <input
              name="month"
              placeholder="Month"
              value={formData.month}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3"
              required
            />

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl py-3 font-semibold hover:scale-105 transition">
              Create Bill
            </button>

          </form>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Resident or Flat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6"
        />

        {/* Table */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl">

          <table className="w-full">

            <thead className="bg-blue-600">

              <tr>
                <th className="p-4">Resident</th>
                <th className="p-4">Flat</th>
                <th className="p-4">Month</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredRecords.map((record) => (

                <tr
                  key={record._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="p-4">{record.residentName}</td>

                  <td className="p-4">{record.flatNumber}</td>

                  <td className="p-4">{record.month}</td>

                  <td className="p-4 font-semibold text-green-400">
                    ₹{record.amount}
                  </td>

                  <td className="p-4">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        record.status === "Paid"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                  <td className="p-4">

                    {record.status === "Unpaid" && (
                      <button
                        onClick={() => markPaid(record._id)}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                      >
                        Mark Paid
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    );
} ;

export default Maintenance;