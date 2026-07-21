import React, { useEffect, useState } from "react";
import api from "../../../api/axios";


const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const res = await api.get("/residents");
      setResidents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredResidents = residents.filter((resident) => {
    const name = resident.name?.toLowerCase() || "";
    const flatNumber = resident.flatNumber?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      flatNumber.includes(search.toLowerCase())
    );
  });

  const totalFlats = 50;

  const occupiedFlats = residents.filter(
    (resident) => resident.status === "Approved"
  ).length;

  const vacantFlats = totalFlats - occupiedFlats;

  const totalPeople = residents
    .filter((resident) => resident.status === "Approved")
    .reduce(
      (total, resident) => total + Number(resident.familyMembers || 0),
      0
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-8 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-12">

          <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-5 py-2 rounded-full font-semibold">
            👥 Society Management
          </span>

          <h1 className="text-5xl font-extrabold text-white mt-6">
            Society Residents
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage all residents from one smart dashboard.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <p className="text-gray-400">Total Flats</p>
            <h2 className="text-5xl font-bold text-white mt-2">
              {totalFlats}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <p className="text-gray-400">Occupied Flats</p>
            <h2 className="text-5xl font-bold text-white mt-2">
              {occupiedFlats}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <p className="text-gray-400">Vacant Flats</p>
            <h2 className="text-5xl font-bold text-white mt-2">
              {vacantFlats}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <p className="text-gray-400">Total People</p>
            <h2 className="text-5xl font-bold text-white mt-2">
              {totalPeople}
            </h2>
          </div>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by name or flat number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white placeholder-gray-400 outline-none"
        />

        {/* Table */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">

          <table className="w-full">

            <thead className="bg-blue-600/80 text-white">

              <tr>

                <th className="p-5">Name</th>

                <th className="p-5">Flat No</th>

                <th className="p-5">Family Members</th>

                <th className="p-5">Email</th>

                <th className="p-5">Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredResidents.map((resident) => (

                <tr
                  key={resident._id}
                  className="border-b border-white/10 hover:bg-white/5 transition text-gray-200"
                >

                  <td className="p-5">{resident.name}</td>

                  <td className="p-5">{resident.flatNumber}</td>

                  <td className="p-5">{resident.familyMembers}</td>

                  <td className="p-5">{resident.email}</td>

                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        resident.status === "Approved"
                          ? "bg-green-500/20 text-green-300 border border-green-400"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-400"
                      }`}
                    >
                      {resident.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
};

export default Residents;