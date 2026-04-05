import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function AdminRoute() {


  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}