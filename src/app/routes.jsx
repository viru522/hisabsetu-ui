import { Route } from "react-router-dom";

// pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Analytics from "../pages/dashboard/Analytics";
import Report from "../pages/dashboard/Report";
import AddTransaction from "../pages/transactions/AddTransaction";
import EditTransaction from "../pages/transactions/EditTransaction";

// layouts
import ProtectedLayout from "../components/layout/ProtectedLayout";
import AdminRoute from "../components/layout/AdminRoute";
import AdminPanel from "../pages/admin/AdminPanel";

export const appRoutes = (
  <>
    {/* 🔓 PUBLIC */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* 🔒 PROTECTED */}
    <Route element={<ProtectedLayout />}>

      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/report" element={<Report />} />
      <Route path="/add-transaction" element={<AddTransaction />} />

      {/* 🔥 ADMIN ONLY */}
      <Route element={<AdminRoute />}>
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

    </Route>
  </>
);