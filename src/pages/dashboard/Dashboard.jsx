import { useEffect, useState } from "react";
import { useTransactionStore } from "../../store/useTransactionStore";
import FinanceChart from "../../components/charts/FinanceChart";
import { isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const {
    filterTransactions,
    transactions,
    summary,
    monthlyReport,
    fetchSummary,
    fetchMonthlyReport,
    deleteTransaction,
  } = useTransactionStore();

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    start: null,
    end: null,
    minAmount: null,
    maxAmount: null,
    page: 0,
    size: 10,
  });

  // LOAD DATA
  useEffect(() => {
    fetchSummary();
    fetchMonthlyReport();
  }, []);

  // FILTER
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(async () => {
      await filterTransactions(filters);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);

  }, [
    filters.keyword,
    filters.type,
    filters.start,
    filters.minAmount,
    filters.maxAmount,
    filters.end,
    filters.page,
  ]);

  const handleChange = (e) => {
  let value = e.target.value;

  // 🔥 convert amount to number
  if (e.target.name === "minAmount" || e.target.name === "maxAmount") {
    value = value ? Number(value) : null;
  } else {
    value = value || null;
  }

  setFilters(prev => ({
    ...prev,
    [e.target.name]: value,
    page: 0,
  }));
  };

  const handleDelete = async (id) => {

    if (deletingId) return; // prevent multiple clicks

    const confirmDelete = window.confirm("Delete this transaction?");
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await deleteTransaction(id);
      // 🔥 no need to refetch, store already updates UI
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <p>Total Income</p>
          <h2>₹ {summary?.totalIn || 0}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded">
          <p>Total Expense</p>
          <h2>₹ {summary?.totalOut || 0}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <p>Balance</p>
          <h2>₹ {summary?.balance || 0}</h2>
        </div>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-4 gap-3">

        <input
          name="keyword"
          placeholder="Search..."
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select name="type" onChange={handleChange} className="border p-2">
          <option value="">All</option>
          <option value="IN">Income</option>
          <option value="OUT">Expense</option>
        </select>

        <input type="date" name="start" onChange={handleChange} className="border p-2" />
        <input type="date" name="end" onChange={handleChange} className="border p-2" />

        {/* 🔥 NEW */}
        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          onChange={handleChange}
          className="border p-2 rounded"
        />


      {/* ADD BUTTON */}
        <button
          onClick={() => navigate("/add-transaction")}
          className="bg-blue-800 text-white px-4 py-2 rounded"
          >
          Add Transaction
        </button>
        </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full text-sm text-center">

            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment</th>
                {isAdmin() && (
                  <th>Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.transactionDate}</td>
                  <td>{t.type}</td>
                  <td>{t.category}</td>
                  <td>₹ {t.amount}</td>
                  <td>{t.paymentMethod}</td>

                  {isAdmin() && (
                    <td className="space-x-2">
                      <button
                        onClick={() => navigate(`/edit/${t.id}`)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={deletingId === t.id}
                        className={`px-2 py-1 rounded text-white ${deletingId === t.id
                          ? "bg-gray-400"
                          : "bg-red-500"
                          }`}
                      >
                        {deletingId === t.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded shadow">
        <FinanceChart data={monthlyReport} />
      </div>

    </div >
  );
}