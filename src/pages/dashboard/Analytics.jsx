import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTransactionStore } from "../../store/useTransactionStore";

export default function Analytics() {
  const { transactions } = useTransactionStore();

  // 🔥 SAFE INPUT
  const safeTransactions = useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    return transactions.filter(t => t && t.amount);
  }, [transactions]);

  // 🔹 KPI CALCULATION (MEMOIZED)
  const { totalIn, totalOut, profit } = useMemo(() => {

    let totalIn = 0;
    let totalOut = 0;

    safeTransactions.forEach((t) => {
      if (t.type === "IN") totalIn += t.amount || 0;
      else totalOut += t.amount || 0;
    });

    return {
      totalIn,
      totalOut,
      profit: totalIn - totalOut,
    };

  }, [safeTransactions]);

  // 🔹 CATEGORY GROUP
  const categoryData = useMemo(() => {

    const map = {};

    safeTransactions.forEach((t) => {
      const category = t.category || "Other";

      if (!map[category]) {
        map[category] = 0;
      }

      map[category] += t.amount || 0;
    });

    return Object.entries(map).map(([category, amount]) => ({
      category,
      amount,
    }));

  }, [safeTransactions]);

  // 🔹 MONTHLY TREND (FIXED + SAFE)
  const monthData = useMemo(() => {

    const map = {};

    safeTransactions.forEach((t) => {

      if (!t.transactionDate) return; // 🔥 prevent crash

      const month = t.transactionDate.slice(0, 7);

      if (!map[month]) {
        map[month] = 0;
      }

      if (t.type === "IN") {
        map[month] += t.amount || 0;
      } else {
        map[month] -= t.amount || 0;
      }

    });

    return Object.entries(map).map(([month, value]) => ({
      month,
      value,
    }));

  }, [safeTransactions]);

  // 🔹 TOP EXPENSES
  const topExpenses = useMemo(() => {
    return [...safeTransactions]
      .filter((t) => t.type === "OUT")
      .sort((a, b) => (b.amount || 0) - (a.amount || 0))
      .slice(0, 5);
  }, [safeTransactions]);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Income</p>
          <p className="text-green-600 text-xl font-bold">
            ₹{totalIn}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Expense</p>
          <p className="text-red-600 text-xl font-bold">
            ₹{totalOut}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Profit</p>
          <p className="text-yellow-600 text-xl font-bold">
            ₹{profit}
          </p>
        </div>

      </div>

      {/* MONTHLY TREND */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Monthly Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Category Report</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {categoryData.map((c, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{c.category}</td>
                <td className="p-2 text-right font-bold">
                  ₹{c.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOP EXPENSES */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Top Expenses</h2>

        {topExpenses.map((t) => (
          <div
            key={t.id}
            className="flex justify-between border-b py-2"
          >
            <span>{t.category}</span>
            <span className="text-red-600 font-bold">
              ₹{t.amount}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}