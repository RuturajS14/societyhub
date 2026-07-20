import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const dashboard = await api.get("/dashboard");

      const chartData = [
        {
          name: "Residents",
          value: dashboard.data.residents,
        },
        {
          name: "Complaints",
          value: dashboard.data.complaints,
        },
        {
          name: "Visitors",
          value: dashboard.data.visitors,
        },
        {
          name: "Staff",
          value: dashboard.data.staff,
        },
        {
          name: "Maintenance",
          value: dashboard.data.maintenance,
        },
        {
          name: "Amenities",
          value: dashboard.data.amenities,
        },
        {
          name: "Notices",
          value: dashboard.data.notices,
        },
      ];

      setData(chartData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Heading */}

      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-slate-400">
          Society statistics overview
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {data.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-slate-400 text-lg">
              {item.name}
            </h3>

            <h1 className="text-4xl font-bold mt-3">
              {item.value}
            </h1>
          </div>
        ))}

      </div>

      {/* Chart */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Society Overview
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Reports;