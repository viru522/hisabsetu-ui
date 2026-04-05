import { useState, useEffect } from "react";

export default function TransactionForm({
  initialData,
  onSubmit,
  loading,
}) {

  const [form, setForm] = useState({
    transactionDate: "",
    type: "IN",
    amount: "",
    category: "",
    paymentMethod: "CASH",
    partyName: "",
    note: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        transactionDate: initialData.transactionDate?.split("T")[0] || "",
        type: initialData.type || "IN",
        amount: initialData.amount || "",
        category: initialData.category || "",
        paymentMethod: initialData.paymentMethod || "CASH",
        partyName: initialData.partyName || "",
        note: initialData.note || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 STRICT VALIDATION
    if (!form.transactionDate) {
      alert("Date is required");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (!form.type) {
      alert("Type is required");
      return;
    }

    if (!form.category) {
      alert("Category is required");
      return;
    }

    // ✅ FINAL CLEAN PAYLOAD
    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        type="date"
        name="transactionDate"
        value={form.transactionDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="IN">Income</option>
        <option value="OUT">Expense</option>
      </select>

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
        required
      />

      {/* 🔥 ADD THIS (missing earlier) */}
      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="CASH">Cash</option>
        <option value="UPI">UPI</option>
        <option value="BANK">Bank</option>
      </select>

      <input
        name="partyName"
        value={form.partyName}
        onChange={handleChange}
        placeholder="Party Name"
        className="w-full p-2 border rounded"
      />

      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note"
        className="w-full p-2 border rounded"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>

    </form>
  );
}