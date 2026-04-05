import { useEffect } from "react";
import { useTransactionStore } from "../../store/useTransactionStore";
import FinanceChart from "../../components/charts/FinanceChart";

export default function Report() {

  const { monthlyReport, fetchMonthlyReport } = useTransactionStore();

  useEffect(() => {
    fetchMonthlyReport();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Reports</h1>

      <div className="bg-white p-4 rounded shadow">
        <FinanceChart data={monthlyReport} />
      </div>

    </div>
  );
}