import { create } from "zustand";
import * as txnService from "../services/transactionService";

export const useTransactionStore = create((set, get) => ({

  transactions: [],
  totalPages: 0,
  summary: {},
  monthlyReport: [],
  lastFilters: null,

  // 🔥 FILTER
  filterTransactions: async (filters) => {
    try {
      const { lastFilters } = get();

      if (lastFilters && JSON.stringify(filters) === JSON.stringify(lastFilters)) {
  return;
      }

      const res = await txnService.filterTransactions(filters);

      set({
        transactions: res.data.content || [],
        totalPages: res.data.totalPages || 0,
        lastFilters: filters,
      });

    } catch (err) {
      console.error("Filter error:", err.response?.data || err.message);
    }
  },

  // 🔥 ADD (FIXED)
  addTransaction: async (data) => {
    try {
      const res = await txnService.addTransaction(data);

      // ✅ update UI instantly
      set((state) => ({
        transactions: [res.data, ...state.transactions],
        lastFilters: null, // force refresh next time
      }));

      return res.data;

    } catch (err) {
      console.error("Add error:", err.response?.data || err.message);
      throw err;
    }
  },

  // 🔥 UPDATE
  updateTransaction: async (id, data) => {
    try {
      const res = await txnService.updateTransaction(id, data);

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? res.data : t
        ),
      }));

      return res.data;

    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      throw err;
    }
  },

  // 🔥 SUMMARY
  fetchSummary: async () => {
    try {
      const res = await txnService.getSummary();
      set({ summary: res.data || {} });

    } catch (err) {
      console.error("Summary error:", err.response?.data || err.message);
    }
  },

  // 🔥 MONTHLY REPORT
  fetchMonthlyReport: async () => {
    try {
      const res = await txnService.getMonthlyReport();
      set({ monthlyReport: res.data || [] });

    } catch (err) {
      console.error("Report error:", err.response?.data || err.message);
    }
  },

  // 🔥 DELETE
  deleteTransaction: async (id) => {
    try {
      await txnService.deleteTransaction(id);

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        lastFilters: null,
      }));

    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  },

}));