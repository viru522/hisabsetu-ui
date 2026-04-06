import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../../utils/auth.js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ProtectedLayout() {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}