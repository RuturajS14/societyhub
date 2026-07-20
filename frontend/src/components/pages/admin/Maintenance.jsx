import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";

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
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Maintenance Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage maintenance bills and payments
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
          <FaMoneyBillWave size={34} className="mb-3" />
          <p>Total Bills</p>
          <h2 className="text-4xl font-bold">
            {records.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <FaCheckCircle size={34} className="mb-3" />
          <p>Paid Bills</p>
          <h2 className="text-4xl font-bold">
            {paidBills}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
          <FaTimesCircle size={34} className="mb-3" />
          <p>Unpaid Bills</p>
          <h2 className="text-4xl font-bold">
            {unpaidBills}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
          <FaWallet size={34} className="mb-3" />
          <p>Total Collection</p>
          <h2 className="text-3xl font-bold">
            ₹{totalCollection}
          </h2>
        </div>

      </div>

      {/* Create Bill */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8 shadow-xl">

        <h2 className="text-2xl font-bold text-white mb-6">
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
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="flatNumber"
            placeholder="Flat Number"
            value={formData.flatNumber}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="month"
            placeholder="Month"
            value={formData.month}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-600 text-white rounded-xl py-3 font-semibold transition hover:scale-105"
          >
            Create Bill
          </button>

        </form>

      </div>
            {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search Resident or Flat..."
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

                <td className="p-4 text-white">
                  {record.residentName}
                </td>

                <td className="p-4 text-slate-300">
                  {record.flatNumber}
                </td>

                <td className="p-4 text-slate-300">
                  {record.month}
                </td>

                <td className="p-4 text-cyan-400 font-semibold">
                  ₹{record.amount}
                </td>

                <td className="p-4 text-slate-300">
                  {new Date(
                    record.dueDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      record.status === "Paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {record.status}
                  </span>

                </td>

                <td className="p-4">

                  {record.status === "Unpaid" ? (

                    <button
                      onClick={() => markPaid(record._id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition px-5 py-2 rounded-lg text-white font-semibold"
                    >
                      Mark Paid
                    </button>

                  ) : (

                    <button
                      disabled
                      className="bg-slate-700 px-5 py-2 rounded-lg text-slate-300 cursor-not-allowed"
                    >
                      Paid
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
};

export default Maintenance;