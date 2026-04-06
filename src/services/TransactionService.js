import API from "./Api";

// 🔥 FILTER (CLEAN PARAMS)
export const filterTransactions = ({
  keyword,
  type,
  start,
  end,
  minAmount,
  maxAmount,
  page = 0,
  size = 10,
}) => {

  const params = { page, size };

  if (keyword && keyword.trim() !== "") params.keyword = keyword;
  if (type && type !== "ALL") params.type = type;
  if (start) params.start = start;
  if (end) params.end = end;

  // 🔥 ADD THIS
  if (minAmount !== null && minAmount !== undefined) {
    params.minAmount = minAmount;
  }

  if (maxAmount !== null && maxAmount !== undefined) {
    params.maxAmount = maxAmount;
  }

  return API.get("/transactions/filter", { params });
};

export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);

// 🔥 ADD
export const addTransaction = (data) =>
  API.post("/transactions", data);

// 🔥 SUMMARY
export const getSummary = () =>
  API.get("/transactions/summary");

// 🔥 MONTHLY REPORT
export const getMonthlyReport = () =>
  API.get("/transactions/reports/monthly");

// 🔥 DELETE
export const deleteTransaction = (id) =>
  API.delete(`/transactions/${id}`);
