import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactionStore } from "../../store/useTransactionStore";
import TransactionForm from "../../components/transactions/TransactionForm";

export default function AddTransaction() {

  const navigate = useNavigate();
  const { addTransaction } = useTransactionStore();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      // 🔥 NORMALIZE DATA (THIS WAS YOUR MAIN PROBLEM)
      const payload = {
        transactionDate: data.transactionDate
          ? new Date(data.transactionDate).toISOString().split("T")[0]
          : null,

        type: data.type || "IN", // default safe
        amount: Number(data.amount),

        category: data.category || "",
        paymentMethod: data.paymentMethod || "",

        partyType: data.partyType || "",
        partyName: data.partyName || "",

        note: data.note || "",
      };

      console.log("Sending payload:", payload);

      await addTransaction(payload);

      navigate("/");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Add Transaction
      </h2>

      <TransactionForm
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}