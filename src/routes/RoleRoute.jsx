import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function RoleRoute({ children, allowedRoles }) {

  const role = getRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}