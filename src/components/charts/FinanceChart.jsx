import { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FinanceChart({ data = [] }) {

  // 🔥 SAFETY (no crash)
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500">No chart data</p>;
  }

  // 🔥 SORT ONLY (light operation)
  const monthlyData = useMemo(() => {
    return [...data].sort((a, b) => a.month.localeCompare(b.month));
  }, [data]);

  // 🔥 PIE DATA (SMALL DATASET → SAFE)
  const pieData = useMemo(() => {
    return monthlyData.map((m) => ({
      name: m.month,
      value: m.expense || 0,
    }));
  }, [monthlyData]);

  const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#9333ea"];

  return (
    <div className="space-y-8 mt-6">

      {/* 🔥 LINE CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Income vs Expense</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line dataKey="income" stroke="#16a34a" strokeWidth={2} />
            <Line dataKey="expense" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 BAR CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Monthly Profit</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="income" fill="#16a34a" />
            <Bar dataKey="expense" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 PIE CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Expense Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}