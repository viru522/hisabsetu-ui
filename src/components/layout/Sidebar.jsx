import { Link, useLocation } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 bg-white shadow p-4 hidden md:block">

      <h2 className="text-xl font-bold text-blue-600 mb-6">
        HisabSetu
      </h2>

      <nav className="space-y-2">

        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/analytics" className={linkClass("/analytics")}>
          Analytics
        </Link>

        <Link to="/report" className={linkClass("/report")}>
          Reports
        </Link>

        {/* 🔥 ADMIN ONLY */}
        {isAdmin() && (
          <Link to="/admin" className={linkClass("/admin")}>
            Admin Panel
          </Link>
        )}

      </nav>
    </div>
  );
}