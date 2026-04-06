import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTransactionStore } from "../../store/useTransactionStore";
import TransactionForm from "../../components/transactions/TransactionForm";
import API from "../../services/api";

export default function EditTransaction() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { updateTransaction } = useTransactionStore();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/transactions/${id}`);

        const t = res.data;

        // 🔥 NORMALIZE FOR FORM (IMPORTANT)
        setData({
          ...t,
          transactionDate: t.transactionDate
            ? t.transactionDate.split("T")[0]
            : "",
        });

      } catch (err) {
        console.error(err);
        alert("Failed to load transaction");
      }
    };

    load();
  }, [id]);

  // ✅ SUBMIT
  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const payload = {
        transactionDate: formData.transactionDate
          ? new Date(formData.transactionDate).toISOString().split("T")[0]
          : null,

        type: formData.type || "IN",
        amount: Number(formData.amount),

        category: formData.category || "",
        paymentMethod: formData.paymentMethod || "",

        partyType: formData.partyType || "",
        partyName: formData.partyName || "",

        note: formData.note || "",
      };

      // console.log("Update payload:", payload);

      await updateTransaction(id, payload);

      navigate("/");

    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Edit Transaction
      </h2>

      <TransactionForm
        initialData={data}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}
